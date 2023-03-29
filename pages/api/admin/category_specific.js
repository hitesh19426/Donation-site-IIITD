import dbConnect from "@/utils/dbConnect";
import category from "@/models/category";

import middleware from "@/middle_auth/middleware";

dbConnect();

export default async (req, res) => {

    const { method } = req;

    if(method === "PUT"){
        try {
            
            const updated_category = await category.findByIdAndUpdate(req.params.id, {$set: req.body}, {new: true});

            return res.status(200).json({ success: true, data: updated_category });

        } catch (error) {
            return res.status(400).json({ success: false, message: error.message });
        }
    }else if(method === "DELETE"){
        try {
            await category.findByIdAndDelete(req.params.id);
            return res.status(200).json({ success: true, message: "Category deleted successfully" });
        } catch (error) {
            return res.status(400).json({ success: false, message: error.message });
        }
    }

};