const mongodb = require("mongodb").MongoClient;
const createCsvWriter = require("csv-writer").createObjectCsvWriter;

// let url = "mongodb://username:password@localhost:27017/";
let url = "mongodb://localhost:27017/";

export default function exportCSV() {
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
        const csvWriter = createCsvWriter({
          path: "appointments.csv",
          header: [
            { id: "_id", title: "_id" },
            { id: "make", title: "make" },
            { id: "name", title: "name" },
            { id: "number", title: "number" },
            { id: "email", title: "email" },
            { id: "type", title: "type" },
            { id: "notes", title: "notes" },
            { id: "date", title: "date" },
            { id: "timeOfApp", title: "timeOfApp" },
            { id: "dateAppMade", title: "dateAppMade" }
          ]
        });

        csvWriter
          .writeRecords(data)
          .then(() =>
            console.log("Write to appointments.csv successfully!")
          );

        client.close();
      });
  }
)
};