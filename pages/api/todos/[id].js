import { connectToDatabase } from "../../lib/mongodb";
import { ObjectId } from "mongodb";

export default async function handler(request, response) {
  const {
    query: { id },
    method,
  } = request;
  const { database } = await connectToDatabase();
  const collection = database.collection(process.env.NEXT_ATLAS_COLLECTION);

  switch (method) {
    case "GET":
      try {
        const results = await collection.find().toArray();
        response.status(200).json(results);
      } catch (e) {
        console.error(e);
        response.status(400).json({ success: false, message: e.message });
      }
      break;
    case "POST":
      try {
        const { title, description, completed } = request.body;

        const todo = collection.insertOne({
          title,
          description,
          completed,
        });

        response.status(201).json(todo);
      } catch (e) {
        console.error(e);
        response.status(400).json({ success: false, message: e.message });
      }
      break;
    case "PUT":
      try {
        const todo = await collection.findOne({ _id: new ObjectId(id) });

        collection.updateOne(
          { _id: new ObjectId(id) },
          {
            $set: {
              completed: !todo.completed,
            },
          }
        );

        response.status(200).json("Todo updated");
      } catch (e) {
        console.error(e);
        response.status(400).json({ success: false, message: e.message });
      }
      break;
    case "DELETE":
      try {
        const todo = await collection.deleteOne({
          _id: new ObjectId(id),
        });

        response.status(200).json({ message: "Todo deleted successfully" });
      } catch (e) {
        console.error(e);
        response.status(500).json({ success: false, message: e.message });
      }
      break;
    default:
      response.status(405).end();
      break;
  }
}
