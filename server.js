//This import necessary for .env file to be executed
require("dotenv").config();
const express = require("express");

//Imports required to set up the database
//const bodyParser = require("body-parser");
const path = require("path");
const app = express();
const mongoose = require("mongoose");
//mongoose.set("useCreateIndex", true);
const port = process.env.PORT || 5000;
const { MongoClient, ObjectId, MongoError } = require("mongodb");

const nodemailer = require("nodemailer");
const cron = require("node-cron");
const request = require("request");

//Imports required for Date format and .CSV download
//const moment = require("moment");

/*------------------------------------------------------------------------------------*/
//server set-up-middleware required for set-up function
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.static("./client/public"));
app.use("/static", express.static(path.join(__dirname, "public")));

const MONGODB_URI = process.env.MONGODB_URI;

//set-up to the database(local)
mongoose.connect(MONGODB_URI || "mongodb://localhost:27017/schedule", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

/*------------------------------------------------------------------------------------*/
const dateYear = new Date().getFullYear();
const dateMonth = new Date().getMonth() + 1;
const dateDay = new Date().getDate();
/*------------------------------------------------------------------------------------*/
//reference to the local database
const tilDB = mongoose.connection;
//// for connection error
tilDB.on("error", console.error.bind(console, "connection error:"));
//Schedule schema for entries made through home page(user-entry)
const scheduleSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  phoneNumber: String,
  email: String,
  detailWorksList: String,
  spectrumList: String,
  vehicleMake: Array,
  vehicleType: String,
  service: Array,
  additionalNotes: String,
  price: Number,
  appointmentDate: String,
  timeOfApp: String,
  dateAppMade: { type: Date, default: Date.now },
});
/*------------------------------------------------------------------------------------*/
//mongoose collection and schema is assigned to a reference model
const ScheduleModel = mongoose.model("appointments", scheduleSchema);
ScheduleModel.createIndexes();

