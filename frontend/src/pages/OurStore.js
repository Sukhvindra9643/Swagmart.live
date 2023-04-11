import React, { useState, useEffect, Fragment } from "react";
import BreadCrumb from "../components/BreadCrumb";
import MetaData from "../components/MetaData";
// import InfiniteScroll from "react-infinite-scroll-component";
import Pagination from "react-js-pagination";
import ProductCard from "../components/Products/ProductCard";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { getProduct, clearErrors } from "../actions/productAction";
import { useAlert } from "react-alert";
import Loader from "../components/Loader/Loader";
import { MdArrowDropDown } from "react-icons/md";
// import RandomCard from "../components/Products/RandomCard";
import "./OurStore.css";
const prices = [
  [1, 500],
  [501, 1000],
  [1001, 3000],
  [3001, 5000],
  [5001, 10000],
  [10001, 100000],
];
const categories = [["Laptop","Phone", "SmartWatch","Camera"],["Watch","Bracelet"], ["T-Shirt","Pants","Top","Bottom"],["Oil","Masale"]];
const colors = [
  "red",
  "green",
  "blue",
  "pink",
  "black",
  "brown",
  "violet",
  "orange",
  "yellow",
  "white",
];
const brands = ["apple", "lenovo", "hp", "havels", "oppo", "oneplus"];
const sizes = ["S", "M", "L", "XL", "XXL"];
const sortby = [
  "Featured",
  "Special",
  "Bestselling",
  "Alphabetically A-Z",
  "Alphabetically Z-A",
  "Price Low to High",
  "Price High to Low",
  "Date Old to New",
  "Date New to Old",
];
const OurStore = () => {
  const dispatch = useDispatch();
  let { keyword } = useParams();
  const alert = useAlert();
  const [currentPage, setCurrentPage] = useState(1);
  const [price, setPrice] = useState([0, 100000]);
  const [subcategory, setSubCategory] = useState("");
  const [stock, setStock] = useState("true");
  const [color, setColor] = useState("");
  const [size, setSize] = useState("");
  const [ratings, setRatings] = useState(0);
  const [brand, setBrand] = useState("");
  const [sortFilter, setSortFilter] = useState("");
  let width = window.innerWidth;
  let g = width < 600 ? 6 : 3;
  console.log("g",g)
  const [grid, setGrid] = useState(g);
  const [filterShowHide, setFilterShowHide] = useState(`${width <=600 ? "none":"block"}`);


  const { products, loading, error, productsCount, resultPerPage } =
    useSelector((state) => state.products);

  const InStock = (e) => {
    setStock("true");
  };
  const OutStock = (e) => {
    setStock("false");
  };
  const setCurrentPageNo = (e) => {
    setCurrentPage(e);
  };
  const filterHandler = (e) => {
    setSortFilter(e.target.value);
  };
  const ResetFilter = () => {
    setCurrentPage(1);
    setPrice([0, 100000]);
    setRatings(0);
    setSubCategory("");
    setColor("");
    setSize("");
    setStock("true");
    setBrand("");
    setSortFilter("");
  };
  let count = productsCount;

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    dispatch(
      getProduct(
        keyword,
        currentPage,
        price,
        subcategory,
        ratings,
        stock,
        color,
        size,
        brand,
        sortFilter
      )
    );
  }, [
    dispatch,
    error,
    alert,
    keyword,
    currentPage,
    price,
    subcategory,
    ratings,
    stock,
    color,
    size,
    brand,
    sortFilter,
    grid
  ]);
  // eslint-disable-next-line
  
 
  const handleFilterBox = () => {
    if (filterShowHide === "none") setFilterShowHide("block");
    if (filterShowHide === "block") setFilterShowHide("none");
  };
  return (
    <>
      <MetaData title={"Our Store"} />
      <BreadCrumb title={"Our Store"} />
      <div className="store-wrapper home-wrapper-2 py-5">
        <div className="container-xxl">
          <div className="row">
            <div onClick={handleFilterBox} className="filter">
              Filters <MdArrowDropDown />
            </div>
            <div
              className="col-3 filter-box"
              style={{ display: `${filterShowHide}` }}
            >
              <div className="filter-card mb-3">
                <h3 className="filter-title">Shop By Categories</h3>
                <div className="d-flex align-items-center gap-10">
                <div className="d-flex flex-column">
                  {categories.map((category, i) => (
                    category.map((c, i) => (
                    <input
                      style={{
                        width: "1.20em",
                        height: "1.20em",
                        marginRight: "10px",
                      }}
                      className="form-check-input"
                      type="radio"
                      name="subcategory"
                      key={i}
                      onClick={() => setSubCategory(c.toLowerCase())}
                    />
                  ))))}
                </div>
                <div
                  className="d-flex flex-column mb-0"
                  style={{
                    fontSize: "15px",
                    lineHeight: "24px",
                    marginTop: "5px",
                  }}
                >
                  {categories.map((category, i) => (
                    category.map((c, i) => (
                    <label
                      className="form-check-label"
                      htmlFor="subcategory"
                      key={i}
                    >
                      {c}
                    </label>
                  ))))}
                </div>
              </div>
              </div>
              <div className="filter-card mb-3">
                <h3 className="filter-title">Filter by</h3>
                <h5 className="sub-title">Clear Filter</h5>
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    name="clear-filter"
                    value=""
                    id="clear-filter"
                    onChange={ResetFilter}
                  />
                  <label className="form-check-label" htmlFor="clear-filter">
                    Clear Filter
                  </label>
                </div>
                <div>
                  <h5 className="sub-title">Availability</h5>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="stock"
                      value={stock}
                      id="instock"
                      onChange={InStock}
                    />
                    <label className="form-check-label" htmlFor="instock">
                      In Stock(1)
                    </label>
                  </div>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="stock"
                      value={stock}
                      id="outofstock"
                      onChange={OutStock}
                    />
                    <label className="form-check-label" htmlFor="outofstock">
                      Out Of Stock(0)
                    </label>
                  </div>
                  <h5 className="sub-title">Price</h5>
                  <div className="d-flex align-items-center gap-10">
                    <div className="d-flex flex-column">
                      {prices.map((price, i) => (
                        <input
                          style={{
                            width: "1.20em",
                            height: "1.20em",
                            marginRight: "10px",
                          }}
                          className="form-check-input"
                          type="radio"
                          name="price"
                          key={i}
                          onClick={() => setPrice(price)}
                        />
                      ))}
                    </div>
                    <div
                      className="d-flex flex-column mb-0"
                      style={{
                        fontSize: "15px",
                        lineHeight: "24px",
                        marginTop: "5px",
                      }}
                    >
                      {prices.map((price, i) => (
                        <label
                          className="form-check-label"
                          htmlFor="color-1"
                          key={i}
                        >
                          {price[0]} &ensp;-&ensp; {price[1]}
                        </label>
                      ))}
                    </div>
                  </div>
                  <h5 className="sub-title">Colors</h5>
                  <div>
                    <div className="d-flex flex-wrap">
                      <div className="colors">
                        <ul className="colors">
                          {colors.map((color,i) => (
                            <li
                              style={{ backgroundColor: color }}
                              key={i}
                              onClick={() => setColor(color)}
                            ></li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                  <h5 className="sub-title">Size</h5>

                  <div className="form-check d-flex">
                    <div className="d-flex flex-column">
                      {sizes.map((size, i) => (
                        <input
                          style={{
                            width: "1.20em",
                            height: "1.20em",
                            marginRight: "10px",
                          }}
                          className="form-check-input"
                          type="radio"
                          name="size"
                          key={i}
                          onClick={() => setSize(size)}
                        />
                      ))}
                    </div>
                    <div
                      className="d-flex flex-column mb-0"
                      style={{ fontSize: "15px", lineHeight: "22px" }}
                    >
                      {sizes.map((size,i) => (
                        <label
                          className="form-check-label"
                          htmlFor="color-1"
                          key={i}
                        >
                          {size}
                        </label>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              <div className="filter-card mb-3">
                <h3 className="filter-title">Product Brand</h3>
                <div className="d-flex flex-wrap gap-10">
                  {brands.map((brand,i) => (
                    <div
                      className="product-tags d-flex flex-wrap align-items-center"
                      key={i}
                      onClick={() => setBrand(brand)}
                    >
                      <span className="badge bg-light text-secondary rounded-3 py-2 px-3">
                        {brand}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
              {/* <div className="filter-card mb-3">
                <h3 className="filter-title">Random Product</h3>
                <div>
                  {products &&
                    products.map((product) => (
                      <RandomCard
                        key={product._id}
                        product={product}
                        grid={grid}
                      />
                    ))}
                </div>
              </div> */}
            </div>
            <div className="col-9">
              <div className="filter-sort-grid">
                <div className="d-flex align-items-center h-100">
                  <div className="d-flex align-items-center gap-10">
                    <p className="mb-0 d-block">Sort By</p>
                    <select
                      name=""
                      className="form-control form-select"
                      id=""
                      onChange={filterHandler}
                    >
                      {sortby.map((item,i) => (
                        <option value={item.toLowerCase()} key={i}>{item}</option>
                      ))}
                    </select>
                  </div>

                  <div className="d-flex align-items-center gap-10 grid filter-grid">
                    <p className="total-products mb-0">12 Products</p>
                    <div className="d-flex align-items-center gap-10">
                      <img
                        onClick={() => setGrid(3)}
                        src="https://res.cloudinary.com/dk0o7tdks/image/upload/v1675353207/images/gr4_c5li2a.png"
                        className="gr-4-img img-fluid"
                        alt="gr"
                      />
                      <img
                        onClick={() => setGrid(4)}
                        src="https://res.cloudinary.com/dk0o7tdks/image/upload/v1675353207/images/gr3_tcpexh.png"
                        className="gr-3-img img-fluid"
                        alt="gr"
                      />
                      <img
                        onClick={() => setGrid(6)}
                        src="https://res.cloudinary.com/dk0o7tdks/image/upload/v1675353206/images/gr2_gmmnwk.png"
                        className="d-block img-fluid"
                        alt="gr"
                      />
                      <img
                        onClick={() => setGrid(12)}
                        src="https://res.cloudinary.com/dk0o7tdks/image/upload/v1675353207/images/gr_zhsv2f.png"
                        className="d-block img-fluid"
                        alt="gr"
                      />
                    </div>
                  </div>
                </div>
              </div>
              {/* {loading && <Loader />}
              {products && (
                <InfiniteScroll
                  dataLength={count}
                  next={() => setCurrentPage(currentPage + 1)}
                  hasMore={currentPage * 8 <= count}
                  loader={<Loader />}
                >
                  <div className="d-flex flex-wrap gap-10">
                    {allProducts &&
                      products.map((product) => (
                        <ProductCard
                          key={product._id}
                          product={product}
                          grid={grid}
                        />
                      ))}
                  </div>
                </InfiniteScroll>
              )} */}
              <div className="product-list pb-5 mt-2">
                {loading ? (
                  <Loader />
                ) : (
                  <div
                    className="d-flex flex-wrap gap-10"
                    style={{ padding: "18px 0px" }}
                  >
                    {products &&
                      products.map((product) => (
                        <ProductCard
                          key={product._id}
                          product={product}
                          grid={grid}
                        />
                      ))}
                  </div>
                )}
              </div>
              {resultPerPage < count && (
                <div className="paginationBox">
                  <Pagination
                    activePage={currentPage}
                    itemsCountPerPage={resultPerPage}
                    totalItemsCount={productsCount}
                    onChange={setCurrentPageNo}
                    nextPageText="Next"
                    prevPageText="Prev"
                    firstPageText="1st"
                    lastPageText="Last"
                    itemClass="page-item"
                    linkClass="page-link"
                    activeClass="pageItemActive"
                    activeLinkClass="pageLinkActive"
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default OurStore;
