import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import PageTitle from 'component/page-title/index.jsx'
import Pagination from 'util/pagination/index.jsx'
import TableList from 'util/tab-list/index.jsx'
import MUtil from 'util/mm.jsx'
import Order from 'service/order-service.jsx'
import ListSearch from './index-list-search.jsx'

const _mm = new MUtil();
const _order = new Order();

class OrderList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      list: [],
      pageNum: 1,
      listType: 'list',
    }
  }
  // 组件初始化时加载商品列表
  componentDidMount() {
    this.loadOrderList();
  }
  // 加载商品列表
  loadOrderList() {
    let listParam = {};
    listParam.listType = this.state.listType;
    listParam.pageNum = this.state.pageNum;
    // 判断为搜索方式时添加搜索类型和关键字的字段
    if(this.state.listType === 'search') {
      listParam.orderNo = this.state.orderNo;
    }
    // 请求接口
    _order.getOrderList(listParam)
     .then(res => this.setState(res))
     .catch(errMsg => {
        this.setState({
          list: []
        })
        _mm.errorTips(errMsg);
     });
  }
  // 分页页数变化
  onPageNumChange(pageNum) {
    this.setState({
      pageNum
    }, () => {
      this.loadOrderList();
    });
  }
  // 搜索
  onSearch(orderNumber) {
    let listType = orderNumber === '' ? 'list' : 'search';
    this.setState({
      listType,
      pageNum     : 1,
      orderNo     : orderNumber
    }, () => {
      this.loadOrderList();
    })
  }
  render() {
    let tableHeads = ['订单号', '收件人', '订单状态', '订单总价', '创建时间', '操作',];
    return (
      <div id="page-wrapper">
        <PageTitle title="订单列表" />
        <ListSearch onSearch={ (orderNumber) => this.onSearch(orderNumber)}/>
        <TableList tableHeads={tableHeads}>
          {
            this.state.list.map((order, index) => {
              return (
                <tr key={index}>
                  <td>
                    <Link to={ `/order/detail/${order.orderNo}` }>{order.orderNo}</Link>
                  </td>
                  <td>{order.receiverName}</td>
                  <td>{order.statusDesc}</td>
                  <td>￥{order.payment}</td>
                  <td>￥{order.createTime}</td>
                  <td>
                    <Link to={ `/order/detail/${order.orderNo}` }>详情</Link>
                  </td>
                </tr>
              )
            })
          }
        </TableList>
        <Pagination current={this.state.pageNum} 
                    total={this.state.total} 
                    onChange={(pageNum) => this.onPageNumChange(pageNum)} />
      </div>
    );
  }
}

export default OrderList;