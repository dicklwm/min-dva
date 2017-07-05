import React from 'react';
import { Table, Pagination } from 'antd';


class MTable extends React.PureComponent {

  state={
    height: 500,
  }

  componentWillUpdate() {
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
    if (height !== this.state.height) {
      this.setState({ height });
    }
  }

  render() {
    const { tools, tableProps, paginationProps } = this.props;
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
          scroll={{
            y: this.state.height,
          }}
        // 有面包屑70，没面包屑10,头部48，表头56,页码76，可被覆盖
          pagination={
          paginationProps ?
          false :
          // 本地分页
          {
            className: 'fixed-pagination',
            showSizeChanger: true,
            showTotal: totalData => <span>共到 {totalData} 条数据</span>,
          }
        }
          {...tableProps}
        />
        {
        // 如果不传分页的Props就用本地的分页
        paginationProps ?
          <Pagination
            className="fixed-pagination"
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
