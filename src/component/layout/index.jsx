import React, { Component } from 'React'
import './theme.css'
import NavTop from '../nav-top/index.jsx'
import NavSide from '../nav-side/index.jsx'

class Layout extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div id="wrapper">
        <NavTop />
        <NavSide />
        { this.props.children }
      </div>
    )
  }
}

export default Layout