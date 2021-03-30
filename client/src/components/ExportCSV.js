const mongodb = require("mongodb").MongoClient;
const fastcsv = require("fast-csv");
const fs = require("fs");
// const ws = fs.createWriteStream("appointments.csv");

// let url = "mongodb://username:password@localhost:27017/";
// let url = "mongodb://localhost:27017/";

// export default function exportCSV() {
// mongodb.connect(
//   url,
//   { useNewUrlParser: true, useUnifiedTopology: true },
//   (err, client) => {
//     if (err) throw err;

//     client
//       .db("schedule")
//       .collection("appointments")
//       .find({})
//       .toArray((err, data) => {
//         if (err) throw err;

//         console.log(data);
//         fastcsv
//           .write(data, { headers: true })
//           .on("finish", function() {
//             console.log("Write to appointments.csv successfully!");
//           })
//           .pipe(ws);

//         client.close();
//       });
//   }
// )
// };