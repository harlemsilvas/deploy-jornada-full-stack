import React, { useState, useRef, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import {
  faCirclePlay,
  faCirclePause,
  faBackwardStep,
  faForwardStep,
} from "@fortawesome/free-solid-svg-icons";

const formatTime = (timeInSeconds) => {
  const minutes = Math.floor(timeInSeconds / 60)
    .toString()
    .padStart(2, "0");
  const seconds = Math.floor(timeInSeconds % 60)
    .toString()
    .padStart(2, "0");
  return `${minutes}:${seconds}`;
};

const timeInSeconds = (timeString) => {
  const [minutes, seconds] = timeString.split(":").map(Number);
  return minutes * 60 + seconds;
};

const Player = ({
  duration,
  randomIdFromArtist,
  randomId2FromArtist,
  audio,
}) => {
  const audioPlayer = useRef(null);
  const progressBar = useRef(null);
  const progressContainer = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(formatTime(0));
  const [isDragging, setIsDragging] = useState(false);
  const durationInSeconds = timeInSeconds(duration);

  // Efeito para resetar o player quando a música muda
  useEffect(() => {
    const currentAudio = audioPlayer.current;

    const resetPlayer = () => {
      if (currentAudio) {
        currentAudio.pause();
        currentAudio.currentTime = 0;
        setCurrentTime(formatTime(0));
        progressBar.current.style.setProperty("--_progress", "0%");

        if (isPlaying) {
          currentAudio
            .play()
            .catch((error) => console.log("Autoplay error:", error));
        }
      }
    };

    resetPlayer();
  }, [audio, isPlaying]);

  // Efeito principal para controle de progresso
  useEffect(() => {
    const currentAudio = audioPlayer.current;
    let intervalId;

    const updateProgress = () => {
      if (!currentAudio || isDragging) return;

      setCurrentTime(formatTime(currentAudio.currentTime));
      progressBar.current.style.setProperty(
        "--_progress",
        (currentAudio.currentTime / durationInSeconds) * 100 + "%"
      );
    };

    const handleEnded = () => {
      setIsPlaying(false);
      // Adicione lógica para próxima música automática aqui
    };

    if (currentAudio) {
      intervalId = setInterval(updateProgress, 1000);
      currentAudio.addEventListener("ended", handleEnded);
    }

    return () => {
      clearInterval(intervalId);
      if (currentAudio) {
        currentAudio.removeEventListener("ended", handleEnded);
      }
    };
  }, [isPlaying, durationInSeconds, isDragging]);

  // Controle de play/pause
  const playPause = () => {
    if (!audioPlayer.current) return;

    if (isPlaying) {
      audioPlayer.current.pause();
    } else {
      audioPlayer.current
        .play()
        .catch((error) => console.log("Play error:", error));
    }
    setIsPlaying(!isPlaying);
  };

  // Controles de arrasto na barra de progresso
  const handleProgressClick = (e) => {
    if (!audioPlayer.current || !progressContainer.current) return;

    const rect = progressContainer.current.getBoundingClientRect();
    const pos = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
    audioPlayer.current.currentTime = durationInSeconds * pos;
  };

  const handleDragStart = (e) => {
    setIsDragging(true);
    handleDragMove(e);
  };

  const handleDragMove = (e) => {
    if (!isDragging || !audioPlayer.current || !progressContainer.current)
      return;

    const rect = progressContainer.current.getBoundingClientRect();
    const clientX = e.touches?.[0]?.clientX || e.clientX;
    const pos = Math.max(0, Math.min(1, (clientX - rect.left) / rect.width));

    audioPlayer.current.currentTime = durationInSeconds * pos;
    setCurrentTime(formatTime(durationInSeconds * pos));
  };

  const handleDragEnd = () => {
    setIsDragging(false);
  };

  return (
    <div className={`player ${isDragging ? "dragging" : ""}`}>
      <div className="player__controllers">
        <Link
          to={`/song/${randomIdFromArtist}`}
          onClick={() => setIsPlaying(false)}
        >
          <FontAwesomeIcon className="player__icon" icon={faBackwardStep} />
        </Link>

        <FontAwesomeIcon
          className="player__icon player__icon--play"
          icon={isPlaying ? faCirclePause : faCirclePlay}
          onClick={playPause}
        />

        <Link
          to={`/song/${randomId2FromArtist}`}
          onClick={() => setIsPlaying(false)}
        >
          <FontAwesomeIcon className="player__icon" icon={faForwardStep} />
        </Link>
      </div>

      <div className="player__progress">
        <p>{currentTime}</p>
        <div
          className="player__bar"
          ref={progressContainer}
          onClick={handleProgressClick}
          onMouseDown={handleDragStart}
          onMouseMove={handleDragMove}
          onMouseUp={handleDragEnd}
          onMouseLeave={handleDragEnd}
          onTouchStart={handleDragStart}
          onTouchMove={handleDragMove}
          onTouchEnd={handleDragEnd}
          role="slider"
          aria-valuenow={audioPlayer.current?.currentTime || 0}
          aria-valuemin="0"
          aria-valuemax={durationInSeconds}
        >
          <div ref={progressBar} className="player__bar-progress"></div>
        </div>
        <p>{duration}</p>
      </div>

      <audio ref={audioPlayer} src={audio} preload="auto" />
    </div>
  );
};

export default Player;
