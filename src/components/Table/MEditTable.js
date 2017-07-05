/** Created by Min on 2017-07-04.  */
import React from 'react';
import { Button, Popconfirm } from 'antd';

export default class MEditTable extends React.PureComponent {

  constructor(props) {
    super(props);
    this.state = {
      // 主键索引
      editable: -1,
      status: undefined,
    };
    this.namespace = '';
    this.changeData = {};
    // 封装好的操作按钮组
    this.editButton = (text, record, index) =>
      <span className="table-tool">
        {
            this.state.editable === record.id ?
              // 保存、取消按钮组
              <span>
                <label htmlFor="save">
                  <Button
                    key={index}
                    title="保存"
                    id="save"
                    icon="save"
                    type="primary"
                    onClick={() => {
                      // 保存按钮
                      this.statusChange(record.id, 'save');
                      // 异步执行dispatch，不然changeData会没有值
                      // 保存完了需要改回status
                      setTimeout(() => {
                        if (this.handleSave) {
                          this.handleSave(this.changeData);
                        } else {
                          console.warn('请在继承MEditTable的组件定义handleSave方法，例：handleSave=(changeData)=>{}');
                        }
                        // 用完changeData清空，状态也清空
                        this.changeData = {};
                        this.statusChange(-1);
                      }, 0);
                    }}
                  />
                </label>
                <label htmlFor="cancel">
                  <Popconfirm
                    id="cancel"
                    key={index}
                    title="是否确定取消？"
                    placement="bottomRight"
                    onConfirm={() => {
                      // 修改状态为cancel
                      this.statusChange(record.id, 'cancel');

                      // 异步执行dispatch，不然props不进去Cell里面
                      setTimeout(() => {
                        this.statusChange(-1);
                      }, 0);
                    }}
                  >
                    <Button
                      key={index}
                      title="取消"
                      icon="close"
                    />
                  </Popconfirm>
                </label>
              </span>
              :
              // 编辑、删除按钮组
              <span>
                <label htmlFor="edit">
                  <Button
                    key={index}
                    title="编辑"
                    loading={this.props.loading}
                    id="edit"
                    icon="edit"
                    onClick={() => {
                      // 修改editable为当前行
                      this.statusChange(record.id);
                    }}
                  >
                    {this.props.loading ? ' ' : null}
                  </Button>
                </label>

                <label htmlFor="delete">
                  <Popconfirm
                    id="delete"
                    key={index}
                    title="是否确定删除？"
                    placement="bottomRight"
                    onConfirm={() => {
                      if (this.handleDelete) {
                        this.handleDelete(record);
                      } else {
                        console.warn('请在继承MEditTable的组件定义handleDelete方法，例：handleDelete=(id)=>{}');
                      }
                    }}
                  >
                    <Button
                      key={index}
                      title="删除"
                      loading={this.props.loading}
                      icon="delete"
                      type="danger"
                    >
                      {this.props.loading ? ' ' : null}
                    </Button>
                  </Popconfirm>
                </label>
              </span>
          }
      </span>;
  }

  statusChange = (editable = -1, status) => {
    this.setState({
      editable,
      status,
    });
  }

  handlePageChange = (page, page_size) => {
    const { dispatch } = this.props;
    dispatch({
      type: `${this.namespace}/queryDataChange`,
      payload: {
        page, page_size,
      },
    });
    dispatch({
      type: `${this.namespace}/fetch`,
    });
  }

  handleQueryChange = (key, value) => {
    const { dispatch } = this.props;
    dispatch({
      type: `${this.namespace}/queryDataChange`,
      payload: {
        [key]: value,
      },
    });
  }

  handleRefresh= () => {
    const { dispatch } = this.props;
    dispatch({
      type: `${this.namespace}/fetch`,
    });
  }

  handleEditChange=(key, value, record) => {
    if (typeof key === 'string') {
      this.changeData = {
        ...this.changeData,
        [key]: value,
        id: record.id,
      };
    } else if (typeof key === 'object') {
      key.forEach((item, index) => {
        if (value[index]) {
          this.changeData = {
            ...this.changeData,
            [item]: value[index],
            id: record.id,
          };
        }
      });
    }
  }

}
