require("dotenv").config();
const express = require("express");
//const request = require('request')

var cors = require("cors");
// const request = require('request')
const bodyParser = require("body-parser");
const path = require("path");
const app = express();
const mongoose = require("mongoose");
mongoose.set("useCreateIndex", true);
const port = process.env.PORT || 5000;
const { MongoClient, ObjectId, MongoError } = require("mongodb");
//const moment = require("moment");

const nodemailer = require("nodemailer");
const cron = require("node-cron");
const request = require("request");
const moment = require("moment");
mongoose.connect("mongodb://localhost:27017/schedule", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const dateYear = new Date().getFullYear();
const dateMonth = new Date().getMonth() + 1;
const dateDay = new Date().getDate();

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
  date: String,
  timeOfApp: String,
  dateAppMade: Date,
});

const ScheduleModel = mongoose.model("appointments", scheduleSchema);
ScheduleModel.createIndexes();
app.use(express.urlencoded({ extended: true }));
app.use(express.static("./client/public"));
let allowedAppointments;

let transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASSWORD,
  },
});

app.post("/api", async (req, res) => {
  const newAppointment = new ScheduleModel({
    customerName: req.body.customerName,
    phoneNumber: req.body.phoneNumber,
    email: req.body.email,
    vehicleMake: req.body.vehicleMake,
    vehicleType: req.body.vehicleType,
    additionalNotes: req.body.additionalNotes,
    date: req.body.date,
    timeOfApp: req.body.timeOfApp,
    dateAppMade: req.body.dateAppMade,
  });
  await newAppointment.save(function (err) {
    if (err) throw err;
  });
  res.redirect("/");

  let mailOptions = {
    from: "DWVTtest@gmail.com",
    to: req.body.email,
    subject: "Your appointment has been made.",
    text: `Hello ${req.body.customerName} \n Your appointment on ${req.body.date} at ${req.body.timeOfApp} has been schedule with Detail Works VT. Thank You for your businnes and we look forward to seeing you. \n
    Have a wonderful day \n The Staff at Detail Works VT`,
  };

  transporter.sendMail(mailOptions, function (err, data) {
    if (err) {
      console.log("Error Occurs");
    } else {
      console.log("Email Sent");
    }
  });

  console.log(req.body.email);
  console.log(req.body.date);
});
//Sends automated email reminder a day before appointment
async function queryDb() {
  const cursor = await ScheduleModel.find({});
  let results = [];
  cursor.forEach((entry) => {
    results.push(entry);
  });
  results.forEach((appointment) => {
    cron.schedule("* * * 11 * *", () => {
      let dayOfApp = appointment.date.split("-");
      let monthOf = +dayOfApp[1];
      let dayBefore = +dayOfApp[2] - 1;
      let yearOf = +dayOfApp[0];
      if (dateDay == dayBefore && dateMonth == monthOf && dateYear == yearOf) {
        const mailReminder = {
          from: "DWVTtest@gmail.com",
          to: appointment.email,
          subject: "Appointment Reminder Detail Works VT",
          text: `Hello ${appointment.customerName} \n
    Just a friendly reminder that you have an appointment with Detail Works VT tommorow ${appointment.date} at ${appointment.timeOfApp}. \n
    Have a wonderful day \n
    The Staff at Detail Works VT`,
        };
        return transporter.sendMail(mailReminder, (err, data) => {
          if (err) {
            console.log("error occured");
            return;
          } else {
            console.log("success on reminder");
          }
        });
      }
    });
  });
}

queryDb();

app.post("/adminapi", async (req, res) => {
  const newAppointment = new ScheduleModel({
    customerName: req.body.customerName,
    phoneNumber: req.body.phoneNumber,
    email: req.body.email,
    vehicleMake: req.body.vehicleMake,
    vehicleType: req.body.vehicleType,
    additionalNotes: req.body.additionalNotes,
    date: req.body.date,
    timeOfApp: req.body.timeOfApp,
    dateAppMade: req.body.dateAppMade,
  });
  await newAppointment.save(function (err) {
    if (err) throw err;
  });
  res.redirect("/admin");
});

app.get("/api", async (req, res) => {
  const cursor = await ScheduleModel.find({}).sort({ date: -1 });
  let results = [];
  await cursor.forEach((entry) => {
    results.push(entry);
  });
  res.json(results);
});

//Filter according to the tags request
app.get("/filter", async (req, res) => {
  let filter = req.query;
  console.log(filter);

  let key = Object.keys(filter)[0];
  console.log(key);
  let temp = filter[key];
  console.log(temp);
  const cursor = await ScheduleModel.find({ [key]: `${temp}` }).sort({
    date: -1,
  });
  let results = [];

  // iterate over out cursor object to push each document into our array
  await cursor.forEach((entry) => {
    results.push(entry);
  });
  console.log(results);
  res.json(results);
});

//Full text Search
app.get("/search", async (req, res) => {
  console.log("test search");
  //var regex = new RegExp(req.params.key,'i')
  //const cursor=ScheduleModel.users.find({customerName: new RegExp('^' +search + '$', 'i')}); //For exact search, case insensitive
  //await cursor .forEach((entry) =>{

  //ScheduleModel.search({query_string: {query: req.body.q}}, function(err, results) {
  // res.send(results);
  //});

  try {
    var query = req.query;
    let key = Object.keys(query)[0];
    console.log(query);
    let temp = query[key];
    console.log(`search11`, query);
    console.log(`search`, temp);
    scheduleSchema.index({ "$**": "text" });
    const cursor = await ScheduleModel.findOne(temp);

    console.log(`results`, cursor);
    console.log("findme");

    let results = [];
    await cursor.forEach((entry) => {
      results.push(entry);
    });
    res.send(results);

    //res.json({cursor:cursor})
  } catch (err) {
    res.json({ message: err });
  }

  //res.redirect("/admin");
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
