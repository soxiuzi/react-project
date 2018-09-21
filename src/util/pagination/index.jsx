import React, { Component } from 'react'

import RcPagination from 'rc-pagination'
import 'rc-pagination/dist/rc-pagination.min.css'

// 分页组件
class Pagination extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="row">
        <div className="col-md-12">
          <RcPagination {...this.props}
              hideOnSinglePage
              showQuickJumper />
        </div>
      </div>
    )
  }
}

export default Pagination;