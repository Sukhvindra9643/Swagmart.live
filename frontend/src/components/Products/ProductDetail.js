import React, { Fragment, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import { useSelector, useDispatch } from "react-redux";
import "./ProductDetails.css";
import {
  clearErrors,
  getProductDetails,
  newReview,
} from "../../actions/productAction";
import { Rating } from "@material-ui/lab";
import { NEW_REVIEW_RESET } from "../../constants/productConstants";
import Loader from "../Loader/Loader";
import { useAlert } from "react-alert";
import MetaData from "../MetaData";
import { addToCart } from "../../slices/cartSlice";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
} from "@material-ui/core";
import ReviewCard from "./ReviewCard.js";
import ReactStars from "react-rating-stars-component";

const ProductDetail = ({user}) => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const { id } = useParams();

  const { product, loading, error } = useSelector(
    (state) => state.productDetails
  );

  const { success, error: reviewError } = useSelector(
    (state) => state.newReview
  );

  const [quantity, setQuantity] = useState(1);
  const [open, setOpen] = useState(false);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState();

  const increaseQuantity = () => {
    if (product.stock <= quantity) return;

    const qty = quantity + 1;
    setQuantity(qty);
  };

  const decreaseQuantity = () => {
    if (1 >= quantity) return;

    const qty = quantity - 1;
    setQuantity(qty);
  };
  const handleAddToCart = () => {
    dispatch(addToCart(product));
    alert.success("Item Added To Cart");
  };
  const submitReviewToggle = () => {
    open ? setOpen(false) : setOpen(true);
  };

  const reviewSubmitHandler = () => {
    const myForm = new FormData();

    myForm.set("rating", rating);
    myForm.set("comment", comment);
    myForm.set("productId", id);

    dispatch(newReview(myForm));

    setOpen(false);
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    if (reviewError) {
      alert.error(reviewError);
      dispatch(clearErrors());
    }

    if (success) {
      alert.success("Review Submitted Successfully");
      dispatch({ type: NEW_REVIEW_RESET });
    }
    dispatch(getProductDetails(id));
  }, [dispatch, id, error, success, reviewError, alert]);
  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <div
          className="container container-fluid"
          style={{ marginTop: "50px" }}
        >
          <MetaData title={`${product.name} -- ECOMMERCE`} />
          <div className="row f-flex justify-content-around">
            <Carousel>
              {product.images && product.images.map((item,i)=>(
                 <div>
                 <img key={item.public_id} src={item.url} alt="products"/>
               </div>
              ))}
            </Carousel>
            <div className="col-12 col-lg-5 mt-5">
              <h3>{product.name}</h3>
              <p id="product_id">Product {product._id}</p>

              <hr />

              <div className="rating-outer">
                <div className="rating-inner">
                  <ReactStars
                    count={5}
                    size={24}
                    value={product && product.ratings}
                    edit={false}
                    activeColor="#ffd700"
                  />
                </div>
              </div>
              <span id="no_of_reviews"> ({product.numOfReviews} Reviews)</span>

              <hr />

              <p id="product_price">₹{product.price}</p>
              <div className="stockCounter d-flex mb-2">
                <span
                  className="btn btn-danger minus"
                  onClick={decreaseQuantity}
                >
                  -
                </span>
                <input
                  type="number"
                  className="form-control count d-inline"
                  style={{
                    width: "65px",
                    margin: "0 10px",
                    textAlign: "center",
                  }}
                  value={quantity}
                  readOnly
                />

                <span
                  className="btn btn-primary plus"
                  onClick={increaseQuantity}
                >
                  +
                </span>
              </div>
              <button
                type="button"
                id="cart_btn"
                className="btn btn-primary d-inline ml-4"
                onClick={handleAddToCart}
                style={{ width: "155px" }}
              >
                Add to Cart
              </button>

              <hr />

              <p>
                Status:{" "}
                <span id="stock_status">
                  {product.stock >= 1 ? "In Stock" : "Out Of Stock"}
                </span>
              </p>

              <hr />

              <h4 className="mt-2">Description:</h4>
              <p>{product.description}</p>
              <hr />
              {/* <p id="product_seller mb-3">
            Sold by: <strong>Amazon</strong>
          </p> */}

              <button
                id="review_btn"
                type="button"
                className="btn btn-primary mt-4"
                data-toggle="modal"
                data-target="#ratingModal"
                onClick={submitReviewToggle}
              >
                Submit Your Review
              </button>

            </div>
            <h3 className="reviewsHeading" style={{ marginTop: "100px" }}>
              REVIEWS
            </h3>

            <Dialog
              aria-labelledby="simple-dialog-title"
              open={open}
              onClose={submitReviewToggle}
            >
              <DialogTitle>Submit Review</DialogTitle>
              <DialogContent className="submitDialog">
                <Rating
                  onChange={(e) => setRating(e.target.value)}
                  value={rating}
                  size="large"
                />

                <textarea
                  className="submitDialogTextArea"
                  cols="30"
                  rows="5"
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                ></textarea>
              </DialogContent>
              <DialogActions>
                <Button onClick={submitReviewToggle} color="secondary">
                  Cancel
                </Button>
                <Button onClick={reviewSubmitHandler} color="primary">
                  Submit
                </Button>
              </DialogActions>
            </Dialog>

            {product.reviews && product.reviews[0] ? (
              <div className="reviews" style={{ marginBottom: "50px" }}>
                {product.reviews &&
                  product.reviews.map((review) => (
                    <ReviewCard key={review._id} review={review} user={user}/>
                  ))}
              </div>
            ) : (
              <p className="noReviews">No Reviews Yet</p>
            )}
          </div>
        </div>
      )}
    </Fragment>
  );
};

export default ProductDetail;
