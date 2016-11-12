import React, { Component } from 'react'

class Create extends Component {
  render() {
    return <div
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
  }
}

export default Create