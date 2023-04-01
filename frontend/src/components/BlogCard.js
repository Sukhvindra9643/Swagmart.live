import React from 'react'
import { Link } from 'react-router-dom'

const BlogCard = () => {
  return (
    <div className="col-3 mb-3">
        <div className='blog-card'>
            <img src='images/blog-1.jpg' className='img-fluid' alt=''/>
        </div>
        <div className='blog-content'>
            <p className='date'>01 JAN, 2023</p>
            <h5 className='title'>A Beautiful Sunday Morning remainssance</h5>
            <p className='description'>hello how are you i am fine kdfklsfsakldffffffffffffffffffffff</p>
            <Link to="/" className='button'>Read More</Link>
        </div>
      
    </div>
  )
}

export default BlogCard
