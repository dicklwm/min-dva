'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.combineEditType = exports.combineTypes = exports.editFieldTypes = undefined;

var _assign = require('babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

var _css = require('antd/lib/checkbox/style/css');

var _checkbox = require('antd/lib/checkbox');

var _checkbox2 = _interopRequireDefault(_checkbox);

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

var _css2 = require('antd/lib/date-picker/style/css');

var _datePicker = require('antd/lib/date-picker');

var _datePicker2 = _interopRequireDefault(_datePicker);

var _css3 = require('antd/lib/input-number/style/css');

var _inputNumber = require('antd/lib/input-number');

var _inputNumber2 = _interopRequireDefault(_inputNumber);

var _css4 = require('antd/lib/input/style/css');

var _input = require('antd/lib/input');

var _input2 = _interopRequireDefault(_input);

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _css5 = require('antd/lib/select/style/css');

var _select = require('antd/lib/select');

var _select2 = _interopRequireDefault(_select);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

var _EditableCell = require('../../components/Table/EditableCell');

var _EditableCell2 = _interopRequireDefault(_EditableCell);

var _EditableUpload = require('../../components/Table/EditableUpload');

var _EditableUpload2 = _interopRequireDefault(_EditableUpload);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Option = _select2.default.Option;

/*
 * column类型定义
 */
var fieldTypes = {
  text: function text(value) {
    return value;
  },
  number: function number(value) {
    return value;
  },
  textarea: function textarea(value) {
    return value;
  },
  datetime: function datetime(value) {
    return value ? (0, _moment2.default)(new Date(parseInt(value, 10))).format('YYYY-MM-DD HH:mm:ss') : '';
  },
  date: function date(value) {
    return value ? (0, _moment2.default)(new Date(value)).format('YYYY-MM-DD') : '';
  },
  enum: function _enum(value, field) {
    return field.enums[value];
  },
  boolean: function boolean(value) {
    return value == 'true' || value === true ? '是' : '否';
  }
};

var editFieldTypes = exports.editFieldTypes = {
  // field 一定要有onSave方法
  // editable编辑状态，status保存状态，onCheck保存到redux方法
  text: function text(_ref) {
    var value = _ref.value,
        record = _ref.record,
        field = _ref.field;

    return _react2.default.createElement(
      _EditableCell2.default,
      (0, _extends3.default)({
        record: record,
        value: value,
        dataIndex: field.key
      }, field, {
        editable: record.id === field.editable,
        status: record.id === field.editable ? field.status : undefined
      }),
      _react2.default.createElement(_input2.default, (0, _extends3.default)({
        placeholder: field.placeholder || '\u8BF7\u8F93\u5165' + field.title,
        style: field.style
      }, field.meta))
    );
  },
  number: function number(_ref2) {
    var value = _ref2.value,
        record = _ref2.record,
        field = _ref2.field;

    return _react2.default.createElement(
      _EditableCell2.default,
      (0, _extends3.default)({
        record: record,
        value: value,
        dataIndex: field.key
      }, field, {
        editable: record.id === field.editable,
        status: record.id === field.editable ? field.status : undefined
      }),
      _react2.default.createElement(_inputNumber2.default, (0, _extends3.default)({
        placeholder: field.placeholder || '\u8BF7\u8F93\u5165' + field.title,
        style: (0, _extends3.default)({ width: field.width }, field.style)
      }, field.meta))
    );
  },
  textarea: function textarea(_ref3) {
    var value = _ref3.value,
        record = _ref3.record,
        field = _ref3.field;

    return _react2.default.createElement(
      _EditableCell2.default,
      (0, _extends3.default)({
        record: record,
        value: value,
        dataIndex: field.key
      }, field, {
        editable: record.id === field.editable,
        status: record.id === field.editable ? field.status : undefined
      }),
      _react2.default.createElement(_input2.default, (0, _extends3.default)({
        type: 'textarea',
        placeholder: field.placeholder || '\u8BF7\u8F93\u5165' + field.title,
        style: (0, _extends3.default)({ width: field.width }, field.style)
      }, field.meta))
    );
  },
  datetime: function datetime(_ref4) {
    var value = _ref4.value,
        record = _ref4.record,
        field = _ref4.field;

    return _react2.default.createElement(
      _EditableCell2.default,
      (0, _extends3.default)({
        record: record,
        value: value,
        dataIndex: field.key
      }, field, {
        editable: record.id === field.editable,
        status: record.id === field.editable ? field.status : undefined
      }),
      _react2.default.createElement(_datePicker2.default, (0, _extends3.default)({
        showTime: true,
        style: (0, _extends3.default)({ width: field.width }, field.style),
        placeholder: field.placeholder || '\u8BF7\u9009\u62E9' + field.title,
        format: 'YYYY-MM-DD HH:mm:ss'
      }, field.meta))
    );
  },
  date: function date(_ref5) {
    var value = _ref5.value,
        record = _ref5.record,
        field = _ref5.field;

    return _react2.default.createElement(
      _EditableCell2.default,
      (0, _extends3.default)({
        record: record,
        value: value,
        dataIndex: field.key
      }, field, {
        editable: record.id === field.editable,
        status: record.id === field.editable ? field.status : undefined
      }),
      _react2.default.createElement(_datePicker2.default, (0, _extends3.default)({
        style: (0, _extends3.default)({ width: field.width }, field.style),
        placeholder: field.placeholder || '\u8BF7\u9009\u62E9' + field.title,
        format: 'YYYY-MM-DD'
      }, field.meta))
    );
  },
  enum: function _enum(_ref6) {
    var value = _ref6.value,
        record = _ref6.record,
        field = _ref6.field;

    var enumsArray = (0, _keys2.default)(field.enums).reduce(function (occ, key) {
      occ.push(_react2.default.createElement(
        Option,
        { key: key },
        field.enums[key]
      ));
      return occ;
    }, []);
    return _react2.default.createElement(
      _EditableCell2.default,
      (0, _extends3.default)({
        record: record,
        value: value,
        dataIndex: field.key
      }, field, {
        editable: record.id === field.editable,
        status: record.id === field.editable ? field.status : undefined
      }),
      _react2.default.createElement(
        _select2.default,
        (0, _extends3.default)({
          style: (0, _extends3.default)({ width: field.width }, field.style),
          placeholder: field.placeholder || '\u8BF7\u9009\u62E9' + field.name
        }, field.meta),
        enumsArray
      )
    );
  },
  boolean: function boolean(_ref7) {
    var value = _ref7.value,
        record = _ref7.record,
        field = _ref7.field;

    return _react2.default.createElement(
      _EditableCell2.default,
      (0, _extends3.default)({
        record: record,
        value: value,
        dataIndex: field.key
      }, field, {
        editable: record.id === field.editable,
        status: record.id === field.editable ? field.status : undefined
      }),
      _react2.default.createElement(_checkbox2.default, field.meta)
    );
  },
  upload: function upload(_ref8) {
    var value = _ref8.value,
        record = _ref8.record,
        field = _ref8.field;

    return (
      // value是文件名
      _react2.default.createElement(_EditableUpload2.default, (0, _extends3.default)({
        record: record,
        value: value,
        dataIndex: field.key
      }, field, {
        editable: record.id === field.editable,
        status: record.id === field.editable ? field.status : undefined
      }))
    );
  }

  /*
   * 扩展column类型定义
   */
};var combineTypes = exports.combineTypes = function combineTypes(types) {
  (0, _assign2.default)(fieldTypes, types);
};

var combineEditType = exports.combineEditType = function combineEditType(types) {
  (0, _assign2.default)(editFieldTypes, types);
};

exports.default = fieldTypes;