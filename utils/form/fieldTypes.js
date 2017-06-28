import React from 'react';
import moment from 'moment';
import { DatePicker, Select, Input, Checkbox, InputNumber } from 'antd';

const Option = Select.Option;
const RangePicker = DatePicker.RangePicker;

/**
 * 表单字段类型
 * date 日期类型 DatePicker
 * datetime 日期时间 DatePicker
 * datetimeRange 范围日期时间 RangePicker
 * enum 枚举 Select
 * boolean 布尔型 Checkbox
 * number 数字型 InputNumber
 * textarea 长文本 Input type="textarea"
 * text 文本 Input
 */
const fieldTypes = {
  date: ({ initialValue, inputProps }) => {
    return {
      input: <DatePicker {...inputProps} />,
      initialValue: initialValue ? moment(parseInt(initialValue, 10)) : null,
    };
  },
  datetime: ({ initialValue, inputProps }) => {
    return {
      input: <DatePicker showTime format="YYYY-MM-DD HH:mm:ss" {...inputProps} />,
      initialValue: initialValue ? moment(parseInt(initialValue, 10)) : null,
    };
  },
  datetimeRange: ({ inputProps }) => {
    return <RangePicker showTime format="YYYY-MM-DD HH:mm:ss" {...inputProps} />;
  },
  enum: ({ field, placeholder, inputProps }) => {
    // occ是所有的元素，初始化为[]
    const enumsArray = Object.keys(field.enums).reduce((occ, key) => {
      occ.push({
        key,
        value: field.enums[key],
      });
      return occ;
    }, []);
    placeholder = placeholder === false ? '' : (placeholder || `请选择${field.name}`);
    return (
      <Select placeholder={placeholder} {...inputProps} >
        {enumsArray.map(item =>
          <Option key={item.key}>
            {item.value}
          </Option>,
        )}
      </Select>
    );
  },
  boolean: ({ inputProps }) => {
    return <Checkbox {...inputProps} />;
  },
  number: ({ meta = {}, inputProps }) => {
    return <InputNumber min={meta.min || -Infinity} max={meta.max || Infinity} step={meta.step || 1} {...inputProps} />;
  },
  textarea: ({ meta = {}, field, placeholder, inputProps }) => {
    placeholder = placeholder === false ? '' : (placeholder || meta.placeholder || `请输入${field.name}`);
    return <Input type="textarea" rows={meta.rows || 3} placeholder={placeholder} autosize={meta.autosize} {...inputProps} />;
  },
  text: ({ meta = {}, field, placeholder, inputProps }) => {
    placeholder = placeholder === false ? '' : (placeholder || meta.placeholder || `请输入${field.name}`);
    return <Input type="text" placeholder={placeholder} {...inputProps} />;
  },
};

/*
 * 扩展表单字段类型
 */
export function combineTypes(extras) {
  Object.assign(fieldTypes, extras);
}

export default fieldTypes;
