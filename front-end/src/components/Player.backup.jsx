import React, { useState, useRef, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import {
  faCirclePlay,
  faCirclePause,
  faBackwardStep,
  faForwardStep,
} from "@fortawesome/free-solid-svg-icons";

// ... (funções formatTime e timeInSeconds permanecem iguais)
const formatTime = (timeInSeconds) => {
  const minutes = Math.floor(timeInSeconds / 60)
    .toString()
    .padStart(2, "0");
  const seconds = Math.floor(timeInSeconds - minutes * 60)
    .toString()
    .padStart(2, "0");

  return `${minutes}:${seconds}`;
};

const timeInSeconds = (timeString) => {
  const splitArray = timeString.split(":");
  const minutes = Number(splitArray[0]);
  const seconds = Number(splitArray[1]);

  return seconds + minutes * 60;
};

const Player = ({
  duration,
  randomIdFromArtist,
  randomId2FromArtist,
  audio,
}) => {
  const audioPlayer = useRef(null);
  const progressBar = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(formatTime(0));
  const durationInSeconds = timeInSeconds(duration);

  // console.log(audioPlayer.current.play());
  // console.log(durationInSeconds);

  const playPause = () => {
    isPlaying ? audioPlayer.current.pause() : audioPlayer.current.play();

    setIsPlaying(!isPlaying);
    // console.log(formatTime(audioPlayer.current.currentTime));
  };

  // setCurrentTime(formatTime(audioPlayer.current.currentTime));

  // Efeito para mudança de música
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

  // Efeito principal para controle de tempo
  useEffect(() => {
    const currentAudio = audioPlayer.current;
    let intervalId;

    const updateProgress = () => {
      if (!currentAudio) return;

      setCurrentTime(formatTime(currentAudio.currentTime));
      progressBar.current.style.setProperty(
        "--_progress",
        (currentAudio.currentTime / durationInSeconds) * 100 + "%"
      );
    };

    const handleEnded = () => {
      setIsPlaying(false);
      // Lógica adicional para próximo track
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
  }, [isPlaying, durationInSeconds]);

  return (
    <div className="player">
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
        <div className="player__bar">
          <div ref={progressBar} className="player__bar-progress"></div>
        </div>
        <p>{duration}</p>
      </div>

      <audio ref={audioPlayer} src={audio} preload="auto"></audio>
    </div>
  );
};

export default Player;
