import { connectToDatabase } from "../lib/mongodb";

export default async function handler(request, response) {
  try {
    const { database } = await connectToDatabase();
    const collection = database.collection(process.env.NEXT_ATLAS_COLLECTION);

    const results = await collection.find().toArray();
    response.status(200).json(results);
  } catch (e) {
    console.error(e);
    throw new Error(e).message;
  }
}
