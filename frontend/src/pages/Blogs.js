import React, { useState } from "react";
import MetaData from "../components/MetaData";
import BreadCrumb from "../components/BreadCrumb";
import BlogCard from "../components/BlogCard"
const categories = [
  "Laptop",
  "Footwear",
  "Bottom",
  "Tops",
  "Attire",
  "Camera",
  "Phone",
];

const Blogs = () => {
  // eslint-disable-next-line
  const [category, setCategory] = useState("");
  return (
    <div>
      <MetaData title={"Blogs"} />
      <BreadCrumb title={"Blogs"} />
      <div className="blog-wrapper home-wrapper-2 py-2">
        <div className="container-xxl">
          <div className="row">
            <div className="col-3">
              <div className="filter-card mb-3">
                <h3 className="filter-title">Find By Categories</h3>
                <div>
                  <ul>
                    {categories.map((category) => (
                      <li
                        className=""
                        key={category}
                        onClick={() => setCategory(category.toLowerCase())}
                      >
                        {category}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
            <div className="col-9">
                <div className="row">
                    <BlogCard/>
                    <BlogCard/>
                    <BlogCard/>
                    <BlogCard/>
                    <BlogCard/>
                    <BlogCard/>
                    <BlogCard/>
                    <BlogCard/>
                </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Blogs;
