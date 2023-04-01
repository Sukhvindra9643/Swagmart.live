import React from "react";
import "./sidebar.css";
import logo from "../../components/images/logo.png";
import { Link } from "react-router-dom";
import { TreeView, TreeItem } from "@material-ui/lab";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import PostAddIcon from "@material-ui/icons/PostAdd";
import AddIcon from "@material-ui/icons/Add";
import ImportExportIcon from "@material-ui/icons/ImportExport";
import ListAltIcon from "@material-ui/icons/ListAlt";
import DashboardIcon from "@material-ui/icons/Dashboard";
import RateReviewIcon from "@material-ui/icons/RateReview";

const Sidebar = () => {
  return (
    <>
    <div className="sidebar">
      <Link to="/">
        <img src={logo} alt="Ecommerce" />
    
      </Link>
      <Link to="/seller/dashboard">
        <p>
          <DashboardIcon /> Dashboard
        </p>
      </Link>
      <Link>
        <TreeView
          defaultCollapseIcon={<ExpandMoreIcon />}
          defaultExpandIcon={<ImportExportIcon />}
        >
          <TreeItem nodeId="1" label="Products">
            <Link id="all-product" to="/seller/products">
              <TreeItem nodeId="2" label="All" icon={<PostAddIcon />} />
            </Link>

            <Link id="create-product" to="/seller/product">
              <TreeItem nodeId="3" label="Create" icon={<AddIcon />} />
            </Link>
          </TreeItem>
        </TreeView>
      </Link>
      <Link to="/seller/orders">
        <p>
          <ListAltIcon />
          Orders
        </p>
      </Link>
      <Link to="/seller/reviews">
        <p>
          <RateReviewIcon />
          Reviews
        </p>
      </Link>
    </div>
    <div className="sidebar-m">
      <div className="d-flex flex-wrap w-100" style={{height:"125px",justifyContent:"space-around"}}>
      <Link to="/">
        <img src={logo} alt="Ecommerce" />
    
      </Link>
      <Link to="/seller/dashboard">
        <p>
          <DashboardIcon /> Dashboard
        </p>
      </Link>
      <Link>
        <TreeView
          defaultCollapseIcon={<ExpandMoreIcon />}
          defaultExpandIcon={<ImportExportIcon />}
        >
          <TreeItem nodeId="1" label="Products">
            <Link id="all-product" to="/seller/products">
              <TreeItem nodeId="2" label="All" icon={<PostAddIcon />} />
            </Link>

            <Link id="create-product" to="/seller/product">
              <TreeItem nodeId="3" label="Create" icon={<AddIcon />} />
            </Link>
          </TreeItem>
        </TreeView>
      </Link>
      <Link to="/seller/orders">
        <p>
          <ListAltIcon />
          Orders
        </p>
      </Link>
      <Link to="/seller/reviews">
        <p>
          <RateReviewIcon />
          Reviews
        </p>
      </Link>
      </div>
    </div>
    </>
  );
};

export default Sidebar;
