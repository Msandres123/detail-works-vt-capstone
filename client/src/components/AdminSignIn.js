import React from "react";
import NavBar from './NavBar'
import {useEffect} from 'react'
import {app, auth} from './FirebaseAuth'
// import firebase from "firebase/app";
// import "firebase/auth";
// import "firebase/database";


export default function AdminSignIn(props) {
  useEffect(() => {
    auth.onAuthStateChanged((userObj) => {
      if (userObj) {
        props.setUser(userObj);
      }
    });
  });

  return (
    <div className="admin-signin">
       <NavBar logOut={props.logOut}/>
      <form id="signin-form" onSubmit={props.login}>
      <h1 id="app-header">Detail Works VT</h1>
        <h1><label>Admin Email: <input type="email" onChange={props.emailChangeHandler} value={props.email} /></label></h1>
        <h1><label>Admin Password: <input type="password" onChange={props.passwordChange} value={props.password} /></label></h1>
        <input type="submit" />
      </form>
    </div>

  );
}
