import React from "react";


export default function AdminSignIn(props) {
  return (
    <div>
      <form onSubmit={props.login}>
        <input type="email" onChange={props.emailChangeHandler} value={props.email} />
        <input type="password" onChange={props.passwordChange} value={props.password} />
        <input type="submit" />
      </form>
    </div>

  );
}
