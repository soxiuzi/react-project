import React, { Component } from 'react'

class PageTitle extends Component{
  constructor(props) {
    super(props);
  }
  componentWillMount() {
    document.title = this.props.title + '- Soxiuzi';
  }
  render() {
    return (
      <div className="row">
        <div className="col-md-9">
          <h1 className="page-header">{ this.props.title }</h1>
        </div>
        <div className="col-md-3">
          {this.props.children}
        </div>
      </div>
    )
  }
}

export default PageTitle;