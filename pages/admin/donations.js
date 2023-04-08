import React from "react";
import { getSession } from "next-auth/react";
import { server } from "@/config";

const DonationItem = ({ index, donation }) => {
  return (
    <tr>
      <th scope="row"> {index+1} </th>
      <td> {donation.name} </td>
      <td>  {donation.email} </td>
      <td> {donation.phone} </td>
      <td> {donation.amount} </td>
      <td> {donation.razorpay_order_id} </td>
      <td> {donation.razorpay_payment_id} </td>
      <td> {donation.razorpay_signature} </td>
    </tr>
  );
};

const ViewDonations = ({ session, donations }) => {
  return (
    <div className="mx-3 table-responsive">
      <table className="table table-success table-striped table-hover">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Name</th>
            <th scope="col">Email</th>
            <th scope="col">Phone</th>
            <th scope="col">Amount</th>
            <th scope="col">Razorpay Order Id</th>
            <th scope="col">Razorpay Payment Id</th>
            <th scope="col">Razorpay Signature </th>
          </tr>
        </thead>
        <tbody>
          {donations.map((donation, index) => <DonationItem key={donation._id} index={index} donation={donation} />)}
        </tbody>
      </table>
    </div>
  );
};

export async function getServerSideProps({ req }) {
  const session = await getSession({ req });
  console.log("session in admin page = ", session);

  if (!session) {
    return {
      redirect: {
        destination: "/api/auth/signin",
        permanent: false,
      },
    };
  }

  const res = await fetch(`${server}/api/admin/donations`);
  const { data: donations } = await res.json();
  // console.log(donations);

  return {
    props: {
      session,
      donations,
    },
  };
}

export default ViewDonations;
