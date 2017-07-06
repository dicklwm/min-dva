'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _objectWithoutProperties2 = require('babel-runtime/helpers/objectWithoutProperties');

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

var _css = require('antd/lib/form/style/css');

var _form = require('antd/lib/form');

var _form2 = _interopRequireDefault(_form);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _utils = require('../../utils');

var _utils2 = _interopRequireDefault(_utils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var FormUtil = _utils2.default.Form;
var FormItem = _form2.default.Item;

/**
 * 封装了一层的MForm
 * @param fields 源fields Array
 * @param item 对应字段的初始化值
 * @param form antd的form
 * @param layout FormItem的布局，如： {labelCol: {span: 3, offset: 0}, wrapperCol: { span: 20 }}
 * @param others 传递给antd form的其它属性, 请参考ant.form属性
 * @returns {XML}
 */

exports.default = function (_ref) {
  var fields = _ref.fields,
      item = _ref.item,
      form = _ref.form,
      _ref$layout = _ref.layout,
      layout = _ref$layout === undefined ? {} : _ref$layout,
      others = (0, _objectWithoutProperties3.default)(_ref, ['fields', 'item', 'form', 'layout']);

  return _react2.default.createElement(
    _form2.default,
    (0, _extends3.default)({
      layout: 'horizontal'
    }, others),
    fields.map(function (field) {
      return _react2.default.createElement(
        FormItem,
        (0, _extends3.default)({
          label: field.name + ':',
          help: field.help,
          hasFeedback: field.hasFeedback === false ? field.hasFeedback : true,
          key: field.key
        }, layout),
        FormUtil.createFieldDecorator(field, item, form.getFieldDecorator, field.placeholder, field.inputProps, field.decoratorOpts)
      );
    })
  );
};