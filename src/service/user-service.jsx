import MUtil from 'util/mm.jsx'

const _mm = new MUtil();

class User {
  // 用户登录
  login(loginInfo) {
    return _mm.request({
      type: 'post',
      url: '/manage/user/login.do',
      data: loginInfo
    })
  }
  // 登出
  loginOut() {
    return _mm.request({
      type: 'post',
      url: '/user/logout.do'
    })
  }
  // 检查登录的接口数据是否合法
  checkLoginInfo(loginInfo) {
    let username = loginInfo.username.trim(),
        password = loginInfo.password.trim();
    if(typeof username != 'string' || username.length === 0) {
      return {
        status: false,
        msg: '用户名不能为空！'
      }
    }
    if(typeof password != 'string' || password.length === 0) {
      return {
        status: false,
        msg: '密码不能为空！'
      }
    }
    return {
      status: true,
      msg: '验证通过'
    }
  }
  // 加载用户列表
  getUserList(pageNum) {
    return _mm.request({
      type: 'post',
      url: '/manage/user/list.do',
      data: {
        pageNum
      }
    })
  }
}

export default User;