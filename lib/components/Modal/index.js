'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _antd = require('antd');

var _utils = require('../../utils');

var _utils2 = _interopRequireDefault(_utils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var validate = _utils2.default.Form.validate;
/**
 * 模态框组件
 *
 * @props visible Symbol类型参数，每次visible改变的时候，都会显示模态框
 * @props form 如果配置了form属性，则onOk属性会传递values,且只有在form validate success之后，才触发cancel逻辑
 * @props {...modalProps} 参考antd 模态框组件
 */

var HModal = function (_React$Component) {
  (0, _inherits3.default)(HModal, _React$Component);

  function HModal(props) {
    (0, _classCallCheck3.default)(this, HModal);

    var _this = (0, _possibleConstructorReturn3.default)(this, (HModal.__proto__ || (0, _getPrototypeOf2.default)(HModal)).call(this, props));

    var visible = props.visible;

    _this.state = {
      visible: !!visible
    };
    _this.handleCancel = _this.handleCancel.bind(_this);
    _this.handleOk = _this.handleOk.bind(_this);
    return _this;
  }

  (0, _createClass3.default)(HModal, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(_ref) {
      var visible = _ref.visible,
          confirmLoading = _ref.confirmLoading;

      // 如果props中的visible属性改变，则显示modal
      if (visible && visible !== this.props.visible) {
        this.setState({
          visible: true
        });
      }
      // 如果confirmLoading 从true转变为flase,则隐藏modal
      if (confirmLoading === false && this.props.confirmLoading) {
        this.setState({
          visible: false
        });
      }
    }
  }, {
    key: 'handleCancel',
    value: function handleCancel() {
      if (this.props.onCancel) {
        this.props.onCancel();
      }

      this.setState({
        visible: false
      });
    }
  }, {
    key: 'handleOk',
    value: function handleOk() {
      var _this2 = this;

      var _props = this.props,
          confirmLoading = _props.confirmLoading,
          form = _props.form,
          onOk = _props.onOk;

      var hideModal = function hideModal() {
        // 如果没有传递confirmLoading,则直接关闭窗口
        if (confirmLoading === undefined) {
          _this2.handleCancel();
        }
      };

      if (onOk && form) {
        // 如果配置了form属性，则验证成功后才关闭表单
        validate(form)(function (values, originValues) {
          onOk(values, originValues);
          hideModal();
        });
      } else {
        if (onOk) {
          onOk();
        }
        hideModal();
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var modalProps = (0, _extends3.default)({}, this.props, { visible: true, onOk: this.handleOk, onCancel: this.handleCancel
      });
      return _react2.default.createElement(
        'div',
        null,
        this.state.visible && _react2.default.createElement(
          _antd.Modal,
          modalProps,
          this.props.children
        )
      );
    }
  }]);
  return HModal;
}(_react2.default.Component);

exports.default = HModal;