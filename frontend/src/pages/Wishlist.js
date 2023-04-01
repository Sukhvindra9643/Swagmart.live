import React from "react";
import MetaData from "../components/MetaData";
import BreadCrumb from "../components/BreadCrumb";
const Wishlist = () => {
  return (
    <>
      <MetaData title={"Wishlist"} />
      <BreadCrumb title={"Wishlist"} />
      <div className="home-wrapper-2 wishlist-wrapper py-4">
        <div className="container-xxl">
          <div className="row">
            <div className="col-3">
              <div className="wishlist-card position-relative">
                <img
                  src="images/cross.svg"
                  alt="cross"
                  className="position-absolute cross img-fluid"
                />
                <div className="wishlist-card-images">
                  <img
                    src="images/watch.jpg"
                    alt="watch"
                    className="img-fluid w-100"
                  />
                </div>
                <div  className="py-3 mx-3 bt">
                  <h5 className="title">Watch</h5>
                  <h6 className="price">
                    $100 &nbsp;&nbsp;<strike className="text-dark">$200</strike>
                  </h6>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Wishlist;
