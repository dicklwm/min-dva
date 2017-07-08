'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _assign = require('babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _objectWithoutProperties2 = require('babel-runtime/helpers/objectWithoutProperties');

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

var _fieldTypes = require('./fieldTypes');

var _fieldTypes2 = _interopRequireDefault(_fieldTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * 获取column中显示的filedValue
 * 如果传入editable的field识别为可编辑
 */
function getFieldValue(value, record) {
  var field = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

  var type = field.type || field.enums && 'enum';
  type = _fieldTypes2.default.hasOwnProperty(type) ? type : 'text';
  if (field.hasOwnProperty('editable')) {
    return _fieldTypes.editFieldTypes[type]({ value: value, record: record, field: field });
  } else {
    return _fieldTypes2.default[type](value, field);
  }
}

/**
 * 获取表格column数组
 * 示例:
 * const columns = getColumns(fields,['name','author'],{ name: { render: ()=>{} }}).values();
 * const columns = getColumns(fields).excludes(['id','desc']).values();
 * const columns = getColumns(fields).pick(['name','author','openTime']).enhance({name:{ render: ()=>{} }}).values();
 * @param originField 原始fields
 * @param fieldKeys 需要包含的字段keys
 * @param extraFields 扩展的fields
 * @result 链式写法，返回链式对象(包含pick,excludes,enhance,values方法), 需要调用values返回最终的数据
 */
function getColumns(fields, fieldKeys, extraFields) {
  var chain = {};
  var columns = [];

  var transform = function transform(_fields) {
    return _fields.map(function (field) {
      var dataIndex = field.dataIndex,
          title = field.title,
          key = field.key,
          name = field.name,
          editable = field.editable,
          render = field.render,
          others = (0, _objectWithoutProperties3.default)(field, ['dataIndex', 'title', 'key', 'name', 'editable', 'render']);

      var newRender = function newRender(value, record) {
        return getFieldValue(value, record, field);
      };

      if (render && editable) {
        newRender = function newRender(value, record) {
          if (record.id !== editable) {
            return render(value, record);
          } else {
            return getFieldValue(value, record, field);
          }
        };
      } else if (render && !editable) {
        newRender = render;
      }

      return (0, _extends3.default)({
        dataIndex: key || dataIndex,
        title: name || title,
        render: newRender
      }, others);
    });
  };

  var pick = function pick(_fieldKeys) {
    _fieldKeys = [].concat(_fieldKeys);
    columns = _fieldKeys.map(function (fieldKey) {
      var column = columns.find(function (item) {
        return fieldKey === (item.key || item.dataIndex);
      });
      if (!column) {
        // 如果fieldKey不存在，则创建text类型的column
        column = {
          dataIndex: fieldKey,
          title: fieldKey,
          render: function render(value, record) {
            return getFieldValue(value, record, field);
          }
        };
      }
      return column;
    });
    return chain;
  };

  var excludes = function excludes(_fieldKeys) {
    _fieldKeys = [].concat(_fieldKeys);
    columns = columns.filter(function (column) {
      return !_fieldKeys.includes(column.dataIndex);
    });
    return chain;
  };

  var enhance = function enhance(_extraColumns) {
    if (!Array.isArray(_extraColumns)) {
      _extraColumns = (0, _keys2.default)(_extraColumns).map(function (key) {
        return (0, _assign2.default)(_extraColumns[key], {
          key: key
        });
      });
    }
    _extraColumns.forEach(function (extraColumn) {
      var _extraColumn = extraColumn,
          dataIndex = _extraColumn.dataIndex,
          title = _extraColumn.title,
          key = _extraColumn.key,
          name = _extraColumn.name,
          render = _extraColumn.render,
          editable = _extraColumn.editable,
          others = (0, _objectWithoutProperties3.default)(_extraColumn, ['dataIndex', 'title', 'key', 'name', 'render', 'editable']);

      var newRender = function newRender(value, record) {
        return getFieldValue(value, record, field);
      };

      if (!render) {
        newRender = function newRender(value, record) {
          return getFieldValue(value, record, extraColumn);
        };
      }

      if (render && editable) {
        newRender = function newRender(value, record) {
          if (record.id !== editable) {
            return render(value, record);
          } else {
            return getFieldValue(value, record, field);
          }
        };
      } else if (render && !editable) {
        newRender = render;
      }

      extraColumn = (0, _extends3.default)({
        dataIndex: key || dataIndex,
        title: name || title,
        render: newRender
      }, others);

      var column = columns.find(function (item) {
        return item.dataIndex === extraColumn.dataIndex;
      });
      if (column) {
        (0, _assign2.default)(column, extraColumn);
      } else {
        columns.push(extraColumn);
      }
    });

    return chain;
  };

  var values = function values() {
    return columns;
  };

  if (fieldKeys) {
    pick(fieldKeys);
  }

  if (extraFields) {
    enhance(extraFields);
  }

  columns = transform(fields);

  return (0, _assign2.default)(chain, {
    pick: pick,
    excludes: excludes,
    enhance: enhance,
    values: values
  });
}

exports.default = {
  combineTypes: _fieldTypes.combineTypes,
  combineEditType: _fieldTypes.combineEditType,
  getFieldValue: getFieldValue,
  getColumns: getColumns
};