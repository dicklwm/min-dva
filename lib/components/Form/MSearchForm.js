'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _css = require('antd/lib/row/style/css');

var _row = require('antd/lib/row');

var _row2 = _interopRequireDefault(_row);

var _css2 = require('antd/lib/button/style/css');

var _button = require('antd/lib/button');

var _button2 = _interopRequireDefault(_button);

var _css3 = require('antd/lib/col/style/css');

var _col = require('antd/lib/col');

var _col2 = _interopRequireDefault(_col);

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _objectWithoutProperties2 = require('babel-runtime/helpers/objectWithoutProperties');

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

var _css4 = require('antd/lib/form/style/css');

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
 * 查询表单
 *
 * @props fields 表单字段定义
 * @props search 查询字段初始值
 * @props form antd form
 * @props showLabel 是否显示输入框名称
 * @props showReset 是否显示重置按钮
 * @props formItemLayout 查询框布局定义
 * @props onSearch 查询回调函数
 * @props ...others 其他属性
 *
 */
var MSearchForm = function MSearchForm(_ref) {
  var fields = _ref.fields,
      _ref$search = _ref.search,
      search = _ref$search === undefined ? {} : _ref$search,
      form = _ref.form,
      showLabel = _ref.showLabel,
      showReset = _ref.showReset,
      _ref$formItemLayout = _ref.formItemLayout,
      formItemLayout = _ref$formItemLayout === undefined ? {} : _ref$formItemLayout,
      onSearch = _ref.onSearch,
      onReset = _ref.onReset,
      others = (0, _objectWithoutProperties3.default)(_ref, ['fields', 'search', 'form', 'showLabel', 'showReset', 'formItemLayout', 'onSearch', 'onReset']);

  formItemLayout = (0, _extends3.default)({
    itemCol: {
      span: 6
    },
    labelCol: {
      span: showLabel ? 6 : 0
    },
    wrapperCol: {
      span: showLabel ? 18 : 24
    },
    btnCol: {
      span: 6
    }
  }, formItemLayout);

  var handleSubmit = function handleSubmit() {
    FormUtil.validate(form, fields)(onSearch);
  };

  var handleReset = function handleReset() {
    form.resetFields();
    if (onReset) {
      onReset();
    }
  };

  var getLabelName = function getLabelName(field) {
    return showLabel ? field.name + ':' : '';
  };

  return _react2.default.createElement(
    _form2.default,
    (0, _extends3.default)({ layout: 'inline' }, others),
    _react2.default.createElement(
      _row2.default,
      null,
      fields.map(function (field, index) {
        return _react2.default.createElement(
          _col2.default,
          (0, _extends3.default)({}, formItemLayout.itemCol, { key: 'itemKey' + index }),
          _react2.default.createElement(
            FormItem,
            {
              label: getLabelName(field),
              help: field.help,
              key: field.key,
              labelCol: formItemLayout.labelCol,
              wrapperCol: formItemLayout.wrapperCol
            },
            FormUtil.createFieldDecorator(field, search, form.getFieldDecorator)
          )
        );
      }),
      _react2.default.createElement(
        _col2.default,
        (0, _extends3.default)({}, formItemLayout.btnCol, {
          key: 'itemKeySubmit'
        }),
        _react2.default.createElement(
          FormItem,
          { style: { marginBottom: 15 } },
          _react2.default.createElement(
            _button2.default,
            { type: 'primary', htmlType: 'submit', onClick: handleSubmit },
            '\u67E5\u8BE2'
          )
        ),
        showReset && _react2.default.createElement(
          FormItem,
          null,
          _react2.default.createElement(
            _button2.default,
            { type: 'primary', onClick: handleReset },
            '\u91CD\u7F6E'
          )
        )
      )
    )
  );
};

exports.default = _form2.default.create()(MSearchForm);