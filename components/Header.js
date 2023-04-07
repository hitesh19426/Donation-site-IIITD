import Image from "next/image";
import Link from "next/link";
import React from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import IIITD_Logo from "./../public/logo.png";

export default function Header() {
  const [isNavCollapsed, setIsNavCollapsed] = React.useState(true);
  const handleNavCollapse = () => setIsNavCollapsed(!isNavCollapsed);
  const { data: session } = useSession();

  return (
    <nav className="navbar navbar-expand-md">
      <div className="container-fluid ">
        <Link className="navbar-brand ps-2" href="/">
          <Image
            src={IIITD_Logo}
            alt="Logo"
            width="40"
            height="30"
            className="d-inline-block align-text-top"
          />
          Donations
        </Link>

        <button
          className="navbar-toggler collapsed"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarTogglerDemo01"
          aria-controls="navbarTogglerDemo01"
          aria-expanded={!isNavCollapsed ? true : false}
          aria-label="Toggle navigation"
          onClick={handleNavCollapse}
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div
          className={`${isNavCollapsed ? "collapse" : ""} navbar-collapse`}
          id="navbarSupportedContent"
        >
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            {/* <Link
              className="nav-link me-2 text-secondary"
              aria-current="page"
              href="/"
            >
              Donations
            </Link> */}

            <Link
              className="nav-link me-2 text-secondary"
              aria-current="page"
              href="/admin"
            >
              Admin Page
            </Link>

            {session ? (
              <div
                className="nav-link btn btn-success px-3"
                aria-current="page"
                onClick={() => signOut({ callbackUrl: "/" })}
              >
                Logout
              </div>
            ) : (
              <div
                className="nav-link btn btn-success px-3"
                aria-current="page"
                onClick={() => signIn()}
              >
                Login/Signup
              </div>
            )}
            {/* <div
              className="nav-link btn btn-success px-3"
              aria-current="page"
              onClick={() => signIn()}
            >
              Login/Signup
            </div> */}
          </ul>
        </div>
      </div>
    </nav>
  );
}
