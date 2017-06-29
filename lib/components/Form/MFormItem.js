'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _assign = require('babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

exports.default = function (props) {
  var formItemProps = pick(props, FORM_ITEM_KEYS);
  var decoratorOpts = pick(props, DECORATOR_KEYS);

  var inputProps = props.inputProps;
  var _formItemProps = formItemProps,
      label = _formItemProps.label,
      help = _formItemProps.help,
      hasFeedback = _formItemProps.hasFeedback;
  var form = props.form,
      field = props.field,
      item = props.item,
      rules = props.rules,
      initialValue = props.initialValue,
      placeholder = props.placeholder,
      onChange = props.onChange;
  var key = field.key,
      name = field.name;


  label = label === undefined ? name : label;
  help = help === undefined ? field.help : help;

  if (field.hasFeedback === false || hasFeedback === false) {
    hasFeedback = false;
  } else {
    hasFeedback = true;
  }

  var dataItem = item || (0, _defineProperty3.default)({}, key, initialValue);
  var fieldItem = extend(field, { rules: rules });

  formItemProps = extend(formItemProps, { label: label, help: help, hasFeedback: hasFeedback, key: key });
  inputProps = extend(inputProps, { onChange: onChange });

  return _react2.default.createElement(
    FormItem,
    formItemProps,
    FormUtil.createFieldDecorator(fieldItem, dataItem, form.getFieldDecorator, placeholder, inputProps, decoratorOpts)
  );
};

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _antd = require('antd');

var _utils = require('../../utils');

var _utils2 = _interopRequireDefault(_utils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var FormUtil = _utils2.default.Form;
var FormItem = _antd.Form.Item;

var FORM_ITEM_KEYS = ['label', 'labelCol', 'wrapperCol', 'help', 'extra', 'required', 'validateStatus', 'hasFeedback', 'colon'];
var DECORATOR_KEYS = ['trigger', 'valuePropName', 'getValueFromEvent', 'validateTriggger', 'exclusive'];

function pick(obj, keys) {
  return keys.map(function (k) {
    return k in obj ? (0, _defineProperty3.default)({}, k, obj[k]) : {};
  }).reduce(function (res, o) {
    return (0, _assign2.default)(res, o);
  }, {});
}

function extend() {
  var dest = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var source = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  var result = (0, _assign2.default)({}, dest);
  for (var key in source) {
    if (source.hasOwnProperty(key) && source[key] !== undefined) {
      result[key] = source[key];
    }
  }
  return result;
}

/**
 * MFormItem
 * 对FormItem组件封装,统一FormItem与getFieldDecorator的属性，方便使用
 * @props form 表单对象
 * @props field 字段定义对象
 * @props item 默认值数据对象
 * @props rules 校验规则
 * @props onChange 控件改变事件
 * @props initialValue 控件初始值，会覆盖item中对应key的value
 * @props placeholder 如果为false则不显示placeholder
 * @props {...ForItemProps Form.Item 属性集} 包含所有Form.Item属性,参考Form.Item文档
 * @props {...DecoratorOptions 属性集} 包含所有DecoratorOptions属性,参考DecoratorOptions文档
 *
 */