/*------------------------------------------------------------------------------------*/
let transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASSWORD,
  },
});
//add a single entry using the user's input
app.post("/api", async (req, res) => {
  const newAppointment = new ScheduleModel({
    // customerName: req.body.customerName,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    phoneNumber: req.body.phoneNumber,
    email: req.body.email,
    detailWorksList: req.body.detailWorksList,
    spectrumList: req.body.spectrumList,
    vehicleMake: req.body.vehicleMake,
    vehicleType: req.body.vehicleType,
    service: req.body.service,
    price: req.body.price,
    additionalNotes: req.body.additionalNotes,
    appointmentDate: req.body.appointmentDate,
    timeOfApp: req.body.timeOfApp,
    dateAppMade: req.body.dateAppMade,
  });

  //accepts new entry and stores in the db
  await newAppointment.save(function (err) {
    if (err) throw err;
  });
  res.redirect("/");
  /*------------------------------------------------------------------------------------*/
  let mailOptions = {
    from: "DWVTtest@gmail.com",
    to: req.body.email,
    subject: "Your appointment has been made.",
    text: `Hello ${req.body.firstName} ${req.body.lastName} \n Your appointment on ${req.body.appointmentDate} at ${req.body.timeOfApp} has been schedule with Detail Works VT. Thank You for your businnes and we look forward to seeing you. \n
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
  console.log(req.body.appointmentDate);
});
//Sends automated email reminder a day before appointment
async function queryDb() {
  const cursor = await ScheduleModel.find({});
  let results = [];
  cursor.forEach((entry) => {
    results.push(entry);
  });
  results.forEach((appointment) => {
    cron.schedule("00 27 14 * * *", () => {
      let dayOfApp = appointment.appointmentDate.split("-");
      let monthOf = +dayOfApp[1];
      let dayBefore = +dayOfApp[2] - 1;
      let yearOf = +dayOfApp[0];
      if (dateDay == dayBefore && dateMonth == monthOf && dateYear == yearOf) {
        const mailReminder = {
          from: "DWVTtest@gmail.com",
          to: appointment.email,
          subject: "Appointment Reminder Detail Works VT",
          text: `Hello ${appointment.firstName} ${appointment.lastName} \n
    Just a friendly reminder that you have an appointment with Detail Works VT tomorrow ${appointment.appointmentDate} at ${appointment.timeOfApp}. \n
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
/*------------------------------------------------------------------------------------*/
app.post("/adminapi", async (req, res) => {
  const newAppointment = new ScheduleModel({
    // customerName: req.body.customerName,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    phoneNumber: req.body.phoneNumber,
    email: req.body.email,
    vehicleMake: req.body.vehicleMake,
    vehicleType: req.body.vehicleType,
    additionalNotes: req.body.additionalNotes,
    appointmentDate: req.body.appointmentDate,
    timeOfApp: req.body.timeOfApp,
    dateAppMade: req.body.dateAppMade,
  });
  await newAppointment.save(function (err) {
    if (err) throw err;
  });
  res.redirect("/admin");
});
/*------------------------------------------------------------------------------------*/
//List all entries
app.get("/api", async (req, res) => {
  // find all documents in the entry collection (as defined above)
  const cursor = await ScheduleModel.find({}).sort({ appointmentDate: 1 });
  // create empty array to hold our results
  let results = [];
  // iterate over out cursor object to push each document into our array
  await cursor.forEach((entry) => {
    results.push(entry);
  });
  // send the resulting array back as a json
  res.json(results);
});
/*------------------------------------------------------------------------------------*/
//Filter according to the tags request
app.get("/filter", async (req, res) => {
  let filter = req.query;
  console.log(filter);
  let key = Object.keys(filter)[0];
  console.log(key);
  let temp = filter[key];
  console.log(temp);
  const cursor = await ScheduleModel.find({ [key]: `${temp}` }).sort({
    appointmentDate: 1,
  });
  let results = [];

  // iterate over out cursor object to push each document into our array
  await cursor.forEach((entry) => {
    results.push(entry);
  });
  console.log(results);
  res.json(results);
});
/*------------------------------------------------------------------------------------*/
//Full text Search
app.get("/search", async (req, res) => {
  //The variable query is assigned to get the query from front-end
  let query = req.query;
  let key = Object.keys(query)[0];
  //this gives just the value of query
  let temp = query[key];
  console.log(temp);
  // Full text search using the wildcard specifier,allows text search on all fields
  await ScheduleModel.createIndexes({ "$**": "text" });
  //querying the database using the query filters
  const cursor = await ScheduleModel.find({ $text: { $search: temp } });

  console.log(cursor);
  // create empty array to hold our results
  let results = [];
  await cursor.forEach((entry) => {
    results.push(entry);
  });

  // send the resulting array back as a json
  res.json(results);
});
/*------------------------------------------------------------------------------------*/
//return a specific entry/post  data from database
app.get(`/api/:id`, async (req, res) => {
  let result = await ScheduleModel.findOne({ _id: ObjectId(req.params.id) });

  res.json(result);
});
/*------------------------------------------------------------------------------------*/
//edit an entry from database
app.post("/api/:id", async (req, res) => {
  let setObj = { $set: req.body };
  const editAppointment = await ScheduleModel.updateOne(
    { _id: ObjectId(req.params.id) },
    setObj
  );
  res.redirect("/admin");
});
/*------------------------------------------------------------------------------------*/
//delete an entry in the database
app.post("/delete/:id", async (req, res) => {
  await ScheduleModel.deleteOne({ _id: ObjectId(req.params.id) });
  res.redirect("/admin");
});
/*------------------------------------------------------------------------------------*/
//Route to download a file from database as a .csv file
app.get("/csv", async (req, res) => {
  //the details to be downloaded from the database

  // create empty array to hold our results
  let dates = [];
  // The variable dates, gets the user-input query from the frontend and query the database and send back the result
  dates = req.query;
  //user-inputs the date range of the information to downloaded from data base
  let startDt = dates["startDate"];
  let endDt = dates["endDate"];
  // query the database using query filters between the data range input
  await ScheduleModel.find(
    {
      appointmentDate: { $gte: startDt, $lt: endDt },
    },
    function (err, appointments) {
      if (err) {
        return res.status(500).json({ err });
      } else {
        return res.json(appointments);
      }
    }
  );
});
/*------------------------------------------------------------------------------------*/
//set up to catch all route
app.get("*", (req, res) => {
  res.sendFile(path.resolve("./client/public/index.html"));
});

// set up server to listen to requests at the port specified
app.listen(port, () => {
  console.log("Listening on port", port);
});
//--------------------------------------------------------------------------------
