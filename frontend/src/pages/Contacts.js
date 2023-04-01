import React,{useState} from "react";
import MetaData from "../components/MetaData";
import BreadCrumb from "../components/BreadCrumb";
import { AiOutlineHome, AiOutlineMail } from "react-icons/ai";
import { BiPhoneCall } from "react-icons/bi";
import { BsInfoCircle } from "react-icons/bs";
import { useDispatch } from "react-redux";
import {createQuery} from "../actions/contactAction"
import "./Contacts.css"
const Contacts = () => {
  const dispatch = useDispatch();
  
  const [name, setName] = useState("");
  const [email,setEmail] = useState("");
  const [phone,setPhone] = useState("");
  const [comments,setComments] = useState("");

  const contactFormSubmitHandler = (e) =>{
    e.preventDefault();

    const formData = new FormData();
  
    formData.set('name',name);
    formData.set("email",email);
    formData.set("phone",phone);
    formData.set("comments",comments);
  
    dispatch(createQuery(formData));

  }
  return (
    <div>
      <MetaData title={"Contacts Us"} />
      <BreadCrumb title={"Contacts Us"} />
      <div className="contact-wrapper py-5 home-wrapper-2">
        <div className="container-xxl">
          <div className="row">
            <div className="col-12">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d28626.07587222847!2d79.22649140324762!3d26.253240543500265!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3976244b60ca591d%3A0x95f762b23dbba3f2!2sGohani%2C%20Uttar%20Pradesh!5e0!3m2!1sen!2sin!4v1675017772147!5m2!1sen!2sin"
                width="600"
                height="450"
                title="myFrame"
                className="border-0 w-100"
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
            <div className="col-12 mt-5">
              <div className="contact-inner-wrapper home-wrapper-2 d-flex justify-content-between">
                <div>
                  <h3 className="contact-title mb-4">Contact</h3>
                  <form action="" className="d-flex flex-column gap-15">
                    <div>
                      <input
                        type="text"
                        name="name"
                        className="form-control"
                        placeholder="Name"
                        onChange={(e)=> setName(e.target.value)}
                      />
                    </div>
                    <div>
                      <input
                        type="text"
                        name="email"
                        className="form-control"
                        placeholder="Email"
                        onChange={(e)=> setEmail(e.target.value)}
                      />
                    </div>
                    <div>
                      <input
                        type="text"
                        name="phone"
                        className="form-control"
                        placeholder="Phone Number"
                        onChange={(e)=> setPhone(e.target.value)}
                      />
                    </div>
                    <div>
                      <textarea
                        name="comments"
                        cols={30}
                        rows={10}
                        className="form-control"
                        placeholder="Comments"
                        onChange={(e)=> setComments(e.target.value)}
                      ></textarea>
                    </div>
                    <div>
                      <button className="button border-0" onClick={contactFormSubmitHandler}>Submit</button>
                    </div>
                  </form>
                </div>
                <div>
                  <h3 className="contact-title">Get in touch with us</h3>
                  <div>
                    <ul className="ps-0">
                      <li className="d-flex gap-15 align-items-center mb-3">
                        <AiOutlineHome className="fs-5"/>
                        <address className="mb-0">
                        Village Gohani Post Sarawan District jalaun UP
                        </address>
                      </li>
                      <li className="d-flex gap-15 align-items-center mb-3">
                        <BiPhoneCall className="fs-5"/>
                        <a href="tel :- +91 9643315148">+91 9643315148</a>
                      </li>
                      <li className="d-flex gap-15 align-items-center mb-3">
                        <AiOutlineMail className="fs-5" />
                        <a href="mailto :- sukhvindrasngh8670@gmail.com">

                        sukhvindrasingh8670@gmail.com
                        </a>
                      </li>
                      <li className="d-flex gap-15 align-items-center mb-3">
                        <BsInfoCircle className="fs-5"/>
                        <p className="mb-0">Monday - Friday &nbsp; 9AM - 6PM</p>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contacts;
