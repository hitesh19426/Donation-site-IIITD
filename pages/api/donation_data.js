import dbConnect from "@/utils/dbConnect";
import donation_data from "@/models/donation_data";

dbConnect();

export default handler = async (req, res) => {
    
        const { method } = req;

        if(method === "POST"){
            try {
                const new_donation = await donation_data({
                    name: req.body.name,
                    email: req.body.email,
                    amount: req.body.amount,
                    phone: req.body.phone,
                    address: req.body.address,
                    personType: req.body.personType,
                    pancard: req.body.pancard?req.body.pancard:"",
                    course: req.body.course?req.body.course:"",
                    rollno: req.body.rollno?req.body.rollno:"",
                    year: req.body.year?req.body.year:"",
                    wardname: req.body.wardname?req.body.wardname:"",
                    companyname: req.body.companyname?req.body.companyname:"",
                    idNumber: req.body.idNumber?req.body.idNumber:"",
                    remarks: req.body.remarks?req.body.remarks:""
                });
                await new_donation.save();
                return res.status(201).json({ success: true, data: new_donation });
            } catch (error) {
                return res.status(400).json({ success: false, message: error.message });
            }
        }
    };

