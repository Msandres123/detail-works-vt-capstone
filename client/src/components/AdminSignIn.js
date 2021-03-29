import React from "react";


export default function AdminSignIn(props) {
  return (
    <div>
      <form onSubmit={props.login}>
        <label>Admin Email: <input type="email" onChange={props.emailChangeHandler} value={props.email} /></label>
        <label>Admin Password: <input type="password" onChange={props.passwordChange} value={props.password} /></label>
        <input type="submit" />
      </form>
    </div>

  );
}
