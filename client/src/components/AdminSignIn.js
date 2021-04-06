import React from "react";


export default function AdminSignIn(props) {
  return (
    <div className="admin-signin">
                  <h1 id="app-header">Detail Works VT</h1>
      <form onSubmit={props.login}>
        <h1><label>Admin Email: <input type="email" onChange={props.emailChangeHandler} value={props.email} /></label></h1>
        <h1><label>Admin Password: <input type="password" onChange={props.passwordChange} value={props.password} /></label></h1>
        <input type="submit" />
      </form>
    </div>

  );
}
