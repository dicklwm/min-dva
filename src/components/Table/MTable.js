import React from 'react';
import PropsType from 'prop-types';
import { Table, Pagination } from 'antd';

class MTable extends React.PureComponent {

  static propsType = {
    tools: PropsType.array,
    tableProps: PropsType.object,
    paginationProps: PropsType.object,
    type: PropsType.oneOf([undefined, 'max']),
    height: PropsType.number,
  }

  constructor (props) {
    super(props);
    this.state = {
      height: this.props.type ? this.props.height : undefined,
    }
  }

  componentWillUpdate () {
    if (this.props.type) {
      const body = document.body;
      const header = document.getElementById('header');
      const bread = document.getElementById('bread');
      const tableTitle = document.getElementsByClassName('ant-table-title');
      const thead = document.getElementsByClassName('ant-table-thead');
      const height = (body ? body.clientHeight : 0) -
        (bread ? bread.clientHeight + 30 : 10) -
        (header ? header.clientHeight : 0) -
        (tableTitle.length ? tableTitle[0].clientHeight : 0) -
        (thead.length ? thead[0].clientHeight : 0) - 62;
      if (height!==this.state.height) {
        this.setState({ height });
      }
    }
  }

  render () {
    const { tools, tableProps, paginationProps, type } = this.props;
    return (
      <div>
        <Table
          // 默认为id
          rowKey="id"
          title={() =>
            tools ?
              <div className="table-title">
                {tools}
              </div> : null
          }
          scroll={type ? { y: this.state.height } : undefined}
          pagination={
            paginationProps===false || paginationProps ?
              false :
              // 本地分页
              {
                className: type ? 'fixed-pagination' : 'ant-pagination-right',
                showSizeChanger: true,
                showTotal: totalData => <span>共到 {totalData} 条数据</span>,
              }
          }
          {...tableProps}
        />
        {
          // 如果不传分页的Props就用本地的分页
          paginationProps && paginationProps!==false ?
            <Pagination
              className={type ? 'fixed-pagination' : 'ant-pagination-right'}
              showSizeChanger
              showTotal={totalData => <span>共到 {totalData} 条数据</span>}
              {...paginationProps}
            />
            : null
        }
      </div>
    );
  }
}

export default MTable;
