import { Rating } from "@material-ui/lab";
import React,{useEffect} from "react";
import {clearErrors } from "../../actions/userAction";

import { useSelector, useDispatch } from "react-redux";
import { useAlert } from "react-alert";
const ReviewCard = ({ review}) => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const {user,error } = useSelector((state) => state.user);
  
  const options = {
    value: review.rating,
    readOnly: true,
    precision: 0.5,
  };
  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
   
  }, [dispatch,error,alert])
  return (
    <div className="reviewCard">
      <img src={user !== null ? user.avatar.url : "https://res.cloudinary.com/dk0o7tdks/image/upload/v1678017177/images/umoau3sk3sczsqvz6w8z.png"} alt="User" />

      <p>{review.name}</p>
      <Rating {...options} />
      <span className="reviewCardComment">{review.comment}</span>
    </div>
  );
};

export default ReviewCard;
