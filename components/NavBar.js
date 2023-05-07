import React from "react";
import NavItem from "./NavItem";
import styles from "@/styles/Nav.module.css";

export default function NavBar({ items, path }) {
  return (
    <ul
      className={`category nav nav-pills d-flex flex-column align-items-start ${styles.menu}`}
      id="menu" 
    >
      {items.map(item => <NavItem key={item.id} item={item} path={path} /> )}
    </ul>
  );
}
