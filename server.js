require("dotenv").config();
const express = require("express")
const request = require('request')
const bodyParser = require('body-parser')
const path = require('path')
const app = express()
const mongoose = require('mongoose')
const port = process.env.PORT || 5000
const { MongoClient, ObjectId, MongoError } = require('mongodb')

mongoose.connect("mongodb://localhost:27017/schedule", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const tilDB = mongoose.connection;
tilDB.on("error", console.error.bind(console, "connection error:"));
//Journal schema for entries made through home page
const scheduleSchema = new mongoose.Schema({
  customerName: String,
  phoneNumber: String,
  email: String,
  vehicleMake: Array,
  vehicleType: String,
  additionalNotes: String,
  dateOfApp: String,
  timeOfApp: String,
  dateAppMade: String,
});

const ScheduleModel = mongoose.model("appointments", scheduleSchema)

app.use(express.urlencoded({ extended: true }));
app.use(express.static("./client/public"));

app.post("/api", (req, res) => {
    const newAppointment =  new ScheduleModel({
        customerName: req.body.customerName,
        phoneNumber: req.body.phoneNumber,
        email: req.body.email, 
        vehicleMake: req.body.vehicleMake,
        vehicleType: req.body.vehicleType,
        additionalNotes: req.body.additionalNotes,
        dateOfApp: req.body.dateOfApp, 
        timeOfApp: req.body.timeOfApp,
        dateAppMade: new Date(),
    });
    newAppointment.save(function (err) {
        if (err) throw err;
      });
      res.redirect("/");

      const email = req.body.email
      console.log(email)

      const mcData = {
        members : [
          {
            email_address: email,
            status: 'pending'
          }
        ]
      }

      const mcDataPost = JSON.stringify(mcData)

      const options = {
        url: '',
        method: 'POST',
        headers: {
          Authorization: 'auth ..'
        },
        body: mcDataPost
      } 

      if(email) {
        request(options, (err, response, body) => {
          if(err) {
            res.json({error: err})
          } 
        })
      } else {
        res.status(404).send({message: 'Failed'})
      }

})



app.post("/adminapi", (req, res) => {
  const newAppointment =  new ScheduleModel({
      customerName: req.body.customerName,
      phoneNumber: req.body.phoneNumber,
      email: req.body.email, 
      vehicleMake: req.body.vehicleMake,
      vehicleType: req.body.vehicleType,
      additionalNotes: req.body.additionalNotes,
      dateOfApp: req.body.dateOfApp, 
      timeOfApp: req.body.timeOfApp,
      dateAppMade: new Date(),
  });
  newAppointment.save(function (err) {
      if (err) throw err;
    });

    res.redirect("/admin");

    
   
})

app.get("/api", async (req, res) => {
    const cursor = await ScheduleModel.find({}).sort({dateOfApp: 1});
    let results = [];
    await cursor.forEach((entry) => {
      results.push(entry);
    });
    res.json(results);
  });

  app.get(`/api/:id`, async (req, res) => {
    let result = await ScheduleModel.findOne({ _id: ObjectId(req.params.id) });
  
    res.json(result);
  });

  app.post("/api/:id", async (req, res) => {
    let setObj = { $set: req.body };
    const editAppointment = await ScheduleModel.updateOne(
      { _id: ObjectId(req.params.id) },
      setObj
    );
  
    res.redirect("/admin");
  });
  
  app.post("/delete/:id", async (req, res) => {
    await ScheduleModel.deleteOne({ _id: ObjectId(req.params.id) });
  
    res.redirect("/admin");
  });


app.listen(port, () => {
    console.log("Listening on port", port);
  });