import React, { Component } from 'react'
import './category-selector.scss'
import MUtil from 'util/mm.jsx'
import Product from 'service/product-service.jsx'

const _mm = new MUtil();
const _product = new Product();


class CategorySelector extends Component{
  constructor(props) {
    super(props);
    this.state = {
      firstCategoryList : [],
      firstCategoryId : 0,
      secondCategoryList : [],
      secondCategoryId : 0
    }
  }
  componentDidMount() {
    this.loadFirstCategory();
  }
  // 加载一级分类
  loadFirstCategory() {
    _product.getCategoryList().then(res => {
      this.setState({
        firstCategoryList: res
      });
    }).catch(errMsg => {
      _mm.errTips(errMsg);
    })
  }
  // 加载二级分类
  loadSecondCategory() {
    _product.getCategoryList(this.state.firstCategoryId).then(res => {
      this.setState({
        secondCategoryList: res
      });
    }).catch(errMsg => {
      _mm.errTips(errMsg);
    })
  }
  // 监听一级品类的变化
  onFirstCategoryChang(e) {
    let newValue = e.target.value || 0;
    this.setState({
      firstCategoryId: newValue,
      secondCategoryId: 0,
      secondCategoryList: []
    }, () => {
      // 更新二级分类
      this.loadSecondCategory();
      this.onPropsCategoryChange();
    });
  }
  // 监听二级品类的变化
  onSecondCategoryChang(e) {
    let newValue = e.target.value || 0;
    this.setState({
      secondCategoryId: newValue,
    }, () => {
      this.onPropsCategoryChange();
    })
  }
  // 传给父组件选中的结果
  onPropsCategoryChange() {
    // 判断父组件是否传递了函数
    let categoryChangable = typeof this.props.onCategoryChange === 'function';
    // 如果有二级品类
    if(this.state.secondCategoryId) {
      categoryChangable && this.props.onCategoryChange(this.state.secondCategoryId, this.state.firstCategoryId);
    }
    // 如果只有一级品类
    else {
      categoryChangable && this.props.onCategoryChange(this.state.firstCategoryId, 0);
    }
  }
  render() {
    return (
      <div className="col-md-10">
        <select className="form-control cate-select"
                onChange={(e) => this.onFirstCategoryChang(e)}>
          <option value="">请选择一级分类</option>
          {
            this.state.firstCategoryList.length > 0
            ? this.state.firstCategoryList.map((item, index) => {
              return <option value={item.id} key={index}>{item.name}</option>
            })
            : ''
          }
        </select>
        <select className="form-control cate-select"
                onChange={(e) => this.onSecondCategoryChang(e)}>
          <option value="">请选择二级分类</option>
          {
            this.state.secondCategoryList.length > 0
            ? this.state.secondCategoryList.map((item, index) => {
              return <option value={item.id} key={index}>{item.name}</option>
            })
            : ''
          }
        </select>
      </div>
    )
  }
}

export default CategorySelector;