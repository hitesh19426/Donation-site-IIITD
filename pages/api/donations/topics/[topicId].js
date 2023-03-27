// import {donation_topics} from "./../../../../DUMMY_DATA"
import { connectToDatabase } from "@/lib/MongoDbConnect";

export default async function handler(req, res, next) {
    if (req.method === "GET") {
        console.log("In GET api route at /api/donations/topics");

        const { db } = await connectToDatabase();
        const {topicId} = req.query;
        
        const topic = await db.collection("topics").find({id: topicId});
        console.log(topic);
    
        if (topic === null) {
          return res
            .status(404)
            .json({ message: "Error fetching topics", topic});
        }
    
        return res.status(200).json(topic);
      }

    // const {topicId} = req.query;

    // // console.log('In /api/donations/topics route')
    // const topic = donation_topics.find(topic => topic.id === topicId);

    // if(!topic) {
    //     return res.status(400).json({message: "Topic Not Found"});
    // }

    // return res.status(200).json(topic);
}