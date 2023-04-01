import React, { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import { BsSearch } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import "./Header.css";
import UserOptions from "./UserOptions";
import { useSelector, useDispatch } from "react-redux";
import { getTotals } from "../slices/cartSlice";
import { getAllUsers } from "../actions/userAction";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [keyword, setKeyword] = useState("");
  const { user, isAuthenticated } = useSelector((state) => state.user);
  const { users } = useSelector((state) => state.allUsers);
  const cart = useSelector((state) => state.cart);

  const searchSubmitHandler = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      navigate(`/store/${keyword}`);
    } else {
      navigate("/store");
    }
  };
  useEffect(() => {
    dispatch(getTotals());
    dispatch(getAllUsers());
  }, [cart, dispatch]);
  console.log(users);
  return (
    <>
      <header className="header-top-strip py-3">
        <div className="container-xxl">
          <div className="row" style={{ height: "55px" }}>
            <div className="col-6">
              <p className="text-white mb-0">
                Free Shipping Over ₹100 & Free Returns
              </p>
            </div>
            <div className="col-6">
              <p className="text-end text-white mb-0">
                Hotline :{" "}
                <a className="text-white" href="tel : +91 9643315148">
                  +91 9643315148
                </a>
              </p>
            </div>
          </div>
        </div>
      </header>

      <header className="header-upper py-3">
        <div className="container-xxl">
          <div className="row align-items-center navbar-1">
            <div className="heading">
              <h2>
                <Link className="text-white">Swag Mart</Link>
              </h2>
            </div>
            <div className="search-input">
              <div className="input-group">
                <input
                  type="text"
                  className="form-control py-2"
                  placeholder="Search Product Here..."
                  aria-label="Search Product Here..."
                  aria-describedby="basic-addon2"
                  onChange={(e) => setKeyword(e.target.value)}
                />
                <span className="input-group-text p-3" id="basic-addon2">
                  <BsSearch className="fs-5" onClick={searchSubmitHandler} />
                </span>
              </div>
            </div>
            <div className="col-5 header-links">
              <div className="header-upper-links-1">
                <Link
                  to="/cart"
                  className="d-flex align-items-center gap-10 text-white cart"
                >
                  <img
                    src="https://res.cloudinary.com/dk0o7tdks/image/upload/v1675353206/images/cart_izcsam.png"
                    alt="cart"
                  />
                  <div className="d-flex flex-column badge-1">
                    <span className="badge bg-white text-dark">
                      {cart.cartItems.length}
                    </span>
                    <p className=" mb-0">₹{cart.cartTotalAmount}</p>
                  </div>
                </Link>
              </div>
              <div className="header-upper-links d-flex align-items-center gap-15">
                {/* <div>
                  <Link
                    
                    className="d-flex align-items-center gap-10 text-white"
                  >
                    <img
                      src="https://res.cloudinary.com/dk0o7tdks/image/upload/v1675353206/images/compare_yplacb.png"
                      alt="compare"
                    />
                    <p className="mb-0">
                      Compare <br /> Products
                    </p>
                  </Link>
                </div>
                <div>
                  <Link
                  
                    className="d-flex align-items-center gap-10 text-white"
                  >
                    <img
                      src="https://res.cloudinary.com/dk0o7tdks/image/upload/v1675353207/images/wishlist_nb35ou.png"
                      alt="wishlist"
                    />
                    <p className=" mb-0">
                      Favourite <br /> Wishlist
                    </p>
                  </Link>
                </div> */}

                {isAuthenticated ? (
                  <div className="p-0">
                    <UserOptions user={user} />
                  </div>
                ) : (
                  <div className="account-links">
                    <Link
                      to="/login"
                      className="d-flex align-items-center  text-white"
                    >
                      <img
                        src="https://res.cloudinary.com/dk0o7tdks/image/upload/v1675353207/images/user_khuf3u.png"
                        alt="user"
                      />
                      <p className=" mb-0">
                        Log in <br /> My Account
                      </p>
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </header>

      <header className="header-bottom">
        <div className="container-xxl">
          <div className="row">
            <div className="col-12">
              <div className="menu-bottom d-flex align-items-center gap-30 menu">
                <div>
                  <div className="dropdown">
                    <button
                      className="btn btn-secondary dropdown-toggle bg-transparent border-0"
                      type="button"
                      id="dropdownMenuButton1"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      <img
                        className="me-2"
                        src="https://res.cloudinary.com/dk0o7tdks/image/upload/v1675353207/images/menu_fhsr2g.png"
                        alt=""
                      />
                      <span className="me-5 d-inline-block">Select Shop</span>
                    </button>
                    <ul
                      className="dropdown-menu"
                      aria-labelledby="dropdownMenuButton1"
                    >
                      {users.map((u, index) => (
                        <li key={index}>
                          <Link
                            className="dropdown-item text-white"
                            to={`/store/shopName=${u.shopName}`}
                          >
                            {u.shopName && u.shopName}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                <div className="menu-links">
                  <div className="d-flex align-items-center gap-15">
                    <NavLink to="/">Home</NavLink>
                    <NavLink to="/store">Our Store</NavLink>
                    {/* <NavLink to="/blogs">Blogs</NavLink> */}
                    <NavLink to="/contact">Contact</NavLink>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
