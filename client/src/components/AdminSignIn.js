import React from "react";
import NavBar from './NavBar'


export default function AdminSignIn(props) {
  return (
    <div className="admin-signin">
       <NavBar logOut={props.logOut}/>
      <form id="signin-form" onSubmit={props.login}>
      <h1 id="app-header">Detail Works VT</h1>
        <h3><label>Admin Email: <br/> <input type="email" onChange={props.emailChangeHandler} value={props.email} /></label></h3>
        <h3><label>Admin Password: <br/><input type="password" onChange={props.passwordChange} value={props.password} /></label></h3>
        <input class="submit" type="submit" />
      </form>
    </div>

  );
}
