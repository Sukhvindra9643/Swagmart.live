import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";
import { useSelector, useDispatch } from "react-redux";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import About from "./pages/About";
import Contacts from "./pages/Contacts";
import OurStore from "./pages/OurStore";
import ProductDetails from "./components/Products/ProductDetail";
// import Blogs from "./pages/Blogs";
// import CompareProduct from "./pages/CompareProduct";
// import Wishlist from "./pages/Wishlist";
import LoginSignUp from "./pages/LoginSignUp";
import Profile from "./pages/Profile";
import UpdateProfile from "./pages/UpdateProfile";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import Cart from "./components/Cart/Cart";
import Shipping from "./components/Cart/Shipping";
import ConfirmOrder from "./components/Cart/ConfirmOrder";
import Buy from "./components/Cart/Buy";
import OrderSuccess from "./components/Cart/OrderSuccess";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { loadUser } from "./actions/userAction";
import NotFound from "./components/Not Found/NotFound";
import MyOrder from "./components/Order/MyOrders";
import OrderDetails from "./components/Order/OrderDetails";
import UpdatePassword from "./pages/UpdatePassword";
import Dashboard from "./components/Admin/Dashboard";
import ProductsList from "./components/Admin/ProductList";
import NewProduct from "./components/Admin/NewProduct";
import UsersList from "./components/Admin/UsersList";
import UpdateUser from "./components/Admin/UpdateUser";
import UpdateProduct from "./components/Admin/UpdateProduct";
import OrderList from "./components/Admin/OrderList";
import ProcessOrder from "./components/Admin/ProcessOrder";
import ProductReviews from "./components/Admin/ProductReviews";
import ContactsQuery from "./components/Admin/ContactQuery";
import SellerDashboard from "./components/Seller/Dashboard";
import SellerProductsList from "./components/Seller/ProductList";
import SellerNewProduct from "./components/Seller/NewProduct";
import SellerUpdateProduct from "./components/Seller/UpdateProduct";
import SellerOrderList from "./components/Seller/OrderList";
import SellerProcessOrder from "./components/Seller/ProcessOrder";
import SellerProductReviews from "./components/Seller/ProductReviews";

function App() {
  const { isAuthenticated, user } = useSelector((state) => state.user);
  const [stripeApiKey, setStripeApiKey] = useState("");
  const dispatch = useDispatch();
 
  async function getStripeApiKey() {
    const { data } = await axios.get("/api/v1/stripeapikey");
    setStripeApiKey(data.stripeApiKey);
  }

  useEffect(() => {
    getStripeApiKey();
    dispatch(loadUser());
    //eslint-disable-next-line
  }, [dispatch]);

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="" element={<Layout user={user} />}>
            <Route index element={<Home />} />
            <Route path="about" element={<About />} />
            <Route path="contact" element={<Contacts />} />
            <Route path="store" element={<OurStore />} />
            <Route path="login" element={<LoginSignUp />} />
            <Route path="password/forgot" element={<ForgotPassword />} />
            <Route path="password/reset/:token" element={<ResetPassword />} />
            <Route exact path="store/:keyword" element={<OurStore />} />
            <Route path="product/:id" user={user} element={<ProductDetails />} />
            <Route path="cart" element={<Cart />} />
            {isAuthenticated && <Route path="account" element={<Profile />} />}
            {isAuthenticated && <Route path="me/update" element={<UpdateProfile />} />}
            {isAuthenticated && <Route path="password/update" element={<UpdatePassword />} />}
            {isAuthenticated && <Route path="shipping" element={<Shipping />} />}
            {isAuthenticated && <Route path="order/confirm" element={<ConfirmOrder />} />}
            {isAuthenticated && <Route path="orders/me" element={<MyOrder />} />}
            {isAuthenticated && <Route path="order/:id" element={<OrderDetails />} />}
            {isAuthenticated && <Route path="success" element={<OrderSuccess />} />}
            {isAuthenticated && <Route path="admin/dashboard" element={<Dashboard />} />}
            {isAuthenticated && <Route path="admin/products" element={<ProductsList />} />}
            {isAuthenticated && <Route path="admin/product" element={<NewProduct />} />}
            {isAuthenticated && <Route path="admin/users" element={<UsersList />} />}
            {isAuthenticated && <Route path="admin/user/:id" element={<UpdateUser />} />}
            {isAuthenticated && <Route path="admin/product/:id" element={<UpdateProduct />} />}
            {isAuthenticated && <Route path="admin/orders" element={<OrderList />} />}
            {isAuthenticated && <Route path="admin/order/:id" element={<ProcessOrder />} />}
            {isAuthenticated && <Route path="admin/reviews" element={<ProductReviews />} />}
            {isAuthenticated && <Route path="admin/contacts/query" element={<ContactsQuery/>} />}
            {isAuthenticated && <Route path="seller/dashboard" element={<SellerDashboard user={user}/>} />}
            {isAuthenticated && <Route path="seller/products" element={<SellerProductsList />} />}
            {isAuthenticated && <Route path="seller/product" element={<SellerNewProduct />} />}
            {isAuthenticated && <Route path="seller/product/:id" element={<SellerUpdateProduct />} />}
            {isAuthenticated && <Route path="seller/orders" element={<SellerOrderList />} />}
            {isAuthenticated && <Route path="seller/order/:id" element={<SellerProcessOrder />} />}
            {isAuthenticated && <Route path="seller/reviews" element={<SellerProductReviews />} />}
            {isAuthenticated && <Route
              path="/payment/process"
              element={
                stripeApiKey && (
                  <Elements stripe={loadStripe(stripeApiKey)}>
                    <Buy />
                  </Elements>
                )
              }
            />}
             {isAuthenticated && 
              <Route
                element={
                  window.location.pathname === "/payment/process" ? null : (
                    <NotFound />
                  )
                }
              />}
          </Route>
          <Route exact path="/payment-complete" element={<OrderSuccess />} />
          {/* <Route path="blogs" element={<Blogs />} /> */}
          {/* <Route path="compare-product" element={<CompareProduct />} /> */}
          {/* <Route path="wishlist" element={<Wishlist />} /> */}
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
