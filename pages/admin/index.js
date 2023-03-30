import React from "react";
import { useSession, getSession } from "next-auth/react";
import Link from "next/link";

const AdminPage = ({session}) => {
  return (
    <div className="d-grid gap-4 d-md-flex">
      <Link href={`/admin/addCategory`} className="btn btn-success">
        Add New Category
      </Link>
      <Link href={`/admin/editCategory`} className="btn btn-success">
        Edit Category
      </Link>
      <Link href={`/admin/deleteCategory`} className="btn btn-success">
        Delete Category
      </Link>
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

export default AdminPage;
