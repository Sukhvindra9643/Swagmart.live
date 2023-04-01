import React, { Fragment, useEffect } from "react";
import MetaData from "../components/MetaData";
import BreadCrumb from "../components/BreadCrumb";
import { useSelector, useDispatch } from "react-redux";
import { useAlert } from "react-alert";
import { useParams } from "react-router-dom";
import { clearErrors, getProductDetails } from "../actions/productAction";
import Loader from "../components/Loader/Loader";
import Carousel from "react-material-ui-carousel";

const CompareProduct = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const { id } = useParams();

  const { product, loading, error } = useSelector(
    (state) => state.productDetails
  );
   
  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    dispatch(getProductDetails(id));
  }, [dispatch, id, error, alert]);
  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title={"Compare Products"} />
          <BreadCrumb title={"Compare Products"} />
          <div className="compare-product-wrapper home-wrapper-2 py-5">
            <div className="container-xxl">
              <div className="row">
                <div className="col-3">
                  <div className="compare-product-card position-relative">
                    <img
                      src="https://res.cloudinary.com/dk0o7tdks/image/upload/v1675353206/images/cross_mi4iih.png"
                      alt="cross"
                      className="position-absolute cross"
                    />
                    <div className="product-card-image">
                      <Carousel>
                {product.images &&
                  product.images.map((item, i) => (
                    <img
                      className="CarouselImage"
                      key={i}
                      src={item.url}
                      alt={`${i} Slide`}
                    />
                  ))}
              </Carousel>
                    </div>
                    <div className="compare-product-details">
                      <h5 className="title">{product.name}</h5>
                      <h6 className="price">
                        {product.price} &nbsp;&nbsp;
                        <strike className="text-dark">$200</strike>
                      </h6>
                      <div>
                        <div className="product-details">
                          <h5>Brand</h5>
                          <p>{product.brand}</p>
                        </div>
                        <div className="product-details">
                          <h5>Type</h5>
                          <p>{product.category}</p>
                        </div>
                        <div className="product-details">
                          <h5>Availability</h5>
                          <p>{product.stock > 0 ? "In Stock":"Out of Stock"}</p>
                        </div>
                        <div className="product-details">
                          <h5>Color</h5>
                          <div>
                            {product.color}
                          </div>
                        </div>
                        <div className="product-details">
                          <h5>Size</h5>
                          <div className="d-flex gap-10">
                            <p>{product.size}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default CompareProduct;
