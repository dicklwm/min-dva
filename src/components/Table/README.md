## MTable 

对`antd Table`组件进行了二次封装，带工具栏功能，根据需要自动调节最大高度和页码的样式

### 特性
* [x] getColumns工具类辅助定义columns
* [x] 工具栏
* [x] 自动调节最大高度
* [x] 页码样式

### MTable的props属性
| 参数      | 说明                                     | 类型       | 默认值 |
|-----------|------------------------------------------|------------|-------|
| tools | 工具栏，显示在表格的头部，可以是操作按钮层，也可以是搜索栏层 | array[react element] | - |
| tableProps | `antd`表格的props，其中最重要的是column,dataSource，rowKey默认为id | object | - |
| paginationProps | `antd`分页的props，如果不传则用本地分页，如果传则用服务端分页，如果是false，则不显示分页 | object | - |
| type | 是否自动调节 | string[undefined, 'max'] | - |
| height | 默认初始的最大高度 | number | - |

### Demo
* [MTableDemo](https://github.com/dicklwm/min-dva-demo/blob/master/src/routes/Table/MTableDemo.js)

---

## MEditTable
 
后台系统一个复用性比较高的组件，可以实现**行编辑**的表格，通过继承该组件，可以简单的定义一个通用的行编辑表格

#### MEditTable内部实现的参数

- **this.state.editable** ： 当前编辑行的id值
- **this.state.status** ： 当前编辑行的状态，save|cancel
- **this.namespace** ： 当前组件对应的model的作用域，必须改写
- **this.changeData** ： 当保存时，用于缓存编辑行数据的变量
- **this.editButton** ： 封装好的操作按钮组，如果处于空闲状态，则显示编辑、删除按钮组；如果处于编辑状态，则显示保存、取消按钮组

- **this.editableAndStatusChange(editable = -1, status)** ： 组件内部改变editable和status的方法，
- **this.handlePageChange(page, page_size)** ： 用于服务端分页的处理，会触发对应namespace的model的*queryDataChange去改变page,page_size，最后再调用*fetch
- **this.handleQueryChange(key, value)** ： 用于当搜索栏上的字段改变后，改变当前model的query值
- **this.handleRefresh()** ： 用于重新调用*fetch方法
- **this.handleEditChange(key, value, record)** ： 用于在编辑行处于保存状态时，每个EditableCell回调的方法，每个EditableCell回调完之后将所有值保存到this.changeData里面

#### MEditTable外部需要实现的方法
- handleSave(changeData) ： 用于点击保存按钮的回调，将数据保存到model里面或者直接保存到数据库
- handleDelete(id) ： 用于点击删除按钮的回调

#### Demo
- [EditTableDemo](https://github.com/dicklwm/min-dva-demo/blob/master/src/routes/Table/EditTableDemo.js)

---

## FIELD属性
`fields`为`table`的结构对象，其属性说明如下:

| 属性      | 说明                                     | 类型       | 默认值 |
|-----------|------------------------------------------|------------|-------|
| key | 字段key | string | 必须 |
| dataIndex | 与dataSource的字段映射的值，不传则默认为key的值 | string | key |
| name | 字段名称 | string | - |
| title | 字段名称与`name`一样 | string | - |
| width | 表头的宽度，最好都定义，不然表头样式会错乱 | [number,string] | |
| type | 字段类型,目前支持如下类型:date,datetime,enum,boolean,number,textarea,text,upload | string | text |
| enums | 字段枚举定义, 如果字段拥有此属性，则字段类型`type`为enmu,示例: enums:{ 1: '启用', 2: '禁用'} | {} | - |
|**以下是可编辑表格专用**|
| meta | 渲染出来的组件的meta值，如：min,max,rows等 | object | - |
| placeholder| 预留文字，如果为false则不显示，默认显示`请输入${name}` | string | name |
| style | 渲染出来的组件的style | object | -
| editable | 是否编辑，传入this.state.editable即可 | state.editable | - |
| status| 状态，传入this.state.status即可 | state.status | - |
| render | 未编辑状态下的自定义渲染，参考`antd`的`Table Column` | function | - |
| onSave | 保存各EditableCell时的回调，传入this.handleEditChange即可 | this.handleEditChange |  |
| onCheck | Input等有onPressEnter事件的组件触发的方法 | - | - |