import React, { Component } from 'react'
import logo from './logo.svg'
// import './App.css'

class App extends Component {
  render() {
    return (
      <div
        className="container"
      >
        <nav
          className="navbar navbar-light bg-faded"
        >
          <a 
            className="navbar-brand"
          >
            BitenHunt
          </a>
        </nav>
        <div>
          <div
            class="form-group"
          >
            <label
              htmlFor="exampleInputEmail1"
            >
              Email address
            </label>
            <input 
              type="email"
              className="form-control" 
              id="exampleInputEmail1"
            />
            <small 
              id="emailHelp" 
              className="form-text text-muted"
            >
              We'll never share your email with anyone else.
            </small>
          </div>
        </div>
      </div>
    )
  }
}

export default App
