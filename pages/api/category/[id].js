import dbConnect from "@/utils/dbConnect";
import category from "@/models/category";

dbConnect();

export default async (req, res) => {
    const { id } = req.query;
    const { method } = req;

    // console.log(id + " " + method + " in the get category api" );

    if(method === "GET"){
        try {
            const categories = await category.findById(id);
            return res.status(200).json({ success: true, data: categories });
        } catch (error) {
            return res.status(400).json({ success: false, message: error.message });
        }
    }
};