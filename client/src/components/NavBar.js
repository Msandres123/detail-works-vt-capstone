import React from 'react'
import { Link } from 'react-router-dom'

export default function NavBar() {
    return (
        <div id="NavBar-container">
            <Link to={'/'}>Home</Link>
            <Link to={'/admin'}>Admin Page</Link>
        </div>
    )
}
