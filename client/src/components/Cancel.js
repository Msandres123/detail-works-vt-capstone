import React from 'react'

export default function Cancel(props) {
    return (
        <div
      style={{
        textAlign: "center",
        height: "100px",
        width: "500px",
        border: "1px solid black",
        backgroundColor: "gray",
        position: "absolute",
        float: "left",
        marginLeft: 100,
        marginTop: 30,
        zIndex: 500,
      }}
    > <h5>Are you sure you want to delete this appointment?</h5>
        <div id="cancel-button-container">
             <form action={`/delete/${props.appointmentMade._id}`} Method="POST">
             <input  type="submit" value="Yes" />
             </form>
             <button
          id="delete-modal-button-style"
          onClick={props.cancelClickHandler}
        >
          No
        </button>
        </div> 
        </div>
    )
}
