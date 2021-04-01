
import React from 'react'
const mongodb = require("mongodb").MongoClient;
const Json2csvParser = require("json2csv").Parser;
const fs = require("fs");



let url = "mongodb://localhost:27017/";

export default function ExportCSV() {

function sendCSV() {
  mongodb.connect(
  url,
  { useNewUrlParser: true, useUnifiedTopology: true },
  (err, client) => {
    if (err) throw err;

    client
      .db("schedule")
      .collection("appointments")
      .find({})
      .toArray((err, data) => {
        if (err) throw err;

        console.log(data);
        const json2csvParser = new Json2csvParser({ header: true });
        const csvData = json2csvParser.parse(data);

        fs.writeFile("appointments.csv", csvData, function(error) {
          if (error) throw error;
          console.log("Write to appointments.csv successfully!");
        });

        client.close();
      });
  }
)
}
return (
  <div>
    <button onClick={sendCSV}>DO NOT PRESS</button>
  </div>
)
};