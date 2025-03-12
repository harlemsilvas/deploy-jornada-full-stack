// API significa Application Programmig interface
// POST, GET, PUT, DELETE
// CRUD - Create Read Update Delete
// localhost:3001 sempre retorna GET
// Endpoint rota que pode ser acessada dentro de uma API
// Cria um app.get
import express from "express";
// import { artistArray } from "../../front-end/src/assets/database/artists.js";
// import { songsArray } from "../../front-end/src/assets/database/songs.js";
import cors from "cors";
import { db } from "./connect.js";

const app = express();
const PORT = 3001;

app.use(cors());
//app.use(express.json());

app.get("/", (request, response) => {
  response.send("Olá Mundo! Agora não preciso atualizar o server/restart !");
});

app.get("/artists", async (request, response) => {
  response.send(await db.collection("artists").find({}).toArray());
});

app.get("/songs", async (request, response) => {
  response.send(await db.collection("songs").find({}).toArray());
});

app.listen(PORT, () => {
  console.log(`Servidor está escutando na porta ${PORT}`);
});
