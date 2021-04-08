import React from 'react'
import Link from 'react'

export default function pageNotFound() {
  return (
    <div>
      <h1>Page Not Found</h1>
      <Link to="/"><h2>Return to Home Page</h2></Link>
    </div>
  )
}
