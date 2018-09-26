import React, { Component } from 'react'
import Simditor from 'simditor'
import 'simditor/styles/simditor.scss'

// 富文本编辑器
class RichEditor extends Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    this.loadEditor();
  }
  loadEditor() {
    let element = this.refs['textarea'];
    new Simditor({
      textarea: $(element),
      defaultValue: this.props.placeholder || '请输入内容'
    })
  }
  render() {
    return (
      <div className="rich-editor">
        <textarea ref="textarea"></textarea>
      </div>
    )
  }
}

export default RichEditor;