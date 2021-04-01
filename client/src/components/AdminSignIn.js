import React from "react";


export default function AdminSignIn(props) {
  return (
    <div className="admin-signin">
      <form onSubmit={props.login}>
        <h1><label>Admin Email: <input type="email" onChange={props.emailChangeHandler} value={props.email} /></label></h1>
        <h2><label>Admin Password: <input type="password" onChange={props.passwordChange} value={props.password} /></label></h2>
        <input type="submit" />
      </form>
    </div>

  );
}
