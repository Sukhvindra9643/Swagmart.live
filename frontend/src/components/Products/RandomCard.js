import React from 'react'
import ReactStars from "react-rating-stars-component";

const RandomCard = ({product}) => {
  return (
    <div className="random-products d-flex mb-3">
                    <div className="w-50">
                      <img
                        className="img-fluid"
                        src="images/watch.jpg"
                        alt="watch"
                      />
                    </div>
                    <div className="w-50">
                      <h5>Smart Watch</h5>
                      <ReactStars
                        count={5}
                        size={24}
                        value={4}
                        edit={false}
                        activeColor="#ffd700"
                      />
                      <b>$300 </b>
                    </div>
                  </div>
  )
}

export default RandomCard
