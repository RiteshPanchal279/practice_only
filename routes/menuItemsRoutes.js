const express = require("express");
const router = express.Router();
const MenuItem = require("../models/MenuItem");

router.post("/", async (req, res) => {
  try {
    const data = req.body; //here data will come from "/menuitem" here
    const newItem = new MenuItem(data);
    const response = await newItem.save();
    console.log("Data saved");
    res.status(200).json(response);
  } catch (err) {
    console.log(err);
    res.status(500).json({ err: "Internal server error" });
  }
});

router.get("/", async (req, res) => {
  try {
    const data = await MenuItem.find();
    console.log("Data Fetched");
    res.status(200).json(data);
  } catch (err) {
    console.log(err);
    res.status(500).json({ err: "Internal server error" });
  }
});

router.get("/:taste", async (req, res) => {
  try {
    const testType = req.params.taste;
    if (testType == "spicy" || testType == "sour" || testType == "sweet") {
      const responce = await MenuItem.find({ taste: testType });
      console.log("responce fetched");
      res.status(200).json(responce);
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ err: "Internal server error" });
  }
});

router.put("/:id", async (req, res) => {
   try {
     const menuId = req.params.id; //extract the person's ID
     const menuData = req.body; //updateable data for person provided by body-parser
 
     const response = await MenuItem.findByIdAndUpdate(menuId, menuData, {
       new: true, //Return the updated document
       runValidators: true, // Run mongoose validation
     });
 
     if (!response) {
      return res.status(404).json({ error: "person not found" });
     }

     console.log("data updated");
     res.status(200).json(response);
   } catch (err) {
     console.log(err);
     res.status(500).json({ err: "Internal server error" });
   }
});

router.delete("/:id",async (req,res)=>{
   try {
      const menuId = req.params.id;
      const response = await MenuItem.findByIdAndDelete(menuId);
      if(!response){
         return res.status(404).json({error:"menu not found"})
      }
      console.log('Menu deleted');
      res.status(200).json(response);
      
   } catch (err) {
      res.status(500).json(err); 
     console.log('Internal server error');
   }
})

module.exports = router;
