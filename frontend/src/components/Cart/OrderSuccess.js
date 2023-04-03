import React, { useEffect } from "react";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import "./OrderSuccess.css";
import {Typography } from "@material-ui/core";
import { Link } from "react-router-dom";
import { createOrder} from "../../actions/orderAction";
import { useDispatch} from "react-redux";

const OrderSuccess = () => {
  const dispatch = useDispatch();
  const order = JSON.parse(localStorage.getItem("order"));
  localStorage.removeItem("order");

  useEffect(() => {
    if(order){
      console.log("order")
      dispatch(createOrder(order));
    }
    // eslint-disable-next-line
  }, []);
  return (
    <div className="orderSuccess">
      <CheckCircleIcon />

      <Typography>Your Order has been Placed successfully </Typography>
      <Link to="/orders/me">View Orders</Link>
    </div>
  );
};

export default OrderSuccess;
