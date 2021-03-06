import "./App.css";
import React from "react";
import { useState, useEffect } from "react";
import { Switch, Route, useHistory } from "react-router-dom";

import Home from "./components/Home";
import AdminPage from "./components/AdminPage";
import AppointmentPage from "./components/AppointmentPage";
import AdminSignIn from "./components/AdminSignIn";
import PageNotFound from "./components/pageNotFound";
import { auth } from "./components/FirebaseAuth";
//import AutoEmail from "./components/AutoEmail";

// import firebase from "firebase/app";
// import "firebase/auth";
// import "firebase/database";

// if (firebase.apps.length === 0) {
//   firebase.initializeApp({
//     apiKey: "AIzaSyB_vX34zXbhgaKu-cqCpYCnUPpFXYMsOsI",
//     authDomain: "detail-works-admin.firebaseapp.com",
//     projectId: "detail-works-admin",
//     storageBucket: "detail-works-admin.appspot.com",
//     messagingSenderId: "711224378646",
//     appId: "1:711224378646:web:83f41d7636af90dd937c37",
//     measurementId: "G-5XSW3N3CNX",
//   });
// }

// const auth = firebase.auth();
// let userLog = firebase.auth().currentUser;

function App(props) {
  const [user, setUser] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  let history = useHistory();

  function emailChangeHandler(evt) {
    setEmail(evt.target.value);
  }

  function passwordChange(evt) {
    setPassword(evt.target.value);
  }
  useEffect(() => {
    auth.onAuthStateChanged((userObj) => {
      if (userObj) {
        setUser(userObj);
      } else {
        setUser("");
      }
    });
  });

  async function login(evt) {
    evt.preventDefault();

    const userObj = await auth
      .signInWithEmailAndPassword(email, password)
      .catch((err) => {
        console.log(err.message);
      });

    // firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION)
    // .then(() => {
    //   return firebase.auth().signInWithEmailAndPassword(email, password)
    // })

    setUser(userObj);

    history.push("/admin");
  }

  function logOut() {
    auth
      .signOut()
      .then(() => {})
      .catch((error) => {});
    setUser(null);
  }
  
  return (
    <div>
      <div className="container">
        <div className="content">
          <Switch>
            <Route exact path={"/"} component={Home} />
            <Route
              exact
              path={"/admin"}
              render={(props) => {
                return (
                  <AdminPage user={user} setUser={setUser} logOut={logOut} />
                );
              }}
            />
            <Route
              path={"/admin/:id"}
              render={(props) => {
                return (
                  <AppointmentPage
                    user={user}
                    match={props.match}
                    logOut={logOut}
                  />
                );
              }}
            />
            {/* <Route path={"/admin/:id"} component={AppointmentPage} />  */}
            <Route
              path={"/signin"}
              render={(props) => {
                return (
                  <AdminSignIn
                    user={user}
                    setUser={setUser}
                    password={password}
                    email={email}
                    emailChangeHandler={emailChangeHandler}
                    login={login}
                    passwordChange={passwordChange}
                    logOut={logOut}
                  />
                );
              }}
            />
            <Route component={PageNotFound} />
          </Switch>
        </div>
      </div>
    </div>
  );
}

export default App;
