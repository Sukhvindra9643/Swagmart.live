class ApiFeatures {
  constructor(query, queryStr) {
    this.query = query;
    this.queryStr = queryStr;
  }

  search() {
    const keyword = this.queryStr.keyword
      ? {
          name: {
            $regex: this.queryStr.keyword,
            $options: "i",
          },
        }
      : {};

    this.query = this.query.find({ ...keyword });
    return this;
  }

  filter() {
    const queryCopy = { ...this.queryStr };
    let key = queryCopy["popularity"];

    let queryStr = JSON.stringify(queryCopy);
    queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g, (key) => `$${key}`);

    let newQueryStr = JSON.parse(queryStr);
    delete newQueryStr.popularity;
    // newQueryStr = JSON.stringify(newQueryStr);
    // if(JSON.parse(queryStr).category === "electronics" || JSON.parse(queryStr).category === "accessories" || JSON.parse(queryStr).category === "clothing" || JSON.parse(queryStr).category === "footwear"){
    //   this.query = this.query.find({category:JSON.parse(queryStr).category})
    //   return this;
    // }

    if (!key) {
      this.query = this.query.find(JSON.parse(queryStr));
      return this;
    } else {
      switch (key) {
        case "featured":
          this.query = this.query.find(JSON.parse(queryStr));
          return this;
          break;
        case "special":
          this.query = this.query.find(JSON.parse(queryStr));
          return this;
          break;
        case "bestselling":
          this.query = this.query.find(JSON.parse(queryStr));
          return this;
          break;
        case "alphabetically a-z":
          this.query = this.query.find(newQueryStr).sort({ name: 1 });
          return this;
          break;
        case "alphabetically z-a":
          this.query = this.query.find(newQueryStr).sort({ name: -1 });
          return this;
          break;
        case "price low to high":
          this.query = this.query.find(newQueryStr).sort({ price: 1 });
          return this;
          break;
        case "price high to low":
          this.query = this.query
            .find(newQueryStr)
            .sort({ price: -1 });
          return this;
          break;
        case "date old to new":
          this.query = this.query
            .find(newQueryStr)
            .sort({ createdAt: 1 });
          return this;
          break;
        case "date new to old":
          this.query = this.query
            .find(newQueryStr)
            .sort({ createdAt: -1 });
          return this;
          break;

        default:
          this.query = this.query.find(JSON.parse(queryStr));
          return this;
          break;
      }
    }
  }
  pagination(resultPerPage) {
    const currentPage = Number(this.queryStr.page) || 1;

    const skip = resultPerPage * (currentPage - 1);

    this.query = this.query.limit(resultPerPage).skip(skip);

    return this;
  }
}

module.exports = ApiFeatures;
