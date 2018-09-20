import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import MUtil from 'util/mm.jsx'
import User from 'service/user-service.jsx'

const _mm = new MUtil();
const user = new User();

class NavTop extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: _mm.getStorage('userInfo').username || ''
    };
    this.loginOut = this.loginOut.bind(this);
  }
  //退出登录
  loginOut() {
    _mm.removeStorage('userInfo');
    user.loginOut().then(res => {
      window.location.href = '/login';
    }).catch(errMsg => {
      _mm.errorTips(errMsg);
    })
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
                        {
                          this.state.username
                          ? <span>欢迎，{this.state.username}</span>
                          : <span>欢迎您</span>
                        }
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