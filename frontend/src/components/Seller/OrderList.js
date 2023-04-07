import React, { Fragment, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import "./productList.css";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useAlert } from "react-alert";
import MetaData from "../MetaData";
import EditIcon from "@material-ui/icons/Edit";
import SideBar from "./Sidebar";
import {
  getAllSellerOrders,
  clearErrors,
} from "../../actions/orderAction";
import { DELETE_ORDER_RESET } from "../../constants/orderConstant";

const OrderList = ({ user }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const alert = useAlert();

  const { error, orders } = useSelector((state) => state.allOrders);

  const { error: deleteError, isDeleted } = useSelector((state) => state.order);


  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (deleteError) {
      alert.error(deleteError);
      dispatch(clearErrors());
    }

    if (isDeleted) {
      alert.success("Order Deleted Successfully");
      navigate("/seller/orders");
      dispatch({ type: DELETE_ORDER_RESET });
    }

    dispatch(getAllSellerOrders());
  }, [dispatch, alert, error, deleteError, navigate, isDeleted]);

  const columns = [
    { field: "id", headerName: "Order ID", minWidth: 150, flex: 1 },

    {
      field: "status",
      headerName: "Status",
      minWidth: 150,
      flex: 0.5,
      cellClassName: (params) => {
        return params.getValue(params.id, "status") === "Delivered"
          ? "greenColor"
          : "redColor";
      },
    },
    {
      field: "itemsQty",
      headerName: "Qty",
      type: "number",
      minWidth: 70,
      flex: 0.4,
    },

    {
      field: "amount",
      headerName: "Amount",
      type: "number",
      minWidth: 100,
      flex: 0.5,
    },

    {
      field: "actions",
      flex: 0.3,
      headerName: "Actions",
      minWidth: 100,
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <Fragment>
            <Link to={`/seller/order/${params.getValue(params.id, "id")}`}>
              <EditIcon />
            </Link>
          </Fragment>
        );
      },
    },
  ];

  const rows = [];
  let orderDetails = [];
  let price = 0;
  let cartLength = 0;
  let shopName = "";
  let itemUrl = [];
  let name = [];
  let quantity = 0;
  let orderId = "";
  let productPrice = [];
  orders &&
    orders.forEach((item) => {
      for (let i = 0; i < item.orderItems.cartItems.length; i++) {
        shopName = item.orderItems.cartItems[i].shopName;

        price =
          price +
          (item.orderItems.cartItems[i].shopName === user.shopName
            ? item.orderItems.cartItems[i].price*item.orderItems.cartItems[i].cartQuantity
            : 0);
        cartLength += item.orderItems.cartItems[i].shopName === user.shopName ? 1 : 0;
        (shopName === user.shopName)?productPrice.push(item.orderItems.cartItems[i].price):console.log();
        (shopName === user.shopName)?itemUrl.push(item.orderItems.cartItems[i].images[0].url):console.log();
        (shopName === user.shopName)?name.push(item.orderItems.cartItems[i].name):console.log();
        quantity = item.orderItems.cartItems[i].cartQuantity;
        orderId = item._id;
        (shopName === user.shopName)
          ? orderDetails.push([shopName,price,cartLength,itemUrl,name,quantity,orderId,productPrice])
          : console.log();
      }
      rows.push({
        id: item._id,
        itemsQty: cartLength,
        amount: price,
        status: item.orderStatus,
      });
      // orderDetails.push([shopName,price,cartLength])
      price = 0;
      cartLength = 0;
      name = [];
      productPrice = [];
      itemUrl = [];
    });
  localStorage.setItem("ordersDetails", JSON.stringify(orderDetails));
  return (
    <Fragment>
      <MetaData title={`ALL ORDERS - Seller`} />

      <div className="dashboard">
        <SideBar />
        <div className="productListContainer">
          <h1 id="productListHeading">ALL ORDERS</h1>

          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={7}
            disableSelectionOnClick
            className="productListTable"
            autoHeight
          />
        </div>
      </div>
    </Fragment>
  );
};

export default OrderList;
