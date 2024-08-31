const express = require("express");
const router = express.Router();
const Person = require("../models/Person");

// POST route to add person
router.post("/", async (req, res) => {
  try {
    const data = req.body; // Assuming the req body contains the person data

    // create a new person document ucing the monngoose model
    // const newPerson = new Person();
    // newPerson.name=data.name;
    // newPerson.email= data.email;
    //  OR
    const newPerson = new Person(data);

    // save the new person to the database
    const response = await newPerson.save();
    console.log("Data saved");
    res.status(200).json(response);
  } catch (err) {
    console.log(err);
    res.status(500).json({ err: "Internal server error" });
  }
});

router.get("/", async (req, res) => {
  try {
    const data = await Person.find();
    console.log("Data Fetched");
    res.status(200).json(data);
  } catch (err) {
    console.log(err);
    res.status(500).json({ err: "Internal server error" });
  }
});

router.get("/:work", async (req, res) => {
  try {
    const workType = req.params.work; //extract the work from URL

    if (workType == "manager" || workType == "waiter" || workType == "chef") {
      const response = await Person.find({ work: workType });
      console.log("responce fetched");
      res.status(200).json(response);
    } else {
      res.status(404).json({ error: "Invalid work type" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ err: "Internal server error" });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const personId = req.params.id; //extract the person's ID
    const updatedPerson = req.body; //updateable data for person provided by body-parser

    const response = await Person.findByIdAndUpdate(personId, updatedPerson, {
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

router.delete("/:id",async (req , res)=>{
   try {
      const personId = req.params.id;
      const response= await Person.findByIdAndDelete(personId);
      if(!response){
         return res.status(404).json({error:"person not found"})
      }
      res.status(200).json(response);
      console.log('Person Deleted');
      
   } catch (err) {
      res.status(500).json({err:"Internal server error"})
   }
})

module.exports = router;
