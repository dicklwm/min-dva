'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof2 = require('babel-runtime/helpers/typeof');

var _typeof3 = _interopRequireDefault(_typeof2);

var _extends4 = require('babel-runtime/helpers/extends');

var _extends5 = _interopRequireDefault(_extends4);

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _css = require('antd/lib/popconfirm/style/css');

var _popconfirm = require('antd/lib/popconfirm');

var _popconfirm2 = _interopRequireDefault(_popconfirm);

var _css2 = require('antd/lib/button/style/css');

var _button = require('antd/lib/button');

var _button2 = _interopRequireDefault(_button);

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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var MEditTable = function (_React$PureComponent) {
  (0, _inherits3.default)(MEditTable, _React$PureComponent);

  function MEditTable(props) {
    (0, _classCallCheck3.default)(this, MEditTable);

    var _this = (0, _possibleConstructorReturn3.default)(this, (MEditTable.__proto__ || (0, _getPrototypeOf2.default)(MEditTable)).call(this, props));

    _this.state = {
      // 主键索引
      editable: -1,
      status: undefined
    };
    _this.namespace = '';
    _this.changeData = {};
    // 封装好的操作按钮组
    _this.editButton = function (text, record, index) {
      return _react2.default.createElement(
        'span',
        { className: 'table-tool' },
        _this.state.editable === record.id ?
        // 保存、取消按钮组
        _react2.default.createElement(
          'span',
          null,
          _react2.default.createElement(
            'label',
            { htmlFor: 'save' },
            _react2.default.createElement(_button2.default, {
              key: index,
              title: '\u4FDD\u5B58',
              id: 'save',
              icon: 'save',
              type: 'primary',
              onClick: function onClick() {
                // 保存按钮
                _this.editableAndStatusChange(record.id, 'save');
                // 异步执行dispatch，不然changeData会没有值
                // 保存完了需要改回status
                setTimeout(function () {
                  if (_this.handleSave) {
                    _this.handleSave(_this.changeData);
                  } else {
                    console.warn('请在继承MEditTable的组件定义handleSave方法，例：handleSave=(changeData)=>{}');
                  }
                  // 用完changeData清空，状态也清空
                  _this.changeData = {};
                  _this.editableAndStatusChange(-1);
                }, 0);
              }
            })
          ),
          _react2.default.createElement(
            'label',
            { htmlFor: 'cancel' },
            _react2.default.createElement(
              _popconfirm2.default,
              {
                id: 'cancel',
                key: index,
                title: '\u662F\u5426\u786E\u5B9A\u53D6\u6D88\uFF1F',
                placement: 'bottomRight',
                onConfirm: function onConfirm() {
                  // 修改状态为cancel
                  _this.editableAndStatusChange(record.id, 'cancel');

                  // 异步执行dispatch，不然props不进去Cell里面
                  setTimeout(function () {
                    _this.editableAndStatusChange(-1);
                  }, 0);
                }
              },
              _react2.default.createElement(_button2.default, {
                key: index,
                title: '\u53D6\u6D88',
                icon: 'close'
              })
            )
          )
        ) :
        // 编辑、删除按钮组
        _react2.default.createElement(
          'span',
          null,
          _react2.default.createElement(
            'label',
            { htmlFor: 'edit' },
            _react2.default.createElement(_button2.default, {
              key: index,
              title: '\u7F16\u8F91',
              id: 'edit',
              icon: 'edit',
              onClick: function onClick() {
                // 修改editable为当前行
                _this.editableAndStatusChange(record.id);
              }
            })
          ),
          _react2.default.createElement(
            'label',
            { htmlFor: 'delete' },
            _react2.default.createElement(
              _popconfirm2.default,
              {
                id: 'delete',
                key: index,
                title: '\u662F\u5426\u786E\u5B9A\u5220\u9664\uFF1F',
                placement: 'bottomRight',
                onConfirm: function onConfirm() {
                  if (_this.handleDelete) {
                    _this.handleDelete(record);
                  } else {
                    console.warn('请在继承MEditTable的组件定义handleDelete方法，例：handleDelete=(id)=>{}');
                  }
                }
              },
              _react2.default.createElement(_button2.default, {
                key: index,
                title: '\u5220\u9664',
                icon: 'delete',
                type: 'danger'
              })
            )
          )
        )
      );
    };

    _this.editableAndStatusChange = _this.editableAndStatusChange.bind(_this);
    _this.handlePageChange = _this.handlePageChange.bind(_this);
    _this.handleQueryChange = _this.handleQueryChange.bind(_this);
    _this.handleRefresh = _this.handleRefresh.bind(_this);
    _this.handleEditChange = _this.handleEditChange.bind(_this);
    _this.handleClearQuery = _this.handleClearQuery.bind(_this);
    return _this;
  }

  (0, _createClass3.default)(MEditTable, [{
    key: 'editableAndStatusChange',
    value: function editableAndStatusChange() {
      var editable = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : -1;
      var status = arguments[1];

      this.setState({
        editable: editable,
        status: status
      });
    }
  }, {
    key: 'handlePageChange',
    value: function handlePageChange(page, page_size) {
      var dispatch = this.props.dispatch;

      dispatch({
        type: this.namespace + '/queryDataChange',
        payload: {
          page: page, page_size: page_size
        }
      });
      dispatch({
        type: this.namespace + '/fetch'
      });
    }
  }, {
    key: 'handleQueryChange',
    value: function handleQueryChange(key, value) {
      var dispatch = this.props.dispatch;

      dispatch({
        type: this.namespace + '/queryDataChange',
        payload: (0, _defineProperty3.default)({}, key, value)
      });
    }
  }, {
    key: 'handleClearQuery',
    value: function handleClearQuery() {
      var dispatch = this.props.dispatch;

      dispatch({
        type: this.namespace + '/clearQuery'
      });
      dispatch({
        type: this.namespace + '/fetch'
      });
    }
  }, {
    key: 'handleRefresh',
    value: function handleRefresh() {
      var dispatch = this.props.dispatch;

      dispatch({
        type: this.namespace + '/fetch'
      });
    }
  }, {
    key: 'handleEditChange',
    value: function handleEditChange(key, value, record) {
      var _this2 = this;

      if (typeof key === 'string') {
        var _extends2;

        this.changeData = (0, _extends5.default)({}, this.changeData, (_extends2 = {}, (0, _defineProperty3.default)(_extends2, key, value), (0, _defineProperty3.default)(_extends2, 'id', record.id), _extends2));
      } else if ((typeof key === 'undefined' ? 'undefined' : (0, _typeof3.default)(key)) === 'object') {
        key.forEach(function (item, index) {
          if (value[index]) {
            var _extends3;

            _this2.changeData = (0, _extends5.default)({}, _this2.changeData, (_extends3 = {}, (0, _defineProperty3.default)(_extends3, item, value[index]), (0, _defineProperty3.default)(_extends3, 'id', record.id), _extends3));
          }
        });
      }
    }
  }]);
  return MEditTable;
}(_react2.default.PureComponent); /** Created by Min on 2017-07-04.  */


exports.default = MEditTable;