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
  text: ({ value, record, field }) => {
    return (
      <EditableCell
        record={record}
        value={value}
        dataIndex={field.key}
        {...field}
        editable={record.id===field.editable}
        status={record.id===field.editable ? field.status : undefined}
      >
        <Input
          placeholder={field.placeholder || `请输入${field.title}`}
          style={field.style}
          {...field.meta}
        />
      </EditableCell>
    )
  },
  number: ({ value, record, field }) => {
    return (
      <EditableCell
        record={record}
        value={value}
        dataIndex={field.key}
        {...field}
        editable={record.id===field.editable}
        status={record.id===field.editable ? field.status : undefined}
      >
        <InputNumber
          placeholder={field.placeholder || `请输入${field.title}`}
          style={{ width: field.width, ...field.style }}
          {...field.meta}
        />
      </EditableCell>
    )
  },
  textarea: ({ value, record, field }) => {
    return (
      <EditableCell
        record={record}
        value={value}
        dataIndex={field.key}
        {...field}
        editable={record.id===field.editable}
        status={record.id===field.editable ? field.status : undefined}
      >
        <Input
          type="textarea"
          placeholder={field.placeholder || `请输入${field.title}`}
          style={{ width: field.width, ...field.style }}
          {...field.meta}
        />
      </EditableCell>
    )
  },
  datetime: ({ value, record, field }) => {
    return (
      <EditableCell
        record={record}
        value={value}
        dataIndex={field.key}
        {...field}
        editable={record.id===field.editable}
        status={record.id===field.editable ? field.status : undefined}
      >
        <DatePicker
          showTime
          style={{ width: field.width, ...field.style }}
          placeholder={field.placeholder || `请选择${field.title}`}
          format="YYYY-MM-DD HH:mm:ss"
          {...field.meta}
        />
      </EditableCell>
    )
  },
  date: ({ value, record, field }) => {
    return (
      <EditableCell
        record={record}
        value={value}
        dataIndex={field.key}
        {...field}
        editable={record.id===field.editable}
        status={record.id===field.editable ? field.status : undefined}
      >
        <DatePicker
          style={{ width: field.width, ...field.style }}
          placeholder={field.placeholder || `请选择${field.title}`}
          format="YYYY-MM-DD"
          {...field.meta}
        />
      </EditableCell>
    )
  },
  enum: ({ value, record, field }) => {
    const enumsArray = Object.keys(field.enums).reduce((occ, key) => {
      occ.push(<Option key={key}>{field.enums[key]}</Option>);
      return occ;
    }, []);
    return (
      <EditableCell
        record={record}
        value={value}
        dataIndex={field.key}
        {...field}
        editable={record.id===field.editable}
        status={record.id===field.editable ? field.status : undefined}
      >
        <Select
          style={{ width: field.width, ...field.style }}
          placeholder={field.placeholder || `请选择${field.name}`}
          {...field.meta}
        >
          {enumsArray}
        </Select>
      </EditableCell>
    )
  },
  boolean: ({ value, record, field }) => {
    return (
      <EditableCell
        record={record}
        value={value}
        dataIndex={field.key}
        {...field}
        editable={record.id===field.editable}
        status={record.id===field.editable ? field.status : undefined}
      >
        <Checkbox {...field.meta}/>
      </EditableCell>
    )
  },
  upload: ({ value, record, field }) => {
    return (
      // value是文件名
      <EditableUpload
        record={record}
        value={value}
        dataIndex={field.key}
        {...field}
        editable={record.id===field.editable}
        status={record.id===field.editable ? field.status : undefined}
      />
    )
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

