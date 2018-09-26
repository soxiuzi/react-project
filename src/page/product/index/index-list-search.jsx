import React, { Component } from 'react'

class ListSearch extends Component{
  constructor(props) {
    super(props);
    this.state = {
      searchType : 'productId', // "productId" 和 "productName"
      searchKeyword: '',
    }
  }
  onValueChange(e) {
    let name = e.target.name ,
        value = e.target.value.trim();
    this.setState({
      [name] : value
    })
  }
  onSearch() {
    this.props.onSearch(this.state.searchType, this.state.searchKeyword);
  }
  // 输入关键字后按回车，自动搜索
  onSearchKeywordKeyUp(e) {
    if(e.keyCode === 13) {
      this.onSearch();
    }
  }
  render() {
    return (
      <div className="row search-wrap">
        <div className="col-md-12">
          <div className="form-inline">
            <div className="form-group">
              <select className="form-control"
                      name="searchType"
                      onChange={(e) => this.onValueChange(e)}>
                <option value="productId">按商品ID查询</option>
                <option value="productName">按商品名称查询</option>
              </select>
            </div>
            <div className="form-group">
              <input type="text" 
                      placeholder="关键字" 
                      name="searchKeyword"
                      className="form-control"
                      onChange = { e => this.onValueChange(e) }
                      onKeyUp={ e => this.onSearchKeywordKeyUp(e) }/>
            </div>
            <button className="btn btn-primary" 
                    onClick={ () => this.onSearch()}>搜索</button>
          </div>
        </div>
      </div>
    )
  }
}

export default ListSearch;