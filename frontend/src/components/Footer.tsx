import React, { useState } from "react";
import { Link } from "react-router-dom";

type Props = {};

const Footer = (props: Props) => {
  const currentYear = new Date().getFullYear();

  return (
    <>
      <div className="bg-dark" style={{ minHeight: "500px" }}>
        <div className="">
          <Link to="">
            <strong>Home</strong>
          </Link>
          <Link to="">About us</Link>
          <Link to="">Favorites</Link>
          <Link to="">Contact Me</Link>
        </div>
      </div>
      <div style={{ padding: "2rem" }}>
        © {currentYear} Nati Peretz. All rights reserved.
      </div>
    </>
  );
};

export default Footer;
