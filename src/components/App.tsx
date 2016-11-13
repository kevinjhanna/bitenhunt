import * as React from 'react'
// import logo from './logo.svg'

// import Create from './Create';

// import './App.css'


class App extends React.Component<{}, {}> {
  render() {
    return <div className="container">
      <nav className="navbar navbar-light bg-faded">
        <a 
          className="navbar-brand"
        >
          BitenHunt
        </a>
      </nav>
    {this.props.children}
  </div>
  }
}

export default App
