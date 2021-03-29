require("dotenv").config();
const express = require("express")
const nodemailer = require('nodemailer')
const cron = require('node-cron')
const request = require('request')
const bodyParser = require('body-parser')
const path = require('path')
const app = express()
const mongoose = require('mongoose')
const port = process.env.PORT || 5000
const { MongoClient, ObjectId, MongoError } = require('mongodb')
const moment = require("moment");
mongoose.connect("mongodb://localhost:27017/schedule", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});


const dateYear = new Date().getFullYear();
const dateMonth = new Date().getMonth();
const dateDay = new Date().getDate();

const tilDB = mongoose.connection;
tilDB.on("error", console.error.bind(console, "connection error:"));
//Journal schema for entries made through home page
const scheduleSchema = new mongoose.Schema({
  customerName: String,
  phoneNumber: String,
  email: String,
  vehicleMake:Array,
  vehicleType: String,
  additionalNotes: String,
  date:String,
  timeOfApp: String,
  dateAppMade: Date,
});

const ScheduleModel = mongoose.model("appointments", scheduleSchema)

app.use(express.urlencoded({ extended: true }));
app.use(express.static("./client/public"));

app.post("/api", async (req, res) => {
  let entryTime = moment().format('l')
  const newAppointment = new ScheduleModel({
    customerName: req.body.customerName,
    phoneNumber: req.body.phoneNumber,
    email: req.body.email,
    vehicleMake: req.body.vehicleMake,
    vehicleType: req.body.vehicleType,
    additionalNotes: req.body.additionalNotes,
    date:req.body.date,
    timeOfApp: req.body.timeOfApp,
    dateAppMade: req.body.dateAppMade
  });
  await newAppointment.save(function (err) {
    if (err) throw err;
  });
  res.redirect("/");


let transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASSWORD
  }
})
console.log(req.body.email)
let mailOptions = {
  from: 'DWVTtest@gmail.com',
  to: req.body.email,
  subject: "Your appointment has been made.",
  text: `Hello ${req.body.customerName} \n
  Your appointment on ${req.body.date} at ${req.body.timeOfApp} has been schedule with Detail Works VT. Thank You for your businnes and we look forward to seeing you. \n
  Have a wonderful day \n
  The Staff at Detail Works VT`
}



transporter.sendMail(mailOptions, function(err, data) {
  if(err) {
    console.log('Error Occurs');
  } else {
    console.log('Email Sent')
  }
})

console.log(req.body.date)
let dayOfApp = req.body.date.split('-')
  let monthOf = +dayOfApp[1]
  let dayBefore = +dayOfApp[2] - 1
  let yearOf = +dayOfApp[0]
  
  console.log(dayOfApp, 'line 96')
  console.log(dayBefore, "appointment")
  console.log(monthOf, "appointment")
  console.log(yearOf, "appointment")
  console.log(dateDay, 'current')
  console.log(dateMonth, 'current')
  console.log(dateYear, 'current')
//Should send automated reminder a day before appointment (not sure if it works)
cron.schedule('* * 17 * * *', () => {
  // let dayOfApp = req.body.date.split('-')
  // let monthOf = +dayOfApp[1]
  // let dayBefore = +dayOfApp[2] - 1
  // let yearOf = +dayOfApp[0]
  
  // console.log(dayOfApp, 'line 98')
  // console.log(dayBefore)
  // console.log(monthOf)
  // console.log(yearOf)


  if(dateDay === dayBefore && dateMonth === monthOf && dateYear === yearOf) {
    const mailReminder = {
      from: 'DWVTtest@gmail.com', 
      to: req.body.email, 
      subject: "Appointment Reminder Detail Works VT",
      text: `Hello ${req.body.customerName} \n
      Just a friendly reminder that you have an appointment with Detail Works VT tommorow ${req.body.date} at ${req.body.timeOfApp}. \n
      Have a wonderful day \n
      The Staff at Detail Works VT`
    } 
    return transporter.sendMail(mailReminder, (err, data) => {
      if (err) {
        console.log(err)
        return
      } else {
        console.log('success on reminder')
      }
    })
  }


})

})



app.post("/adminapi", async (req, res) => {
  let entryTime = moment().format('l')
  const newAppointment = new ScheduleModel({
    customerName: req.body.customerName,
    phoneNumber: req.body.phoneNumber,
    email: req.body.email,
    vehicleMake: req.body.vehicleMake,
    vehicleType: req.body.vehicleType,
    additionalNotes: req.body.additionalNotes,
    date:req.body.date, 
    timeOfApp: req.body.timeOfApp,
    dateAppMade: req.body.dateAppMade
  });
  await newAppointment.save(function (err) {
    if (err) throw err;
  });
  res.redirect("/admin");

})

app.get("/api", async (req, res) => {
  const cursor = await ScheduleModel.find({}).sort({ date: -1 });
  let results = [];
  await cursor.forEach((entry) => {
    results.push(entry);
  });
  res.json(results);
});

//Search according to the tags request
app.get("/search", async (req, res) => {
  let search = req.query
  console.log(search)

  let key = Object.keys(search)[0]
  console.log(key)
  let temp=search[key]
  console.log(temp)
  const cursor = await ScheduleModel.find({ [key]: `${temp}` }).sort({ date: -1 })
  let results = [];

  // iterate over out cursor object to push each document into our array
  await cursor.forEach((entry) => {
    results.push(entry);
  })
  console.log(results)
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