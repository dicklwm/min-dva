import React from 'react';
import moment from 'moment';
import { Input, InputNumber, DatePicker, Select, Checkbox } from 'antd';
import EditableCell from '../../components/Table/EditableCell';
import EditableUpload from '../../components/Table/EditableUpload';

const Option = Select.Option;

/*
 * column类型定义
 */
const fieldTypes = {
  text: value => value,
  number: value => value,
  textarea: value => value,
  datetime: (value) => {
    return value ? moment(new Date(parseInt(value, 10))).format('YYYY-MM-DD HH:mm:ss') : '';
  },
  date: (value) => {
    return value ? moment(new Date(value)).format('YYYY-MM-DD') : '';
  },
  enum: (value, field) => {
    return field.enums[value];
  },
  boolean: (value) => {
    return (value=='true' || value===true) ? '是' : '否';
  },
};

export const editFieldTypes = {
  // field 一定要有onSave方法
  // editable编辑状态，status保存状态，onCheck保存到redux方法
  text: ({ value, field }) => {
    return (
      <EditableCell
        value={value}
        {...field}
      >
        <Input
          placeholder={field.placeholder || `请输入${field.title}`}
          style={field.style}
          {...field.meta}
        />
      </EditableCell>
    )
  },
  number: ({ value, field }) => {
    return (
      <EditableCell
        value={value}
        {...field}
      >
        <InputNumber
          placeholder={field.placeholder || `请输入${field.title}`}
          style={field.style}
          {...field.meta}
        />
      </EditableCell>
    )
  },
  textarea: ({ value, field }) => {
    return (
      <EditableCell
        value={value}
        {...field}
      >
        <Input
          type="textarea"
          placeholder={field.placeholder || `请输入${field.title}`}
          style={field.style}
          {...field.meta}
        />
      </EditableCell>
    )
  },
  datetime: ({ value, field }) => {
    <EditableCell
      value={value}
      {...field}
    >
      <DatePicker
        showTime
        placeholder={field.placeholder || `请选择${field.title}`}
        format="YYYY-MM-DD HH:mm:ss"
        {...field.meta}
      />
    </EditableCell>
  },
  date: ({ value, field }) => {
    return (
      <EditableCell
        value={value}
        {...field}
      >
        <DatePicker
          placeholder={field.placeholder || `请选择${field.title}`}
          format="YYYY-MM-DD"
          {...field.meta}
        />
      </EditableCell>
    )
  },
  enum: ({ value, field }) => {
    const enumsArray = Object.keys(field.enums).reduce((occ, key) => {
      occ.push(<Option key={key} value={key}>{field.enums[key]}</Option>);
      return occ;
    }, []);
    return (
      <EditableCell
        value={value}
        {...field}
      >
        <Select
          placeholder={field.placeholder || `请选择${field.name}`}
          {...field.meta}
        >
          {enumsArray}
        </Select>
      </EditableCell>
    )
  },
  boolean: ({ value, field }) => {
    return (
      <EditableCell
        value={value}
        {...field}
      >
        <Checkbox {...field.meta}/>
      </EditableCell>
    )
  },
  upload: ({ value, field }) => {
    // value是文件名
    <EditableUpload
      value={value}
      {...field}
    />
  }

}

/*
 * 扩展column类型定义
 */
export const combineTypes = (types) => {
  Object.assign(fieldTypes, types);
};

export const combineEditType = (types) => {
  Object.assign(editFieldTypes, types);
};

export default fieldTypes;

