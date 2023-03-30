import React from "react";
import { getSession } from "next-auth/react";
import Link from "next/link";

const DeleteCategoryPage = ({session}) => {
  return (
    <div className="d-grid gap-4 d-md-flex">
      DeleteCategoryPage
    </div>
  );
};

export async function getServerSideProps({req}) {
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

  return {
    props: {
      session,
    },
  };
}

export default DeleteCategoryPage;
