import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class NavTop extends Component {
  constructor(props) {
    super(props);
    this.loginOut = this.loginOut.bind(this);
  }
  //退出登录
  loginOut() {
    console.log('退出登录');
  }

  render() {
    return (
      <div className="navbar navbar-default top-navbar">
            <div className="navbar-header">
                <Link className="navbar-brand" to="/"><b>Make By</b>Soxiuzi</Link>
            </div>
            <ul className="nav navbar-top-links navbar-right">
                <li className="dropdown">
                    <a className="dropdown-toggle" href="javascript:;">
                        <i className="fa fa-user fa-fw"></i>
                        <span>欢迎，adminxxx</span>
                        <i className="fa fa-caret-down"></i>
                    </a>
                    <ul className="dropdown-menu dropdown-user">
                        <li onClick={ this.loginOut }>
                          <a href="javascript:;">
                            <i className="fa fa-sign-out fa-fw"></i>
                            退出登录
                          </a>
                        </li>
                    </ul>
                </li>
            </ul>
        </div>
    )
  }
}

export default NavTop;