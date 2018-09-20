class MUtil {
  request(param) {
    return new Promise((resolve, reject) => {
      $.ajax({
        type : param.type || 'get',
        url : param.url || '',
        dataType : param.dataType || 'json',
        data : param.data || null,
        success : res => {
          // 登录成功
          if(res.status === 0) {
            typeof resolve === 'function' && resolve(res.data, res.msg);
          }
          // 没有登录状态，强制登录
          else if(res.status === 10) {
            this.doLogin();
          }
          else {
            typeof reject === 'function' && reject(res.msg || res.data);
          }
        },
        error : err => {
          typeof reject === 'function' && reject(err.statusText);
        }
      });
    });
  }
  // 跳转登录
  doLogin() {
    window.location.href = '/login?redirect=' + encodeURIComponent(window.location.pathname);
  }
  // 获取URL参数
  getUrlParam(name) {
    let queryString = window.location.search.split('?')[1] || '';
    let reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"),
        result = queryString.match(reg);
    return result ? decodeURIComponent(result[2]) : null;

  }
  // 错误提示
  errorTips(errMsg) {
    alert(errMsg || '好像哪里不对~');
  }
  // 存储
  setStorage(name, data) {
    let dataType = typeof data;
    // json对象
    if(dataType === 'object') {
      window.localStorage.setItem(name, JSON.stringify(data));
    }
    // 基础对象
    else if(['number', 'string', 'boolean'].indexOf(dataType) >= 0) {
      window.localStorage.setItem(name, data);
    }
    // 其他不支持类型
    else {
      alert('该类型不支持本地存储！');
    }
  }
  // 取出存储内容
  getStorage(name) {
    let data = window.localStorage.getItem(name);
    if(data) {
      return JSON.parse(data);
    }else {
      return '';
    }
  }
  // 删除存储内容
  removeStorage(name) {
    window.localStorage.removeItem(name);
  }
}

export default MUtil;