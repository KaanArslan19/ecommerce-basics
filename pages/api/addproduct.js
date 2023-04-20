import { connectToDatabase } from "../../lib/db";

async function handler(req, res) {
  if (req.method === "POST") {
    const data = req.body;

    const client = await connectToDatabase();

    const db = client.db();
    const productsData = db.collection("products");

    const result = await productsData.insertOne(data);

    console.log(result);
    client.close();
    res.status(201).json({ message: "Product added!" });
  }
}

export default handler;
