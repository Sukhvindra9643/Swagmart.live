const mongoose = require("mongoose"); // Erase if already required

// Declare the Schema of the Mongo model
var productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true,"Please Enter Product Name"],
    trim:true
  },
  description: {
    type: String,
    required: [true,"Please Enter Product Description"]
  },
  price: {
    type: Number,
    required: true,
  },
  brand: {
    type: String,
    required: true,
  },
  ratings: {
    type: Number,
  },
  images: [
    {
      public_id:{
        type: String,
        required:true,
      },
      url:{
        type: String,
        required:true,
      }
    },
  ],
  popularity:{
    type:String,
    required:true
  },
  category:{
    type:String,
    required:true
  },
  subcategory:{
    type:String,
    required:true
  },
  stock:{
    type:Number,
    required:[true,"Please Enter Product Stock"],
    maxLength : [5,"Stock cannot exceed 5 characters"],
    default : 1
  },
  numOfReviews:{
    type:Number,
    default : 0
  },
  color:{
    type:String,
    required : [true,"Please Enter Product Color"]
  },
  size:{
    type: String,
  },
  reviews: [
    {
      user:{
        type:mongoose.Schema.ObjectId,
        ref: "User",
        required : true,
      },
      name:{
        type:String,
        required : true,
      },
      rating: {
        type: Number,
        required : true
      },
      comment:{
        type:String,
        required : true,
      },
    },
  ],
  user: {
    type:mongoose.Schema.ObjectId,
    ref:"User",
    required : true,
  },
  shopName:{
    type:String,
    required : true,
  },
  createdAt:{
    type:Date,
    default : Date.now,
  },
});

//Export the model
module.exports = mongoose.model("Product", productSchema);
