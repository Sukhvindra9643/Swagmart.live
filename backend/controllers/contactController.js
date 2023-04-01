const Contact = require("../models/contactQueryModel");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");



exports.createQuery = catchAsyncErrors(async (req, res, next) => {
  const message = {
    name:req.body.name,
    email:req.body.email,
    phone : req.body.phone,
    comments:req.body.comments
  }
  const contact = await Contact.create(message);
    res.status(201).json({
      success:true,
      contact
    })
  
  });

exports.getAllQueries = catchAsyncErrors(async (req, res, next) => {
    const contacts = await Contact.find();
  
    res.status(200).json({
      success: true,
      contacts,
    });
  });
  exports.deleteQuery = catchAsyncErrors(async (req,res,next)=>{
    const contact = await Contact.findById(req.params.id);

    if(!contact){
        return res.status(500).json({
            success:false,
            message:"Contact Query Not Found"
        })
    }

    await contact.remove();
    res.status(200).json({
        success:true,
        message:"Contact Deleted Successfully"
    })
})