import React, { useState } from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import Link from "next/link";

const AdminPage = ({}) => {
  const { data: session } = useSession();

  return (
    <div className="d-flex mx-5">
      <Link href={`/admin/home`} className="btn btn-success me-3 px-3">
        Home
      </Link>
      <Link href={`/admin/donations`} className="btn btn-success me-3 px-3">
        View Donations
      </Link>
      {session ? (
        <div
          className="btn btn-success px-3"
          aria-current="page"
          onClick={() => signOut({ callbackUrl: "/" })}
        >
          Logout
        </div>
      ) : (
        <div
          className="btn btn-success px-3"
          aria-current="page"
          onClick={() => signIn()}
        >
          Login/Signup
        </div>
      )}
    </div>
  );
};

export async function getServerSideProps({ req }) {
  return {
    props: {},
  };
}

export default AdminPage;
