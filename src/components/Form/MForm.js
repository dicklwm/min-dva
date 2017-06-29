import React from 'react';
import { Form } from 'antd';
import Utils from '../../utils';

const FormUtil = Utils.Form;
const FormItem = Form.Item;

/**
 * 封装了一层的MForm
 * @param fields 源fields Array
 * @param item 默认数据对象
 * @param form antd的form
 * @param layout FormItem的布局，如： {labelCol: {span: 3, offset: 0}, wrapperCol: { span: 20 }}
 * @param others 传递给antd form的其它属性, 请参考ant.form属性
 * @returns {XML}
 */
export default ({ fields, item, form, layout = {}, ...others }) => {
  return (
    <Form horizontal {...others} >
      {fields.map(field =>
        (<FormItem label={`${field.name}:`} help={field.help} hasFeedback={field.hasFeedback === false ? field.hasFeedback : true} key={field.key} {...layout}>
          {FormUtil.createFieldDecorator(field, item, form.getFieldDecorator)}
        </FormItem>),
      )}
    </Form>
  );
};
