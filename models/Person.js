const mongoose = require('mongoose'); 


// Define the person schema  -> In SQL creating Table

const personSchema = new mongoose.Schema({
   name:{
      type:String,
      required:true
   },
   age:{
      type:Number,
   },
   work:{
      type:String,
      required:true,
      enum:['chef','waiter','manager']
   },
   mobile:{
      type:String,
      required:true,
   },
   email:{
      type:String,
      required:true,
      unique:true
   },
   address:{
      type:String,
      required:true,
   },
   salary:{
      type:Number,
      required:true,
   },
});

// create person model
const Person = mongoose.model('Person',personSchema);
module.exports=Person;


