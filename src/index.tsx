import * as React from 'react'
import * as ReactDOM from 'react-dom'
import App from './components/App'
// const App = require('./app').default;

import Create from './components/Create'
import Redeem from './components/Redeem'
import { Router, Route, Link, browserHistory, IndexRoute } from 'react-router'
// import './index.css'


ReactDOM.render(
  <Router history={browserHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={Create} />
      <Route path="redeem" component={Redeem} />
    </Route>
  </Router>,
    document.getElementById("root")
);
