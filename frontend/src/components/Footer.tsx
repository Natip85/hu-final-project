import React, { useState } from "react";
import { Link } from "react-router-dom";

type Props = {};

const Footer = (props: Props) => {
  const currentYear = new Date().getFullYear();

  return (
    <>
      <div className="bg-dark d-flex justify-content-around p-5" style={{ minHeight: "400px" }}>
        <div className="d-flex flex-column justify-content-center">
          <h5 className="text-white">CUSTOMER SERVICE</h5>
          <hr style={{opacity: '100%', backgroundColor: 'red', width: '25%', height: 5}}/>
          <Link style={{color: 'white'}} to=""> Home </Link>
          <Link style={{color: 'white'}} to="">Favorites</Link>
          <Link style={{color: 'white'}} to="">Contact Me</Link>
        </div>
        <div className="d-flex flex-column justify-content-center">
          <h5 className="text-white">LEGAL INFORMATION</h5>
          <hr style={{opacity: '100%', backgroundColor: 'red', width: '25%', height: 5}}/>
           <Link style={{color: 'white'}} to="">About us</Link>
           <Link style={{color: 'white'}} to="">Privacy Policy</Link>
        </div>
        <div className="d-flex justify-content-end flex-column">
          <div>
          <h5 className="text-white">SOCIAL</h5>
          <hr style={{opacity: '100%', backgroundColor: 'red', width: '25%', height: 5}}/>
          <ul style={{listStyle: 'none', display: 'flex', padding:0}}>
            <li className="me-3">
              <span className="test-hover test-hover">
                <i  className="bi bi-facebook fs-4 text-white"/>
              </span>
            </li>
            <li className="me-3">
              <span>
                <i className="bi bi-instagram fs-4 text-white"/>
              </span>
            </li>
            <li className="me-3">
              <span>
               <i className="bi bi-play-btn fs-4 text-white"/>
              </span>
            </li>
            <li>
              <span>
               <i className="bi bi-twitter fs-4 text-white"/>
              </span>
            </li>
          </ul>
          </div>
          <div>
          <h5 className="text-white">PAYMENT METHODS</h5>
          <hr style={{opacity: '100%', backgroundColor: 'red', width: '25%', height: 5}}/>
          <ul style={{listStyle: 'none', display: 'flex', padding: 0}}>
            <li className="me-2">
              <span>
                <img style={{width: '40px'}} src="https://images.footlocker.com/content/dam/final/footlockereurope/Online_activations/backpages/ic_mastercard.png" alt="" />
              </span>
            </li>
            <li className="me-2">
              <span>
                <img style={{width: '40px'}} src="https://images.footlocker.com/content/dam/final/footlockereurope/Online_activations/backpages/ic_paypal.png" alt="" />
              </span>
            </li>
            <li className="me-2">
              <span>
                <img style={{width: '40px'}} src="https://images.footlocker.com/content/dam/final/footlockereurope/Online_activations/backpages/ic_visa.png" alt="" />
              </span>
            </li>
            <li>
              <span>
                <img style={{width: '40px'}} src="https://images.footlocker.com/content/dam/final/footlockereurope/Online_activations/fl-campaign/2023/2023_04_18_fl_onl_card_logos/05_final_output_files/2023_04_18_FL_ONL_Card_logos_design_maestro_37X25.jpg" alt="" />
              </span>
            </li>
          </ul>
          </div>
        </div>
      </div>
      <div style={{ padding: "2rem" }}>
        © {currentYear} Nati Peretz. All rights reserved.
      </div>
    </>
  );
};

export default Footer;
