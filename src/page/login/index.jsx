import React, { Component } from 'react'
import './index.scss'
import MUtil from 'util/mm.jsx'
import User from 'service/user-service.jsx'

const _mm = new MUtil();
const user = new User();

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      redirect: _mm.getUrlParam('redirect') || '/',
    };
    this.onInputChange = this.onInputChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
  componentWillMount () {
    document.title = '登录';
  }
  onInputChange(e) {
    let inputName = e.target.name,
        inputValue = e.target.value;
    this.setState({
      [inputName]: inputValue
    })
  }
  onInputKeyUp(e) {
    if(e.keyCode == 13) {
      this.onSubmit();
    }
  }
  onSubmit() {
    let loginInfo = {
      username: this.state.username,
      password: this.state.password
    };
    let checkResult = user.checkLoginInfo(loginInfo);
    // 验证通过
    if (checkResult.status) {
      user.login(loginInfo)
        .then(res => {
          _mm.setStorage('userInfo', res);
          this.props.history.push(this.state.redirect);
        })
        .catch(errmsg => {
          _mm.errorTips(errmsg);
        });
    }
    // 验证不通过
    else {
      _mm.errorTips(checkResult.msg);
    }
  }
  render() {
    return (
      <div className="col-md-4 col-md-offset-4">
        <div className="panel panel-default login-panel">
          <div className="panel-heading">欢迎登录 - Soxiuzi管理系统</div>
          <div className="panel-body">
            <div>
              <div className="form-group">
                <input type="email"
                       name="username"
                       className="form-control"
                       placeholder="请输入用户名"
                       onKeyUp={e => this.onInputKeyUp(e)}
                       onChange={this.onInputChange}/>
              </div>
              <div className="form-group">
                <input type="password"
                       name="password"
                       className="form-control"
                       placeholder="请输入密码"
                       onKeyUp={e => this.onInputKeyUp(e)}
                       onChange={this.onInputChange}/>
              </div>
              <button
                className="btn btn-primary btn-lg btn-block"
                onClick={this.onSubmit}>登录</button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Login;