import React, { Component } from 'React'
import FileUpload from './FileUpLoad.jsx'

class FileUploader extends Component{
  render(){
    const options={
      baseUrl:'/manage/product/upload.do',
      fileFieldName: 'upload_file',
      dataType: 'json',
      chooseAndUpload: true,
      uploadSuccess: res => {
        this.props.onSuccess(res.data)
      },
      uploadError: this.props.onError
    }
    return (
      <FileUpload options={options}>
        <button className="btn btn-xs btn-default" ref="chooseAndUpload">请选择商品图片</button>
      </FileUpload>
    )         
  }
}

export default FileUploader;