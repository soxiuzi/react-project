import React, { Component } from 'react'
import ReactDom from 'react-dom'
import { BrowserRouter as Router, Switch, Route, Link, Redirect } from 'react-router-dom'

// 页面
import Home from 'page/home/index.jsx'

class App extends Component{
  render() {
    return (
      <Router>
        <Switch>
          <Route exact path="/" component={Home} />
          <Redirect from="*" to="/" />
        </Switch>
      </Router>
    )
  }
}

ReactDom.render(
  <App />,
  document.getElementById('app')
);