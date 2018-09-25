import MUtil from 'util/mm.jsx'

const _mm = new MUtil();

class Product {
  // 加载商品列表
  getProductList(pageNum) {
    return _mm.request({
      type: 'post',
      url: '/manage/product/list1.do',
      data: {
        pageNum
      }
    })
  }

  // 商品上下架
  setProductStatus(productInfo) {
    return _mm.request({
      type: 'post',
      url: '/manage/product/set_sale_status.do',
      data: productInfo
    })
  }
}

export default Product;