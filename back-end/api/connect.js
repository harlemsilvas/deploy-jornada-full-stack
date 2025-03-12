// Javascript Assincrono
// await  async
// fullfilled
import { MongoClient } from "mongodb";

export const URI =
  "mongodb+srv://harlemclaumann:g8Hpu39Y2VjAXNVQ@cluster0.69j3tzl.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

const client = new MongoClient(URI);

export const db = client.db("spotifyAula");
// const songCollection = await db.collection("songs").find({}).toArray();

// console.log(songCollection);
