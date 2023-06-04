import React from "react";
import { Link } from "react-router-dom";
import { BsLinkedin, BsYoutube, BsInstagram,BsFacebook } from "react-icons/bs";
import "./Footer.css"
const Footer = () => {
  return (
    <>
      <footer className="py-4">
        <div className="container-xxl">
          <div className="row align-items-center">
            <div className="col-5 footer-top-data-iconbox">
              <div className="footer-top-data d-flex gap-30 align-items-center">
                <img src="https://res.cloudinary.com/dk0o7tdks/image/upload/v1675354013/images/newsletter_dqs7we.png" alt="newsletter" />
                <h2 className="mb-0 text-white">Sign Up for Newsletter</h2>
              </div>
            </div>
            
            <div className="col-7 footer-top-data-inputbox">
              <div className="input-group">
                <input
                  type="text"
                  className="form-control py-1"
                  placeholder="Your Email Address"
                  aria-label="Your Email Address"
                  aria-describedby="basic-addon2"
                />
                <span className="input-group-text" id="basic-addon2">
                  Subscribe
                </span>
              </div>
            </div>
          </div>
        </div>
      </footer>
      <footer className="py-4">
        <div className="container-xxl pe-0 ps-2">
          <div className="row footer-middle-data">
            <div className="col-4">
              <h4 className="text-white mb-4 footer-middle-heading">Contact Us</h4>
              <div className="text-white footer-middle-databox-1">
                <address>
                  Hno : 39/1 Govindpuri <br/> kalka ji depot <br />
                  new delhi <br />
                  1100199 <br />
                </address>
                <a
                  href="tel:+91 9958717765"
                  className="mt-1 d-block mb-1 text-white"
                >
                  +91 9958717765
                </a>
                <a
                  href="mailto:byraj7337@gmail.com"
                  className="mt-1 d-block mb-1 text-white"
                >
                  byraj7337@gmail.com
                </a>

                <div className="social-icon d-flex align-items-center gap-30 mt-4">
                  <a className="text-white" href="https://www.linkedin.com/in/mrbharatyadav/">
                    <BsLinkedin className="social-icon-font"/>
                  </a>
                  <a className="text-white" href="https://www.facebook.com/Bharatyadav000/">
                    <BsFacebook className="social-icon-font" />
                  </a>
                  <a className="text-white" href="https://www.youtube.com/channel/UCowX2_97d0rseBAFgpatjbQ">
                    <BsYoutube className="social-icon-font" />
                  </a>
                  <a className="text-white" href="https://www.instagram.com/officialmrbharatyadav/">
                    <BsInstagram className="social-icon-font" />
                  </a>
                </div>
              </div>
            </div>
            <div className="col-3">
              <h4 className="text-white mb-4 footer-middle-heading">Information</h4>
              <div className="footer-link d-flex flex-column footer-middle-databox-1">
                <Link to="/privacy_policy" className="text-white py-2 mb-1">Privacy Policy</Link>
                <Link to="/refund_policy" className="text-white py-2 mb-1">Refund Policy</Link>
                <Link to="/shipping_policy" className="text-white py-2 mb-1">Shipping Policy</Link>
                <Link className="text-white py-2 mb-1">Terms& Condition</Link>
                <Link className="text-white py-2 mb-1">Blogs</Link>
              </div>
            </div>
            <div className="col-3">
              <h4 className="text-white mb-4 footer-middle-heading">Accounts</h4>
              <div className="footer-link d-flex flex-column footer-middle-databox-1">
                <Link className="text-white py-2 mb-1">Search</Link>
                <Link className="text-white py-2 mb-1">About Us</Link>
                <Link className="text-white py-2 mb-1">Faq</Link>
                <Link className="text-white py-2 mb-1">Contact</Link>
              </div>
            </div>
            <div className="col-2">
              <h4 className="text-white mb-4 footer-middle-heading">Quick Links</h4>
              <div className="footer-link d-flex flex-column footer-middle-databox-1">
                <Link className="text-white py-2 mb-1">Laptops</Link>
                <Link className="text-white py-2 mb-1">Headphones</Link>
                <Link className="text-white py-2 mb-1">Tablets</Link>
                <Link className="text-white py-2 mb-1">Watches</Link>
              </div>
            </div>
          </div>
        </div>
      </footer>
      <footer className="py-4">
        <div className="container-xxl">
          <div className="row">
            <div className="col-12">
              <p className="text-center mb-0 text-white" style={{fontSize: "15px"}}>
                &copy; {new Date().getFullYear()}; Developed by Sukhvindra singh
              </p>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
