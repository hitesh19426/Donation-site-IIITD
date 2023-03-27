// import {donation_topics} from "./../../../../DUMMY_DATA"
import { connectToDatabase } from "@/lib/MongoDbConnect";

export default async function handler(req, res, next) {
  // console.log('In /api/donations/topics route')
  if (req.method === "GET") {
    console.log("In GET api route at /api/donations/topics");

    const { db } = await connectToDatabase();

    const donation_topics = await db.collection("topics").find().toArray();
    console.log(donation_topics);

    if (donation_topics.length === 0) {
      return res
        .status(404)
        .json({ message: "Error fetching topics", donation_topics: null });
    }

    return res.status(200).json(donation_topics);
  }
}
