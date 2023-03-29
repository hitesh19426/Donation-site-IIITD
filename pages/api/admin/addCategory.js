import dbConnect from "@/utils/dbConnect";
import category from "@/models/category";

import middleware from "@/middleware/middleware";

dbConnect();

export default async (req, res) => {

    // await middleware(req);

    const { method } = req;

    if (method === "POST") {
        
        try {
            const new_category = await category({
                name: req.body.name,
                imageUrl: req.body.imageUrl,
                description: req.body.description
            });

            await new_category.save();
            return res.status(201).json({ success: true, data: new_category });
        } catch (error) {
            return res.status(400).json({ success: false, message: error.message });
        }
    }
};
