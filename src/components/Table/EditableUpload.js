/** Created by Min on 2017/6/23.  */
import React from 'react';
import { Input, Upload, Icon } from 'antd';

export default class EditableUpload extends React.Component {

  constructor (props) {
    super(props);
    this.state = {
      value: this.props.value, // 文件名
      editable: this.props.editable || false,
      file: undefined, // 文件源对象
      fileList: [], // 文件队列
    }
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.value!==this.state.value) {
      this.setState({ value: nextProps.value });
    }
    if (nextProps.editable!==this.state.editable) {
      this.setState({ editable: nextProps.editable });
      if (nextProps.editable) {
        this.cacheValue = this.state.value;
      }
    }
    if (nextProps.status && nextProps.status!==this.props.status) {
      if (nextProps.status==='save') {
        if (nextProps.onSave) {
          nextProps.onSave(nextProps.dataIndex, this.state.value, nextProps.record);
        } else {
          console.warn('field中没有定义onSave方法，请检查，如果继承了MEditTable则直接可以使用this.handleEditChange，也可以不用handleEditChange，自定义(key,value,record)=>{}');
        }
      } else if (nextProps.status==='cancel') {
        this.setState({ value: this.cacheValue });
        if (nextProps.onSave) {
          nextProps.onSave(nextProps.dataIndex, this.cacheValue, nextProps.record);
        } else {
          console.warn('field中没有定义onSave方法，请检查，如果继承了MEditTable则直接可以使用this.handleEditChange，也可以不用handleEditChange，自定义(key,value,record)=>{}');
        }
      }
    }
  }

  shouldComponentUpdate (nextProps, nextState) {
    return nextProps.editable!==this.state.editable ||
      nextState.value!==this.state.value ||
      nextProps.value!==this.state.value ||
      nextProps.status!==this.props.status;
  }

  render () {
    const { value, editable } = this.state;
    const { meta, style } = this.props;
    const { name, action, data } = meta;
    return (
      <div>
        {
          editable ?
            <Upload
              name={name}
              action={action}
              data={data}
              beforeUpload={(curFile, curFileList) => {
                // 将上传的东西存到state里，返回false阻止上传
                this.setState({
                  value: curFile.name,
                  file: curFile,
                  fileList: curFileList,
                });
                return false;
              }}
            >
              <Input
                style={style}
                className="large-check-input"
                value={value}
                readOnly
                suffix={
                  <span>
                      <Icon type="upload"/>
                      上传文件
                    </span>
                }
              />
            </Upload>
            :
            value || ' '
        }
      </div>
    );
  }

}
