'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.combineTypes = undefined;

var _assign = require('babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * column类型定义
 */
var fieldTypes = {
  normal: function normal(value) {
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

/*
 * 扩展column类型定义
 */
var combineTypes = exports.combineTypes = function combineTypes(types) {
  (0, _assign2.default)(fieldTypes, types);
};

exports.default = fieldTypes;