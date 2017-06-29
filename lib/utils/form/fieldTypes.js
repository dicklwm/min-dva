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

exports.combineTypes = combineTypes;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

var _antd = require('antd');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Option = _antd.Select.Option;
var RangePicker = _antd.DatePicker.RangePicker;

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
var fieldTypes = {
  date: function date(_ref) {
    var initialValue = _ref.initialValue,
        inputProps = _ref.inputProps;

    return {
      input: _react2.default.createElement(_antd.DatePicker, inputProps),
      initialValue: initialValue ? (0, _moment2.default)(parseInt(initialValue, 10)) : null
    };
  },
  datetime: function datetime(_ref2) {
    var initialValue = _ref2.initialValue,
        inputProps = _ref2.inputProps;

    return {
      input: _react2.default.createElement(_antd.DatePicker, (0, _extends3.default)({ showTime: true, format: 'YYYY-MM-DD HH:mm:ss' }, inputProps)),
      initialValue: initialValue ? (0, _moment2.default)(parseInt(initialValue, 10)) : null
    };
  },
  datetimeRange: function datetimeRange(_ref3) {
    var inputProps = _ref3.inputProps;

    return _react2.default.createElement(RangePicker, (0, _extends3.default)({ showTime: true, format: 'YYYY-MM-DD HH:mm:ss' }, inputProps));
  },
  enum: function _enum(_ref4) {
    var field = _ref4.field,
        placeholder = _ref4.placeholder,
        inputProps = _ref4.inputProps;

    // occ是所有的元素，初始化为[]
    var enumsArray = (0, _keys2.default)(field.enums).reduce(function (occ, key) {
      occ.push({
        key: key,
        value: field.enums[key]
      });
      return occ;
    }, []);
    placeholder = placeholder === false ? '' : placeholder || '\u8BF7\u9009\u62E9' + field.name;
    return _react2.default.createElement(
      _antd.Select,
      (0, _extends3.default)({ placeholder: placeholder }, inputProps),
      enumsArray.map(function (item) {
        return _react2.default.createElement(
          Option,
          { key: item.key },
          item.value
        );
      })
    );
  },
  boolean: function boolean(_ref5) {
    var inputProps = _ref5.inputProps;

    return _react2.default.createElement(_antd.Checkbox, inputProps);
  },
  number: function number(_ref6) {
    var _ref6$meta = _ref6.meta,
        meta = _ref6$meta === undefined ? {} : _ref6$meta,
        inputProps = _ref6.inputProps;

    return _react2.default.createElement(_antd.InputNumber, (0, _extends3.default)({ min: meta.min || -Infinity, max: meta.max || Infinity, step: meta.step || 1 }, inputProps));
  },
  textarea: function textarea(_ref7) {
    var _ref7$meta = _ref7.meta,
        meta = _ref7$meta === undefined ? {} : _ref7$meta,
        field = _ref7.field,
        placeholder = _ref7.placeholder,
        inputProps = _ref7.inputProps;

    placeholder = placeholder === false ? '' : placeholder || meta.placeholder || '\u8BF7\u8F93\u5165' + field.name;
    return _react2.default.createElement(_antd.Input, (0, _extends3.default)({ type: 'textarea', rows: meta.rows || 3, placeholder: placeholder, autosize: meta.autosize }, inputProps));
  },
  text: function text(_ref8) {
    var _ref8$meta = _ref8.meta,
        meta = _ref8$meta === undefined ? {} : _ref8$meta,
        field = _ref8.field,
        placeholder = _ref8.placeholder,
        inputProps = _ref8.inputProps;

    placeholder = placeholder === false ? '' : placeholder || meta.placeholder || '\u8BF7\u8F93\u5165' + field.name;
    return _react2.default.createElement(_antd.Input, (0, _extends3.default)({ type: 'text', placeholder: placeholder }, inputProps));
  }
};

/*
 * 扩展表单字段类型
 */
function combineTypes(extras) {
  (0, _assign2.default)(fieldTypes, extras);
}

exports.default = fieldTypes;