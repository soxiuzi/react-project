import MUtil from 'util/mm.jsx'

const _mm = new MUtil();

class Product {
  // 加载商品列表
  getProductList(listParam) {
    let url = '',
        data = {};
    if(listParam.listType === 'list') {
      url = '/manage/product/list.do';
      data.pageNum = listParam.pageNum;
    }else if(listParam.listType === 'search'){
      url = '/manage/product/search.do';
      data[listParam.searchType] = listParam.keyword;
    }
    return _mm.request({
      type: 'post',
      url: url,
      data: data
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

  // 品类相关
  getCategoryList(parentCategoryId) {
    return _mm.request({
      type: 'post',
      url: '/manage/category/get_category.do',
      data: {
        categoryId: parentCategoryId
      }
    })
  }

  // 商品表单验证
  checkProduct(product) {
    let result = {
      status  : true,
      msg     : '验证通过'
    };
    // 判断商品名称不能为空
    if(typeof product.name !== 'string' || product.name.length === 0) {
      return {
        status: false,
        msg: '商品名称不能为空！'
      }
    }
    // 判断商品描述不能为空
    if(typeof product.subtitle !== 'string' || product.subtitle.length === 0) {
      return {
        status: false,
        msg: '商品描述不能为空！'
      }
    }
    // 判断品类ID
    if(typeof product.categoryId !== 'number' || !(product.categoryId > 0)) {
      return {
        status: false,
        msg: '请选择商品品类！'
      }
    }
    // 判断商品价格为数字，且大于0
    if(typeof product.price !== 'number' || !(product.price >= 0)) {
      return {
        status: false,
        msg: '请输入正确的商品价格！'
      }
    }
    // 判断商品库存为数字，且大于0
    if(typeof product.stock !== 'number' || !(product.stock > 0)) {
      return {
        status: false,
        msg: '请输入正确的商品库存！'
      }
    }
    // 判断是否选择商品图片
    if(typeof product.subImages !== 'string' || product.subImages.length === 0) {
      return {
        status: false,
        msg: '请上传商品图片'
      }
    }
    // 判断富文本编辑器内容是否为空
    if(typeof product.detail !== 'string' || product.detail.length === 0) {
      return {
        status: false,
        msg: '请填写商品详情'
      }
    }
    else {
      return result
    }
  }

  // 保存商品
  saveProduct(product) {
    return _mm.request({
      type: 'post',
      url: '/manage/product/save.do',
      data: product
    })
  }
  // 通过商品id获取商品详情
  getProduct(productId) {
    return _mm.request({
      type: 'post',
      url: '/manage/product/detail.do',
      data: {
        productId: productId || 0
      }
    })
  }
  // 新增品类
  saveCategory(category) {
    return _mm.request({
      type: 'post',
      url: '/manage/category/add_category.do',
      data: category
    })
  }
  // 修改品类名称
  updateCategoryName(category) {
    return _mm.request({
      type: 'post',
      url: '/manage/category/set_category_name.do',
      data: category
    })
  }
}

export default Product;