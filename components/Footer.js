import Link from "next/link";
import React from "react";

import styles from "@/styles/Footer.module.css";

export default function Footer() {
  return (
    <footer
      className={` text-center text-lg-start text-dark mb-0 ${styles.main}`} 

      // styles = {{styles.main}}

      style={{
        backgroundColor: "#ECEFF1",
        position: "realtive",
        bottom: "0",
        width: "100%",
      }}
    >
      <div
        className="text-center p-3"
        style={{ backgroundColor: "rgba(0, 0.8, 1, 0.2)" }}
      >
        Developed by
        <Link href="https://github.com/V15hnu24">Vishnu Vardhan</Link> and
        <Link href="https://github.com/hitesh19426">Hitesh Garg</Link> @
        IIIT-Delhi
        <hr></hr>
        © 2023 Copyright: IIIT-Delhi. All rights reserved.
      </div>
    </footer>
  );
}
