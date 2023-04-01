import React, { useEffect } from "react";
import Sidebar from "./Sidebar.js";
import "./dashboard.css";
import { Typography } from "@material-ui/core";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getSellerProduct } from "../../actions/productAction";
import { getAllSellerOrders } from "../../actions/orderAction.js";
import MetaData from "../MetaData";



const Dashboard = ({user}) => {
  const dispatch = useDispatch();

  const { products } = useSelector((state) => state.products);

  const { orders } = useSelector((state) => state.allOrders);

  let outOfStock = 0;

  products &&
    products.forEach((item) => {
      if (item.stock === 0) {
        outOfStock += 1;
      }
    });

  useEffect(() => {
    dispatch(getSellerProduct());
    dispatch(getAllSellerOrders());
  }, [dispatch]);

  let totalAmount = 0;
  orders &&
    orders.forEach((item) => {
      totalAmount += item.totalPrice;
    });
    let width = window.innerWidth;
  return (
    <div className="dashboard">
      <MetaData title="Dashboard - Seller Panel" />
      <Sidebar />

      <div className="dashboardContainer">
        <Typography component="h1">Dashboard<span>{" ("+(user.shopName)+")"}</span></Typography>
 
        <div className="dashboardSummary">
          <div>
            <p>
              Total Amount <br /> ₹{totalAmount}
            </p>
          </div>
          <div className="dashboardSummaryBox2">
            <Link to="/seller/products">
              <p>Product</p>
              <p>{products && products.length}</p>
            </Link>
            <Link to="/seller/orders">
              <p>Orders</p>
              <p>{orders && orders.length}</p>
            </Link>
            <Link to="/seller/products">
              <p style={width < 600 ? {fontSize:"16px"}:{}}>OutOfStock</p>
              <p>{outOfStock && outOfStock}</p>
            </Link>
          </div>
        </div> 
      </div>
    </div>

  );
};

export default Dashboard;
