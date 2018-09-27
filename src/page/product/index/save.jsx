import React, { Component } from 'react'
import PageTitle            from 'component/page-title/index.jsx'
import CategorySelector     from './category-selector.jsx'
import MUtil                from 'util/mm.jsx'
import Product              from 'service/product-service.jsx'
import FileUploader         from 'util/file-uploader/index.jsx'
import RichEditor           from 'util/rich-editor/index.jsx'
import './save.scss'

const _mm      = new MUtil();
const _product = new Product();

class ProductSave extends Component{
  constructor(props) {
    super(props);
    this.state = {
      id                : this.props.match.params.pid,
      categoryId        : 0,
      parentCategoryId  : 0,
      subImages         : [],
      name              : '',
      subtitle          : '',
      price             : '',
      stock             : '',
      detail            : '',
      status            : 1 // 商品的状态，1：在售，0：下架
    }
  }
  componentDidMount() {
    this.loadProduct();
  }
  // 加载商品详情
  loadProduct() {
    // 有id时表示编辑状态
    if(this.state.id) {
      _product.getProduct(this.state.id)
              .then(res => {
                let images = res.subImages.split(',');
                res.subImages  = images.map(img => {
                  return {
                    uri: img,
                    url: res.imageHost + img
                  }
                });
                res.defaultDetail = res.detail;
                this.setState(res);
              })
              .catch(errMsg => {
                _mm.errorTips(errMsg);
              })
    }else {
      return false;
    }
  }
  // 简单字段的改变，比如商品名称，描述等
  onValueChange(e) {
    let name  = e.target.name,
        value = e.target.value.trim();
    this.setState({
      [name]: value
    })
  }
  // 品类选择器变化
  onCategoryChange(categoryId, parentCategoryId) {
    this.setState({
      categoryId,
      parentCategoryId
    })
  }
  // 上传图片成功
  onUpLoadSuccess(res) {
    let subImages = this.state.subImages;
    subImages.push(res);
    this.setState({
      subImages: subImages
    });
  }
  // 上传图片失败
  onUpLoadError(err) {
    _mm.errorTips(err.message || '上传图片失败！');
  }
  // 删除选择的图片
  onImageDelete(e) {
    let index     = e.target.getAttribute('index'),
        subImages = this.state.subImages;
    subImages.splice(index, 1);
    this.setState({
      subImages: subImages
    })
  }
  // 富文本编辑器的信息
  onDetailValueChange(value) {
    this.setState({
      detail: value
    });
  }
  // 将照片格式化成为上传的格式
  getSubImagesString() {
    return this.state.subImages.map(image => image.uri).join(',');
  }
  // 提交表单
  onSubmit(e) {
    let product = {
      name                : this.state.name,
      subtitle            : this.state.subtitle,
      categoryId          : parseInt(this.state.categoryId),
      // parentCategoryId    : this.state.parentCategoryId,
      price               : parseFloat(this.state.price),
      stock               : parseInt(this.state.stock),
      subImages           : this.getSubImagesString(),
      detail              : this.state.detail,
      status              : this.state.status
    }
    let productCheckResult = _product.checkProduct(product);
    if(this.state.id) {
      product.id = this.state.id;
    }
    // 表单验证成功
    if(productCheckResult.status) {
      _product.saveProduct(product)
              .then(res => {
                _mm.successTips(res);
                this.props.history.push('/product/index');
              })
              .catch(errMsg => {
                _mm.errorTips(errMsg);
              })
    }else {
      _mm.errorTips(productCheckResult.msg);
    }
  }
  render() {
    return (
      <div id="page-wrapper">
        <PageTitle title="添加商品" />
        <div className="form-horizontal">
          <div className="form-group">
            <label className="col-md-2 control-label">商品名称</label>
            <div className="col-md-5">
              <input type="text" className="form-control" 
                     placeholder="请输入商品名称" 
                     name="name"
                     value={this.state.name}
                     onChange={ e => this.onValueChange(e)}/>
            </div>
          </div>
          <div className="form-group">
            <label className="col-md-2 control-label">商品描述</label>
            <div className="col-md-5">
              <input type="text" className="form-control" 
                     placeholder="请输入商品描述" 
                     name="subtitle"
                     value={this.state.subtitle}
                     onChange={ e => this.onValueChange(e)}/>
            </div>
          </div>
          <div className="form-group">
            <label className="col-md-2 control-label">所属分类</label>
            <CategorySelector onCategoryChange={(categoryId, parentCategoryId) => this.onCategoryChange(categoryId, parentCategoryId)} 
                              categoryId={this.state.categoryId}
                              parentCategoryId={this.state.parentCategoryId}/>
          </div>
          <div className="form-group">
            <label className="col-md-2 control-label">商品价格</label>
            <div className="col-md-3">
              <div className="input-group">
                <input min="1" type="number" className="form-control" 
                       placeholder="请输入商品价格" 
                       name="price"
                       value={this.state.price}
                       onChange={ e => this.onValueChange(e)}/>
                <span className="input-group-addon">元</span>
              </div>
            </div>
          </div>
          <div className="form-group">
            <label className="col-md-2 control-label">商品库存</label>
            <div className="col-md-3">
              <div className="input-group">
                <input min="1" type="number" className="form-control" 
                       placeholder="库存" 
                       name="stock"
                       value={this.state.stock}
                       onChange={ e => this.onValueChange(e)}/>
                <span className="input-group-addon">件</span>
              </div>
            </div>
          </div>
          <div className="form-group">
            <label className="col-md-2 control-label">商品图片</label>
            <div className="col-md-10">
              {
                this.state.subImages.length
                ? this.state.subImages.map((image, index) => (
                    <div className="img-con" key={index}>
                      <img src={image.url} />
                      <i className="fa fa-close" index={index} onClick={e => this.onImageDelete(e)}></i>
                    </div>
                  ))
                : <div>请选择图片</div>
              }
            </div>
            <div className="col-md-offset-2 col-md-10 file-uploader-con">
              <FileUploader onSuccess={res => this.onUpLoadSuccess(res)} 
                            onError={err => this.onUpLoadError(err)}/>
            </div> 
          </div>
          <div className="form-group">
            <label className="col-md-2 control-label">商品详情</label>
            <div className="col-md-10">
              <RichEditor onValueChange={ value => this.onDetailValueChange(value)}
                          detail={this.state.detail} 
                          defaultDetail={this.state.defaultDetail}/>
            </div>
          </div>
          <div className="form-group">
            <div className="col-md-offset-2 col-md-10">
              <button type="submit" className="btn btn-primary"
                      onClick={ e => this.onSubmit(e)}>提交</button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default ProductSave;