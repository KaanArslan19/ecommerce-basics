import { connectToDatabase, insertDocument } from "../../lib/db";

async function handler(req, res) {
  if (req.method === "POST") {
    const data = req.body;

    let client;
    let result;

    try {
      client = await connectToDatabase();
    } catch (error) {
      res.status(500).json({ message: "Connecting to the database failed!" });
      return;
    }
    try {
      result = await insertDocument(client, "products", data);
      res.status(201).json({ message: "Product added!" });
    } catch (error) {
      res.status(500).json({ message: "Inserting product failed!" });
    }
    console.log(result);

    client.close();
  }
}

export default handler;
