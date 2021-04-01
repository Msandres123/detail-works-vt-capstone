import React from 'react'
import { Link } from 'react-router-dom'

export default function NavBar() {
    return (
        <div id="NavBar-container">
            <h8>
            <Link to={'/'}>Home</Link>
            </h8>
            <h9>
            <Link to={'/admin'}>Admin</Link>
            </h9>
            <h10><Link to={'/signin'}>Log In</Link></h10>
        </div>
    )
}
