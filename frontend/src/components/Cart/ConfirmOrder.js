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
import axios from "axios";


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
  console.log(cartItems);
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
    localStorage.setItem("order", JSON.stringify(order));
    navigate("/payment/process");
  };
  // const onBuyNowClick = () => {
  //   order.paymentInfo = {
  //     id: uuidv4(),
  //     status: "succeeded",
  //   };

  //   // localStorage.setItem("order", JSON.stringify(order));
	// 	const data = {
	// 		purpose: 'Online Purchased',
	// 		amount: totalPrice,
	// 		buyer_name: user.name,
	// 		email: user.email,
	// 		phone: user.mobile,
	// 		user_id: user._id,
	// 		redirect_url: `http://68.183.95.79:4000/api/v1/callback?user_id=${user._id}`,
	// 		webhook_url: '/webhook/',
	// 	};

	// 	axios.post( '/api/v1/pay/',data)
	// 		.then( res => {
	// 			window.location.href = res.data;
	// 		} )
	// 		.catch( ( error ) => console.log( error.response.data ) );
  //     localStorage.setItem("order", JSON.stringify(order));
	// };
  const codPayment = () => {
    order.paymentInfo = {
      id: uuidv4(),
      status: "COD",
    };

    dispatch(createOrder(order));
    navigate("/success");
  };
  const onBuyNowClick = () => {
    const data = {
      upiuid: "2147483647",
      token: "4ae699-be4c1a-2ab504-8d3ecd-d0b926",
      orderId: uuidv4(),
      txnAmount : 1,
      txnNote : "Test",
      callback_url: "http://localhost:3000/payment-complete",
      key:"yWrtr6tGPR"
    }

    axios.post( '/api/v1/pay/',data).then( res => {
				data.checksum = res.data;
        console.log("res.data",res.data)
			} )
			.catch( ( error ) => console.log(error.response.data ));

      console.log(data);
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
    axios.post('https://upifast.in/stage/process', data,config).then(res => {
      console.log("res",data);
      localStorage.setItem("order", JSON.stringify(order));
    }).catch( ( error ) => console.log(error));

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
            <button onClick={onBuyNowClick} className="mt-2">
              Buy
            </button>
            {/* <button onSubmit={proceedToPayment(mode)}>Proceed</button> */}
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default ConfirmOrder;
