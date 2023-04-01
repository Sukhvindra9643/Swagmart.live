import React, { useState } from "react";
import ReactStars from "react-rating-stars-component";
import { Link, useLocation, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useAlert } from "react-alert";
import { addToCart } from "../../slices/cartSlice";
import "../../pages/Home.css"

const ProductCard = ({ product, grid }) => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const { keyword } = useParams();
  let location = useLocation();
  const [like,setLike] = useState(["https://res.cloudinary.com/dk0o7tdks/image/upload/v1675353208/images/wish_vdcmao.png","16px","16px"]);
  let classname;
  if(keyword){
    classname = `${location.pathname === `/store/${keyword}`? `gr-${grid}`:"col-3"}`;
  }else{
    classname = `${location.pathname === `/store`? `gr-${grid}`:"col-3"}`;
  }

  const addToCartHandler = () => {
    dispatch(addToCart(product));
    alert.success("Item Added To Cart");
  };
  return (
    <div className={classname}>
      <Link
        to={`/product/${product._id}`}
        className="product-card position-relative"
      >
        <div className="wishlist-icon  position-absolute">
          <Link>
            <img
              style={{width:`${like[1]}`, height:`${like[2]}`}}
              className=""
              src={like[0]}
              alt="wishlist"
              onClick={()=>setLike(["https://res.cloudinary.com/dk0o7tdks/image/upload/v1675446692/images/IMG_20230203_231950_987_niukas.png","22px","16px"])}
            />
          </Link>
        </div>
        <div className="product-image">
          <img src={product.images[0].url} alt={product && product.name} />
          <img src={product.images[0].url} alt="product" />
        </div>
        <div className="product-details ms-1">
          <h6 className="brand text-danger">{product && product.brand}</h6>
          <h5 className="product-title text-dark">{product && product.name}</h5>
          <ReactStars
            count={5}
            size={24}
            value={product && product.ratings}
            edit={false}
            activeColor="#ffd700"
          />
          <p className="description text-dark">
            {product && product.description}
          </p>
          <p className="price">₹&nbsp;{product && product.price}</p>
        </div>
        <div className="action-bar position-absolute">
          <div className="d-flex flex-column gap-15">
            {/* <Link to={`/compare-product/${product._id}`}>
              <img
                src="https://res.cloudinary.com/dk0o7tdks/image/upload/v1675353207/images/prodcompare_a2byx1.png"
                alt="compare"
              />
            </Link> */}
            {/* <Link to="/view">
              <img
                src="https://res.cloudinary.com/dk0o7tdks/image/upload/v1675353207/images/view_ochb6c.png"
                alt="view"
              />
            </Link> */}
            <Link to={location} onClick={addToCartHandler}>
              <img
                src="https://res.cloudinary.com/dk0o7tdks/image/upload/v1675353206/images/add-cart_mhxvbg.png"
                alt="addcart"
              />
            </Link>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default ProductCard;
