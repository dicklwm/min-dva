## Form相关组件

### MForm 表单组件

表单组件, 是对`antd`中`form`的封装，支持通过字段配置直接生成表单, 需要配合[Utils.Form](#/components/MForm)类使用,
`MForm`内部的表单控件布局默认为`horizontal`，可以通过设置formLayout改变布局.

### MForm的props属性

| 参数      | 说明                                     | 类型       | 默认值 |
|-----------|------------------------------------------|------------|-------|
| fields | 表单控件定义数组,详细属性请参考Field说明 | array | 必须 |
| item | fields字段的初始值 | object | {} |
| form | antd form对象 | object | 必须 |
| layout | 表单控件布局属性,参考antd formitem中的布局，示例: {labelCol: {span: 3, offset: 0}, wrapperCol: { span: 20 }} | object | {} |
| formLayout | Form组件的布局 | string | horizontal |
| ...others | 传递给antd form的其它属性, 请参考ant.form属性 | - | - |

---

### MFormItem 表单Item组件

Item组件，是对`antd`中`FormItem`以及`getFieldDecorator`的封装，提供统一的接口，以简化使用.
提供单个控件的封装组件以方便实现表单的灵活布局.

### MFormIten属性
`antd`中`FormItem`的层级包括`FormItem/FieldDecorator/Input`, 使用起来太过繁琐, 我们提供统一的组件，将三层结构压缩为一级结构，将三层结构的属性，合并层一级结构的属性，并且将常用的属性提示到顶级属性上以方便使用.

| 参数      | 说明                                     | 类型       | 默认值 |
|-----------|------------------------------------------|------------|-------|
| form | antd form实例对象 | object | 必须 |
| field | 表单控件定义对象，参考下面的FIELD属性 | object | 必须 |
| item | 表单初始值 | object | {} |
| rules | 表单校验规则,参考antd rules 规则, 此属性会覆盖field里面的rules配置 | array |
| initialValue | 控件初始值，此属性会覆盖item中定义的初试数据 | any | - |
| onChange | 表单控件改变事件 | function | - |
| placeholder | placeholder如果为false则不显示，如果为string则显示对应的值，默认为label | [boolean,string] | field.name |
| inputProps | 传入给控件的属性对象 | object | - |
| ...FormItem | 包含全部的FormItem属性,参考antd FormItem属性定义 | - | - |
| ...DecoratorOptions | 包含全部的DecoratorOptions属性,参考antd DecoratorOptions属性定义 | - | - |

--- 

## FIELD属性
`fields`为`form`的结构对象，其属性说明如下:

| 属性      | 说明                                     | 类型       | 默认值 |
|-----------|------------------------------------------|------------|-------|
| key | 字段key | string | 必须 |
| name | 字段名称 | string | - |
| type | 字段类型,目前支持如下类型:date,datetime,datetimeRange,enum,boolean,number,textarea,text | string | text |
| meta | 字段额外配置属性,支持:min,max,rows,placeholder | object | {} |
| enums | 字段枚举定义, 如果字段拥有此属性，则字段类型`type`为enmu,示例: enums:{ 1: '启用', 2: '禁用'} | {} | - |
| required | form专用属性，是否必填字段 | boolean | - |
    
## 代码演示
```jsx harmony
import React from 'react';
import { Form, Popover, Button } from 'antd';
import { MForm, Utils } from 'min-dva';

const { validate } = Utils.Form;
const fields = [
  {
    key: 'name',
    name: '名称',
    required: true,
  },
  {
    key: 'email',
    name: '邮箱',
  },
  {
    key: 'status',
    name: '状态',
    inputProps: {
      getPopupContainer: triggerNode => triggerNode,
    },
    enums: {
      1: '启用',
      2: '禁用',
    },
  },
];

function MFormDemo({ form}) {
  function handleSubmit() {
    validate(form)(
      (values, tv) => {
        dispatch({
          type: 'Table/EditTableDemo/add_user',
          payload: values,
        });
      },
      (errors) => {
        console.log(errors);
      },
    );
  }

  function handleReset() {
    form.resetFields();
  }

  return (
    <div>
        <MForm
          form={form}
          fields={fields}
          style={{ width: 300 }}
          layout={{
            labelCol: { span: 6 },
            wrapperCol: { span: 18 },
          }}
        />
        <div style={{ textAlign: 'right' }}>
          <Button onClick={handleReset} style={{ marginRight: 6 }} type="danger">重置</Button>
          <Button onClick={handleSubmit} type="primary">确定</Button>
        </div>
    </div>
  );
}

export default Form.create()(MFormDemo);
```

## DEMOS
* [PopAddDemo](https://github.com/dicklwm/min-dva-demo/blob/master/src/components/Table/PopAddDemo.js)