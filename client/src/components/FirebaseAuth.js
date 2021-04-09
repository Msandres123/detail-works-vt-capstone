
import  firebase from "firebase/app";
import "firebase/auth";

   let config = {
      apiKey: "AIzaSyB_vX34zXbhgaKu-cqCpYCnUPpFXYMsOsI",
      authDomain: "detail-works-admin.firebaseapp.com",
      projectId: "detail-works-admin",
      storageBucket: "detail-works-admin.appspot.com",
      messagingSenderId: "711224378646",
      appId: "1:711224378646:web:83f41d7636af90dd937c37",
      measurementId: "G-5XSW3N3CNX",
    };
  
let app = firebase.initializeApp(config)
let auth = app.auth()

export { app, auth }  