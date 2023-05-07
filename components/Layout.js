import Head from "next/head";
import Footer from "./Footer";
import Header from "./Header";
import SideBar from "./SideBar";
import styles from "@/styles/Page.module.css";

function Layout({ children }) {
  return (
    <>
      <div className="container-fluid" style={{minHeight: "100%", position:"relative"}}>
      <Head>
        <title>Donations IIITD</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/logo.png" />
      </Head>

      <Header />

      <div className={`container-fluid ${styles.background} `}>
        <div className="row flex">
          <div className="col-sm-12 col-md-3 col-xl-3 pt-5 ps-3">
            <SideBar />
          </div>
          <div
            className={`col-sm-12 col-md-9 col-xl-9 py-3 pt-5 ${styles.main}`}
          >
            {children}
          </div>
        </div>
      </div>

      <Footer />

      </div>

    </>
  );
}

export default Layout;
