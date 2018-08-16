import React, { Component } from 'react'
import ReactDom from 'react-dom'
import { BrowserRouter as Router, Switch, Route, Link, Redirect } from 'react-router-dom'

import Layout from 'component/layout/index.jsx'

// 页面
import Home from 'page/home/index.jsx'
import Login from 'page/login/index.jsx'

class App extends Component{
  render() {
    return (
      <Router>
        <Switch>
          <Route path="/login" component={ Login } />
          <Route path="/" render={props => (
            <Layout>
              <Switch>
                <Route exact path="/" component={Home} />
                <Route path="/product" component={Home} />
                <Route path="/product-category" component={Home} />
                <Route path="/order" component={Home} />
                <Route path="/user" component={Home} />
              </Switch>
            </Layout>
          )} />
        </Switch>
      </Router>
    )
  }
}

ReactDom.render(
  <App />,
  document.getElementById('app')
);