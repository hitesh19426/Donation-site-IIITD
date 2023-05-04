import React, { useState } from "react";
import { useSession, signIn, signOut, SessionProvider } from "next-auth/react";
import Link from "next/link";
import AdminLayout from "@/components/AdminLayout";


const AdminPage = ({}) => {
  const { data: session } = useSession();

  return (
    <>
      
      <section className=" py-3 pt-3 " style={{width: "100%", background: "white"}}>
        <div className="container-fluid pt-3">
          <h1 style={{textAlign:"center", fontFamily: "sans", fontSize: "10vw"}}>Welcome Admin</h1>

          <br></br>
          <h1 style={{textAlign:"center", fontFamily: "sans", fontSize: "8vw", color: "#198754"}}>Here admin can update the categories!!</h1>

          <br></br>
          
        </div>
          
      </section>
    </>
  );
};

export async function getServerSideProps({ req }) {
  return {
    props: {},
  };
}

export default AdminPage;

AdminPage.getLayout = function getLayout(page) {
  return (
    <>
    <SessionProvider session={page.props.session}>
      <AdminLayout>
        {page}  
        </AdminLayout>
    </SessionProvider>
    </>
  );
};