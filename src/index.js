import React from 'react'
import ReactDOM from 'react-dom'
import App from './components/App'
import Create from './components/Create'
import { Router, Route, Link, browserHistory, IndexRoute } from 'react-router'
import './index.css'

ReactDOM.render((
  <Router history={browserHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={Create} />
    </Route>
  </Router>
), document.getElementById('root'))
