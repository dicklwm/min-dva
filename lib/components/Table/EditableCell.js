'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof2 = require('babel-runtime/helpers/typeof');

var _typeof3 = _interopRequireDefault(_typeof2);

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

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/** Created by Min on 2017/7/04.  */
var EditableCell = function (_React$Component) {
  (0, _inherits3.default)(EditableCell, _React$Component);

  function EditableCell(props) {
    (0, _classCallCheck3.default)(this, EditableCell);

    var _this = (0, _possibleConstructorReturn3.default)(this, (EditableCell.__proto__ || (0, _getPrototypeOf2.default)(EditableCell)).call(this, props));

    _this.state = {
      value: _this.props.value,
      editable: _this.props.editable || false
    };
    _this.handleChange = _this.handleChange.bind(_this);
    _this.handleDateChange = _this.handleDateChange.bind(_this);
    return _this;
  }

  (0, _createClass3.default)(EditableCell, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      if (nextProps.value !== this.state.value && !nextProps.status) {
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
          if (nextProps.onSave) {
            nextProps.onSave(nextProps.dataIndex, this.cacheValue, nextProps.record);
          } else {
            console.warn('field中没有定义onSave方法，请检查，如果继承了MEditTable则直接可以使用this.handleEditChange，也可以不用handleEditChange，自定义(key,value,record)=>{}');
          }
          this.setState({ value: this.cacheValue });
        }
      }
    }
  }, {
    key: 'shouldComponentUpdate',
    value: function shouldComponentUpdate(nextProps, nextState) {
      return nextProps.editable !== this.state.editable || nextState.value !== this.state.value || nextProps.value !== this.state.value || nextProps.status !== this.props.status;
    }
  }, {
    key: 'handleChange',
    value: function handleChange(e) {
      var _ref = this.props.meta || {},
          maxLength = _ref.maxLength;

      var value = (typeof e === 'undefined' ? 'undefined' : (0, _typeof3.default)(e)) === 'object' ? e.target.value : e;
      if (maxLength) {
        if (value.length < maxLength) {
          this.setState({ value: value });
        }
      } else {
        this.setState({ value: value });
      }
    }
  }, {
    key: 'handleDateChange',
    value: function handleDateChange(date, dateString) {
      this.setState({ value: dateString });
    }
  }, {
    key: 'makeInput',
    value: function makeInput() {
      var value = this.state.value;
      var _props = this.props,
          children = _props.children,
          type = _props.type,
          onCheck = _props.onCheck;

      var trueValue = void 0,
          onChange = void 0,
          onPressEnter = void 0;
      switch (type) {
        case 'date':
          trueValue = value ? (0, _moment2.default)(value, 'YYYY-MM-DD') : undefined;
          onChange = this.handleDateChange;
          break;
        case 'datetime':
          trueValue = value ? (0, _moment2.default)(value, 'YYYY-MM-DD HH:mm:ss') : undefined;
          onChange = this.handleDateChange;
          break;
        default:
          trueValue = value;
          onChange = this.handleChange;
          onPressEnter = onCheck;
          break;
      }

      return _react2.default.cloneElement(children, {
        value: trueValue,
        onChange: onChange,
        onPressEnter: onPressEnter
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var _state = this.state,
          value = _state.value,
          editable = _state.editable;

      return _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(
          'div',
          null,
          editable ? this.makeInput() : value || ' '
        )
      );
    }
  }]);
  return EditableCell;
}(_react2.default.Component);

exports.default = EditableCell;