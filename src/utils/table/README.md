# Table工具类

后台系统业务大部分都是表格＋表单的形式，故我们在`model`层，统一定义模型的数据结构，以方便在`table+form`中复用，简化实际的开发工作.  
这里主要介绍下`Table`工具类的使用.

### 使用场景
field提供统一的数据格式，可以包括Table的column的参数参考如下:

```jsx harmony

const tableFields = [
  {
    key: 'name',
    name: '名称',
    sorter: (a, b) => a.name.length - b.name.length, // 排序
    width: 100, // 宽度，最好都设置，不然表头的宽度会不统一
  },
  {
    key: 'email',
    name: '邮箱',
    width: 100,
  },
  {
    key: 'status',
    name: '状态',
    width: 50,
    filters: [ // 筛选组
      {
        text: <Badge status="success" text="启用" />,
        value: '1',
      },
      {
        text: <Badge status="error" text="禁用" />,
        value: '2',
      },
    ],
    // 筛选方法
    onFilter: (value, record) => record.status.indexOf(value) === 0,
    // 渲染方式
    render: value =>
      value === '1' ?
        <Badge status="success" text="启用" /> :
        <Badge status="error" text="禁用" />,
  }];

```

Table类的主要作用是将以上通用的`field`格式，转换为`antd`中`table`支持的`column`定义

### 如何使用

与`form`类类似，通过`utils`引入

> import { Utils } from 'min-dva';
> const { getColumn } = Utils.Table;

Table工具类主要提供以下接口:

- getColumns 转换field为column格式
- combineTypes 扩展支持的字段类型
- getFieldValue 获取数据显示值，传入field定义

##### getColumns
核心方法，转换通用字段类型为column格式, getColumns需要配合`antd.Table`组件使用.

参数：

- originFields 通用的fields定义
- fieldKeys 需要pick的keys, 通用的fields往往是个字段的超级，在table中一般只需要显示部分字段
- extraFields 扩展的字段定义, 可以对通用字段的属性扩展

示例:
```jsx harmony
 const columns = getColumns(fields,['name','author'],{ name: { render: ()=>{} }}).values();
 const columns = getColumns(fields).excludes(['id','desc']).values();
 const columns = getColumns(fields).pick(['name','author','openTime']).enhance({name:{ render: ()=>{} }}).values();
```

getColums返回的是一个链式对象，需要调用`values`方法才能返回最终的结果。
链式对象支持如下方法:
    
- pick 参数与fieldKeys格式一致
- excludes 排除部分字段
- enhance 参数与extraFields格式一致
- values 返回数据结果

```jsx harmony

import { Utils, MTable } from 'min-dva';

const { getColumns } = Utils.Table;

const tableFields = [
  {
    key: 'name',
    name: '名称',
    sorter: (a, b) => a.name.length - b.name.length,
    width: 100,
  },
  {
    key: 'email',
    name: '邮箱',
    width: 100,
  },
  {
    key: 'status',
    name: '状态',
    width: 50,
    filters: [
      {
        text: <Badge status="success" text="启用" />,
        value: '1',
      },
      {
        text: <Badge status="error" text="禁用" />,
        value: '2',
      },
    ],
    onFilter: (value, record) => record.status.indexOf(value) === 0,
    render: value =>
      value === '1' ?
        <Badge status="success" text="启用" /> :
        <Badge status="error" text="禁用" />,
  }];

function MTableDemo({ data, loading }) {
  const operatorColumn = [
    {
      key: 'operator',
      name: '操作',
      width: 60,
      // 扩展字段的render支持自定义渲染
      render: () => {
        return (
          <div>
            <Popover
              trigger="click"
              placement="bottomRight"
            />
            <Button icon="info" />
          </div>
        );
      },
    },
  ];
  const tableColumns = getColumns(tableFields).enhance(operatorColumn).values();
  const tableProps = {
    columns: tableColumns,
    dataSource: data,
    loading,
  };

  return (

    <MTable
      tableProps={tableProps}
    />

  );
}

```

##### combineTypes

扩展通用字段定义支持的表格字段类型, 自定义字段类型写法参考如下:

```javascript
combineTypes（{
  //参数：value: item值, field: 字段定义
  datetime: (value, field) => {
    return moment(new Date(parseInt(value, 10))).format('YYYY-MM-DD HH:mm:ss');
  },
})

```

##### getFieldValue

通过传入字段定义，获取对应字段的值，此函数会根据默认的fieldTypes来做数据转换

```javascript
const rowData = { createTime: 14300000231823 };
const field = {
  key: 'createTime',
  type: 'datatime'
}
getFieldValue(rowData.createTime,field);// 返回日期时间格式：2017-12-12 10:10:10

```
