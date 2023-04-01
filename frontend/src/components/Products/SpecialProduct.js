import React from "react";
import ReactStars from "react-rating-stars-component";
import { Link } from "react-router-dom";
import { addToCart } from "../../slices/cartSlice";
import { useDispatch } from "react-redux";
import { useAlert } from "react-alert";
import "./SpecialProducts.css"

const SpecialProduct = ({ product }) => {
  const dispatch = useDispatch();
  const alert = useAlert();

  const addToCartHandler = () => {
    dispatch(addToCart(product));
    alert.success("Item Added To Cart");
  };
  let classname = `col-4 mb-3`;

  return (
    <Link className={classname} to={`/product/${product._id}`}>
      <div className="special-product-card">
        <div>
          <div className="special-product-image">
            <img src={product && product.images[0].url} alt="special product" />
          </div>
          <div className="special-product-content">
            <h5 className="brand">{product && product.brand}</h5>
            <h6 className="title">{product && product.name}</h6>
            <ReactStars
              count={5}
              size={24}
              value={product && product.ratings}
              edit={false}
              activeColor="#ffd700"
            />
            <p className="price">
              <span className="text-danger">₹{product && product.price}</span>{" "}
              &nbsp; <strike>₹{product.price + product.price*0.10}</strike>
            </p>
            <div className="discount-till d-flex align-items-center gap-10">
              <p className="mb-0">
                <b>5 days</b>
              </p>
              <div className="d-flex gap-10 align-items-center">
                <span className="badge rounded-circle bg-danger">1</span>
                <span className="badge rounded-circle bg-danger">1</span>
                <span className="badge rounded-circle bg-danger">1</span>
              </div>
            </div>
            <div className="product-count mt-3">
              <p>Products : {product.stock}</p>
              <div className="progress">
                <div
                  className="progress-bar"
                  role="progressbar"
                  style={{ width: "25%" }}
                  aria-valuenow="25"
                  aria-valuemin="0"
                  aria-valuemax="100"
                ></div>
              </div>
            </div>
            <Link  className="button mt-3" onClick={addToCartHandler}>Add to Cart</Link>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default SpecialProduct;
