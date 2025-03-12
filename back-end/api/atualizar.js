// para executar - node atualizar.js
import { MongoClient } from "mongodb";
import { URI } from "./connect.js";

async function atualizarDurations() {
  const client = new MongoClient(URI);

  try {
    await client.connect();
    console.log("Conectado ao MongoDB Atlas");

    const database = client.db("spotifyAula"); // Altere para o nome do seu banco
    const collection = database.collection("songs"); // Altere para sua coleção

    // Filtra registros com duration no formato "X:XX"
    const filter = {
      duration: {
        $regex: /^\d:/,
        $not: /^\d{2}:/, // Exclui durations já formatados
      },
    };

    // Atualização usando aggregation pipeline
    const updateResult = await collection.updateMany(filter, [
      {
        $set: {
          duration: {
            $concat: ["0", "$duration"],
          },
        },
      },
    ]);

    console.log(`Documentos modificados: ${updateResult.modifiedCount}`);
  } catch (error) {
    console.error("Erro na operação:", error);
  } finally {
    await client.close();
    console.log("Conexão fechada");
  }
}

// Executa a função principal
atualizarDurations();
