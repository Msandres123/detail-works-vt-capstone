import "./App.css";
import React from "react";
import { useState} from "react";
import { Switch, Route, useHistory } from "react-router-dom";
import Home from "./components/Home";
import NavBar from "./components/NavBar";
import AdminPage from "./components/AdminPage";
import AppointmentPage from "./components/AppointmentPage";
import AdminSignIn from "./components/AdminSignIn";
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";

if (firebase.apps.length === 0) {
  firebase.initializeApp({
    apiKey: "AIzaSyB_vX34zXbhgaKu-cqCpYCnUPpFXYMsOsI",
    authDomain: "detail-works-admin.firebaseapp.com",
    projectId: "detail-works-admin",
    storageBucket: "detail-works-admin.appspot.com",
    messagingSenderId: "711224378646",
    appId: "1:711224378646:web:83f41d7636af90dd937c37",
    measurementId: "G-5XSW3N3CNX",
  });
}

function App(props) {
  const [user, setUser] = useState(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  let history = useHistory();

  function emailChangeHandler(evt) {
    setEmail(evt.target.value);
  }

  function passwordChange(evt) {
    setPassword(evt.target.value);
  }

  async function login(evt) {
    evt.preventDefault();

    const userObj = await firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .catch((err) => {
        console.log(err.message);
      });

    setUser(userObj);

    history.push("/admin");
  }
  console.log("user is", user);

  return (
    <div>
      <h1 id="app-header">Detail Works VT</h1>
      <NavBar />
      <Switch>
        <Route exact path={"/"} component={Home} />
        <Route exact path={"/admin"} render={(props) => { return <AdminPage user={user} />  }} /> 
        <Route path={"/admin/:id"} render={(props) => { return < AppointmentPage user={user} /> }} />
        <Route
          path={"/signin"}
          render={(props) => {
            return (
              <AdminSignIn
                user={user}
                password={password}
                email={email}
                emailChangeHandler={emailChangeHandler}
                login={login}
                passwordChange={passwordChange}
              />
            );
          }}
        />
      </Switch>
    </div>
  );
}

export default App;
