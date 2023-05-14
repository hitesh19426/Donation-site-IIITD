import nodemailer from 'nodemailer';
import MailReceiptTemplate from './MailReceiptTemplate';

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    },
    host: 'smtp.gmail.com',
    port: 587,
});

const mailOptions = {
    from: 'process.env.EMAIL_USER',
    to: 'temp',
    subject: 'temp',
    html: MailReceiptTemplate({
        name: 'John Doe',
        amount: 1000,
        razorpayOrderId: 'order_123456',
        category: 'Education'
    })
};


const sendMail = (receivingUser, emailParams) => {

    console.log('Sending mail to: ' + receivingUser);

    mailOptions.to = receivingUser;
    mailOptions.subject = "Confirmation of your donation at IIITD Donations";
    mailOptions.from = "Vishnu";
    mailOptions.html = MailReceiptTemplate({
        name: emailParams.name,
        amount: emailParams.amount,
        razorpayOrderId: emailParams.razorpayOrderId,
        category: emailParams.category
    });

    
    console.log("mailOptions: " + JSON.stringify(mailOptions));

    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
            console.log(error);
            // return false;
        } else {
            console.log('Email sent: ' + info.response);
            // return true;
        }
    });
};
  
export default sendMail;