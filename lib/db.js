import { MongoClient } from "mongodb";

export async function connectToDatabase() {
  const client = await MongoClient.connect(process.env.SPRING_DATA_MONGODB_URI);

  return client;
}
