import React, { Fragment, useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import "./productReviews.css";
import { useSelector, useDispatch } from "react-redux";
import {
  deleteQuery,
  getAllQueries,
  clearErrors,
} from "../../actions/contactAction";
import { useAlert } from "react-alert";
import { Button } from "@material-ui/core";
import MetaData from "../MetaData";
import Star from "@material-ui/icons/Star";
import SideBar from "./Sidebar";
import { DELETE_QUERY_RESET } from "../../constants/contactConstant";
import { useNavigate } from "react-router-dom";

const Contacts = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const alert = useAlert();

  const { error: deleteError, isDeleted } = useSelector(
    (state) => state.deleteQuery
  );

  const { error, contacts,loading } = useSelector((state) => state.allqueries);

  
  const [queryId, setQueryId] = useState("");


  const productQuerySubmitHandler = (e) => {
    e.preventDefault();
    dispatch(deleteQuery(queryId));
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    dispatch(getAllQueries());

    if (deleteError) {
      alert.error(deleteError);
      dispatch(clearErrors());
    }

    if (isDeleted) {
      alert.success("Query Deleted Successfully");
      navigate("/admin/contacts/query");
      dispatch({ type: DELETE_QUERY_RESET });
    }
  }, [dispatch, alert, error, deleteError, navigate, isDeleted]);

  const columns = [
    { field: "id", headerName: "QUERY ID", minWidth: 260, flex: 0.5 },

    {
      field: "user",
      headerName: "User",
      minWidth: 150,
      flex: 0.6,
    },

    {
      field: "email",
      headerName: "email",
      minWidth: 300,
      flex: 1,
    },
    {
      field: "phone",
      headerName: "Phone",
      minWidth: 40,
      flex: 1,
    },

    {
      field: "comments",
      headerName: "Comments",
      type: "number",
      minWidth: 530,
      flex: 0.4,

      cellClassName: (params) => {
        return params.getValue(params.id, "rating") >= 3
          ? "greenColor"
          : "redColor";
      },
    },
  ];

  const rows = [];

  contacts &&
    contacts.forEach((item) => {
      rows.push({
        id: item._id,
        email: item.email,
        phone: item.phone,
        comments: item.comments,
        user: item.name,
      });
    });

  return (
    <Fragment>
      <MetaData title={`ALL CONTACTS - Admin`} />
      <div className="dashboard">
        <SideBar />
        <div className="productReviewsContainer">
          <form
            className="productReviewsForm"
            onSubmit={productQuerySubmitHandler}
          >
            <h1 className="productReviewsFormHeading">ALL CONTACT QUERIES</h1>

            <div>
              <Star />
              <input
                type="text"
                placeholder="Contact Query Id"
                required
                value={queryId}
                onChange={(e) => setQueryId(e.target.value)}
              />
            </div>

            <Button
              id="createProductBtn"
              className="review-search"
              type="submit"
              style={{fontWeight:"500"}}
              disabled={
                loading ? true : false || queryId === "" ? true : false
              }
            >
              Delete Contact Query
            </Button>
          </form>

          {contacts && contacts.length > 0 ? (
            <DataGrid
              rows={rows}
              columns={columns}
              pageSize={7}
              disableSelectionOnClick
              className="productListTable"
              autoHeight
            />
          ) : (
            <h1 className="productReviewsFormHeading">No Contacts Found</h1>
          )}
        </div>
      </div>
    </Fragment>
  );
};

export default Contacts;
