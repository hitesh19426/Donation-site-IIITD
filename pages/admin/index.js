import React from "react";
import { SessionProvider } from "next-auth/react";
import AdminLayout from "@/components/AdminLayout";

const AdminPage = ({}) => {
  return (
    <>
      <section className=" py-3 pt-3 " style={{width: "100%", height: "400px", background: "white"}}>
        <div className="container-fluid pt-3">
          <h1 style={{textAlign:"center", fontFamily: "sans", fontSize: "200px"}}>Welcome Admin</h1>
        </div>    
      </section>
    </>
  );
};

export async function getServerSideProps({ }) {
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