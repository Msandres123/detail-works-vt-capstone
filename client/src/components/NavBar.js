import React from 'react'
import { Link } from 'react-router-dom'

export default function NavBar() {
    return (
        <div id="NavBar-container">
            <h4>
            <Link to={'/'}>Home</Link>
            </h4>
            <h4>
            <Link to={'/admin'}>Admin</Link>
            </h4>
            <h4><Link to={'/signin'}>Log In</Link></h4>
        </div>
    )
}
