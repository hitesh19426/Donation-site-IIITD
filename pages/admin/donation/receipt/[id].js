import React from 'react';
import { SessionProvider } from "next-auth/react";
import donation_data from '@/models/donation_data';
import dbConnect from '@/utils/dbConnect';
import Image from 'next/image';



function Receipt(donationData) {

    donationData = donationData.donationData;

    const donation = donationData;

    console.log(donationData);

    console.log(donation.name);

    return (
        <div style={{ margin: "10px" }} size="A4" >

            <div id='pdf'>

                <div style={{ marginBottom: "100px" }}>

                    <div>
                        <Image src="https://iiitd.ac.in/sites/default/files/style3colorsmall.png" alt="IIITD Logo" width="400" height="100" style={{
                            position: 'absolute',
                            top: '2px',
                            left: '2px',
                        }} />
                    </div>

                    <div>
                        <h5 style={{
                            position: 'absolute', top: '25px', right: '37px',
                            fontFamily: 'Sa',
                            fontStyle: 'normal',

                        }}>
                            IIIT-Delhi&#39;s Donation Receipt  </h5>
                    </div>

                </div>

                <hr style={{
                    border: 'none',
                    borderBottom: '3px solid #ccc',
                    marginLeft: '12px',
                    marginRight: '12px',
                }} />

                <div style={{ display: 'flex', justifyContent: 'space-between', marginLeft: '38px' }}>
                    <div style={{ flex: 1, marginRight: '16px' }}>
                        <h5><b>From</b></h5>
                        <p><b>Name: </b> {donation.name}

                            <br></br>
                            <b>Category: </b> {donation.category}
                            <br></br>
                            <b>Email: </b> {donation.email}
                            <br></br>
                            <b>Phone: </b> {donation.phone}
                            <br></br>
                            <b>Amount: </b> {donation.amount} </p>
                    </div>
                    <div style={{ flex: 1, marginRight: '16px' }}>
                        <h5><b>To</b></h5>
                        <p><b>Indraprastha Institue of Information Technology</b> <br></br>
                            Okhla Industrial Estate, Phase III
                            <br></br>
                            (Near Govind Puri Metro Station)
                            <br></br>
                            New Delhi, India - 110020</p>

                    </div>
                    <div style={{ flex: 1 }}>
                        <h5> &nbsp; </h5>
                        <p>
                            <b>Payment Date: </b> {donation.payment_date}
                            <br></br>
                            <b>Amount(In Rs.): </b> {donation.amount}
                            <br></br>
                            <b>Payment ID: </b> {donation.razorpay_payment_id}
                            <br></br>
                            <b>Payment Status: </b> Success

                        </p>
                    </div>
                </div>

                <hr style={{
                    border: 'none',
                    borderBottom: '3px solid #36454F',
                    marginLeft: '12px',
                    marginRight: '12px',
                }} />


                <div style={{
                    paddingTop: '65px',
                    margin: '15px',
                }}>

                    <h6 style={{ fontFamily: 'sa' }}>This is digitally signed receipt and does not require physical signature.
                    </h6>

                </div>



                <hr style={{
                    border: 'none',
                    borderBottom: '3px solid #ccc',
                    marginLeft: '12px',
                    marginRight: '12px',
                }} />

                <div style={{
                    margin: '15px',
                }}>

                    <h6 style={{ fontFamily: 'sa' }}> <b>Copyright © 2023 IIIT-DELHI Donations PORTAL.</b> All rights reserved.
                    </h6>

                </div>

            </div>


            {/* <div style={{ display: "flex", justifyContent: "center", alignItems: "center", padding: "20px" }}>

                <button className='btn btn-success' onClick={handleDownload}>Download as PDF</button>

            </div> */}

            {/* <PdfDownloadButton content={content} /> */}

        </div>
    );
}



export async function getServerSideProps(req) {
    let donation;
    try {
        await dbConnect();
        donation = await donation_data.findById(req.query.id);
        donation = donation.toObject({ getters: true });

        console.log("donation = ", donation);


        // console.log("category = ", category);
    } catch (error) {
        console.log(error);
    }

    const { name, email, phone, amount, category, paymentDate, razorpay_payment_id } = donation;

    let donationData = {
        name: name,
        email: email,
        phone: phone,
        amount: amount,
        category: category,
        payment_date: paymentDate ? paymentDate : "Not yet added in database",
        razorpay_payment_id: razorpay_payment_id,
    };

    console.log("donationData = ", donationData);

    return {
        props: {
            donationData: JSON.parse(JSON.stringify(donationData)) ? JSON.parse(JSON.stringify(donationData)) : null,
        },
    };
}


export default Receipt;


Receipt.getLayout = function getLayout(page) {
    return (
        <>
            <SessionProvider session={page.props.session}>
                {/* <AdminLayout> */}
                {page}
                {/* </AdminLayout> */}
            </SessionProvider>
        </>
    );
};