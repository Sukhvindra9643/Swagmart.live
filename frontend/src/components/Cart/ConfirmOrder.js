import React, { Fragment, useEffect } from "react";
import CheckoutSteps from "../Cart/CheckoutSteps";
import { useDispatch, useSelector } from "react-redux";
import MetaData from "../MetaData";
import "./ConfirmOrder.css";
import { Link, useNavigate } from "react-router-dom";
import { Typography } from "@material-ui/core";
import { createOrder, clearErrors } from "../../actions/orderAction";
import { useAlert } from "react-alert";
import { v4 as uuidv4 } from "uuid";
import { getTotals } from "../../slices/cartSlice";

const ConfirmOrder = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const { error } = useSelector((state) => state.newOrder);
  const cart = useSelector((state) => state.cart);
  const { shippingInfo } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.user);
  const navigate = useNavigate();

  const subtotal = cart.cartTotalAmount;

  const shippingCharges = subtotal > 500 ? 0 : 0;

  const tax = subtotal * 0;

  const totalPrice = subtotal + tax + shippingCharges;
  let cartItems = [];
  for(let i = 0; i < cart.cartItems.length; i++) {
    cartItems.push(cart.cartItems[i].shopName);
  }
  const order = {
    shippingInfo,
    orderItems: cart,
    itemsPrice: subtotal,
    taxPrice: tax,
    shippingPrice: shippingCharges,
    totalPrice: totalPrice,
    shopName: cartItems,
  };

  const onlinePayment = () => {
    sessionStorage.setItem("orderInfo", JSON.stringify(order));
    navigate("/payment/process");
  };
  const codPayment = () => {
    order.paymentInfo = {
      id: uuidv4(),
      status: "COD",
    };
  
    dispatch(createOrder(order));
    navigate("/success");
  };
  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    dispatch(getTotals());
  }, [dispatch, cart, error, alert]);

  return (
    <Fragment>
      <MetaData title="Confirm Order" />
      <CheckoutSteps activeStep={1} />
      <div className="confirmOrderPage">
        <div>
          <div className="confirmshippingArea">
            <Typography>Shipping Info</Typography>
            <div className="confirmshippingAreaBox">
              <div>
                <p>Name:</p>
                <span>{user.name}</span>
              </div>
              <div>
                <p>Phone:</p>
                <span>{shippingInfo.phoneNo}</span>
              </div>
              <div>
                <p>Address:</p>
                <span>{shippingInfo.address},{shippingInfo.country}, ({shippingInfo.pinCode})</span>
              </div>
            </div>
          </div>
          <div className="confirmCartItems">
            <Typography>Your Cart Items:</Typography>
            <div className="confirmCartItemsContainer">
              {cart.cartItems &&
                cart.cartItems.map((item,index) => (
                  <div key={index}>
                    <img src={item.images[0].url} alt="Product" />
                    <Link to={`/product/${item.product}`}>
                      {item.name}
                    </Link>{" "}
                    <span>
                      {item.cartQuantity} X ₹{item.price} ={" "}
                      <b>₹{item.price * item.cartQuantity}</b>
                    </span>
                  </div>
                ))}
            </div>
          </div>
        </div>
        {/*  */}
        <div>
          <div className="orderSummary">
            <Typography>Order Summery</Typography>
            <div>
              <div>
                <p>Subtotal:</p>
                <span>₹{subtotal}</span>
              </div>
              <div>
                <p>Shipping Charges:</p>
                <span>₹{shippingCharges}</span>
              </div>
              <div>
                <p>GST:</p>
                <span>₹{tax}</span>
              </div>
            </div>

            <div className="orderSummaryTotal">
              <p>
                <b>Total:</b>
              </p>
              <span>₹{totalPrice}</span>
            </div>
            <button onClick={codPayment} className="mb-2">
              Cash On Delivery
            </button>
            <button onClick={onlinePayment} className="mt-2">
              Online
            </button>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default ConfirmOrder;
