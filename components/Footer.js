import React from "react";

export default function Footer() {
  return (
    <footer
      className="text-center text-lg-start text-dark"
      style={{backgroundColor: "#ECEFF1"}}
    >
      <section
        className="d-flex justify-content-between p-4 text-white"
        style={{backgroundColor: "#21D192"}}
      >
        <div className="me-5">
          <span>Get connected with us on social networks:</span>
        </div>

        <div>
          <a href="" className="text-white me-4">
            <i className="fab fa-facebook-f"></i>
          </a>
          <a href="" className="text-white me-4">
            <i className="fab fa-twitter"></i>
          </a>
          <a href="" className="text-white me-4">
            <i className="fab fa-google"></i>
          </a>
          <a href="" className="text-white me-4">
            <i className="fab fa-instagram"></i>
          </a>
          <a href="" className="text-white me-4">
            <i className="fab fa-linkedin"></i>
          </a>
          <a href="" className="text-white me-4">
            <i className="fab fa-github"></i>
          </a>
        </div>
      </section>

      <section className="">
        <div className="container text-center text-md-start mt-5">
          <div className="row mt-3">
            <div className="col-md-3 col-lg-4 col-xl-3 mx-2 mb-4">
              <h6 className="text-uppercase fw-bold">Company name</h6>
              <hr
                className="mb-4 mt-0 d-inline-block mx-auto"
                style={{width: "60px", backgroundColor: "#7c4dff", height: "2px"}}
              />
              <p>
                Here you can use rows and columns to organize your footer
                content. Lorem ipsum dolor sit amet, consectetur adipisicing
                elit.
              </p>
            </div>
          </div>
        </div>
      </section>

      <div className="text-center p-3" style={{backgroundColor: "rgba(0, 0, 0, 0.2)"}}>
        © 2020 Copyright:
        <a className="text-dark" href="https://mdbootstrap.com/">
          MDBootstrap.com
        </a>
      </div>
    </footer>
  );
}
