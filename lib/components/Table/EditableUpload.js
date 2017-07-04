'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/** Created by Min on 2017/6/23.  */
var EditableUpload = function (_React$Component) {
  (0, _inherits3.default)(EditableUpload, _React$Component);

  function EditableUpload(props) {
    (0, _classCallCheck3.default)(this, EditableUpload);

    var _this = (0, _possibleConstructorReturn3.default)(this, (EditableUpload.__proto__ || (0, _getPrototypeOf2.default)(EditableUpload)).call(this, props));

    _this.state = {
      value: _this.props.value, // 文件名
      editable: _this.props.editable || false,
      file: undefined, // 文件源对象
      fileList: [] // 文件队列
    };
    return _this;
  }

  (0, _createClass3.default)(EditableUpload, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      if (nextProps.value !== this.state.value) {
        this.setState({ value: nextProps.value });
      }
      if (nextProps.editable !== this.state.editable) {
        this.setState({ editable: nextProps.editable });
        if (nextProps.editable) {
          this.cacheValue = this.state.value;
        }
      }
      if (nextProps.status && nextProps.status !== this.props.status) {
        if (nextProps.status === 'save') {
          if (nextProps.onSave) {
            nextProps.onSave(nextProps.dataIndex, this.state.value, nextProps.record);
          } else {
            console.warn('field中没有定义onSave方法，请检查，如果继承了MEditTable则直接可以使用this.handleEditChange，也可以不用handleEditChange，自定义(key,value,record)=>{}');
          }
        } else if (nextProps.status === 'cancel') {
          this.setState({ value: this.cacheValue });
          if (nextProps.onSave) {
            nextProps.onSave(nextProps.dataIndex, this.cacheValue, nextProps.record);
          } else {
            console.warn('field中没有定义onSave方法，请检查，如果继承了MEditTable则直接可以使用this.handleEditChange，也可以不用handleEditChange，自定义(key,value,record)=>{}');
          }
        }
      }
    }
  }, {
    key: 'shouldComponentUpdate',
    value: function shouldComponentUpdate(nextProps, nextState) {
      return nextProps.editable !== this.state.editable || nextState.value !== this.state.value || nextProps.value !== this.state.value || nextProps.status !== this.props.status;
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _state = this.state,
          value = _state.value,
          editable = _state.editable;
      var _props = this.props,
          meta = _props.meta,
          style = _props.style;
      var name = meta.name,
          action = meta.action,
          data = meta.data;

      return _react2.default.createElement(
        'div',
        null,
        editable ? _react2.default.createElement(
          _antd.Upload,
          {
            name: name,
            action: action,
            data: data,
            beforeUpload: function beforeUpload(curFile, curFileList) {
              // 将上传的东西存到state里，返回false阻止上传
              _this2.setState({
                value: curFile.name,
                file: curFile,
                fileList: curFileList
              });
              return false;
            }
          },
          _react2.default.createElement(_antd.Input, {
            style: style,
            className: 'large-check-input',
            value: value,
            readOnly: true,
            suffix: _react2.default.createElement(
              'span',
              null,
              _react2.default.createElement(_antd.Icon, { type: 'upload' }),
              '\u4E0A\u4F20\u6587\u4EF6'
            )
          })
        ) : value || ' '
      );
    }
  }]);
  return EditableUpload;
}(_react2.default.Component);

exports.default = EditableUpload;