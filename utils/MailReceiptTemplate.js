const MailReceiptTemplate = ({
    name,
    amount,
    razorpayOrderId,
    category
  }) => {
    return `
  <html>
    <head>
      <meta charset="utf-8">
      <title>Confirmation of your donation at IIITD Donations</title>
    </head>
    <body>
      <p>Dear <b>${name}</b>,</p>
      <p>Thank you for Donating <b>Rs ${amount}/-</b> at IIITD Donations for <b> ${category}</b> category.</p>
      
      <p><b>Donation details:</b></p>
      <p><b>Donor name:</b> ${name}. <br>
      <b>Donation amount:</b> Rs ${amount}/-. <br>
      <b>Donation category:</b> ${category}. <br>
      <b>Donation date:</b> ${new Date().toLocaleString()}. <br>
      <b>Payment ID:</b> ${razorpayOrderId}.</p>
      
      <p>Best regards,<br>IIIT Delhi</p>
    </body>
  </html>
    `;
  };
  
  export default MailReceiptTemplate;
  