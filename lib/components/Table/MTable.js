'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _css = require('antd/lib/pagination/style/css');

var _pagination = require('antd/lib/pagination');

var _pagination2 = _interopRequireDefault(_pagination);

var _css2 = require('antd/lib/table/style/css');

var _table = require('antd/lib/table');

var _table2 = _interopRequireDefault(_table);

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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var MTable = function (_React$PureComponent) {
  (0, _inherits3.default)(MTable, _React$PureComponent);

  function MTable(props) {
    (0, _classCallCheck3.default)(this, MTable);

    var _this = (0, _possibleConstructorReturn3.default)(this, (MTable.__proto__ || (0, _getPrototypeOf2.default)(MTable)).call(this, props));

    _this.state = {
      height: 500
    };
    return _this;
  }

  (0, _createClass3.default)(MTable, [{
    key: 'componentWillUpdate',
    value: function componentWillUpdate() {
      var body = document.body;
      var header = document.getElementById('header');
      var bread = document.getElementById('bread');
      var tableTitle = document.getElementsByClassName('ant-table-title');
      var thead = document.getElementsByClassName('ant-table-thead');
      var height = (body ? body.clientHeight : 0) - (bread ? bread.clientHeight + 30 : 10) - (header ? header.clientHeight : 0) - (tableTitle.length ? tableTitle[0].clientHeight : 0) - (thead.length ? thead[0].clientHeight : 0) - 62;
      if (height !== this.state.height) {
        this.setState({ height: height });
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props,
          tools = _props.tools,
          tableProps = _props.tableProps,
          paginationProps = _props.paginationProps;

      return _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(_table2.default, (0, _extends3.default)({
          // 默认为id
          rowKey: 'id',
          title: function title() {
            return tools ? _react2.default.createElement(
              'div',
              { className: 'table-title' },
              tools
            ) : null;
          },
          scroll: {
            y: this.state.height
          }
          // 有面包屑70，没面包屑10,头部48，表头56,页码76，可被覆盖
          , pagination: paginationProps ? false :
          // 本地分页
          {
            className: 'fixed-pagination',
            showSizeChanger: true,
            showTotal: function showTotal(totalData) {
              return _react2.default.createElement(
                'span',
                null,
                '\u5171\u5230 ',
                totalData,
                ' \u6761\u6570\u636E'
              );
            }
          }
        }, tableProps)),

        // 如果不传分页的Props就用本地的分页
        paginationProps ? _react2.default.createElement(_pagination2.default, (0, _extends3.default)({
          className: 'fixed-pagination',
          showSizeChanger: true,
          showTotal: function showTotal(totalData) {
            return _react2.default.createElement(
              'span',
              null,
              '\u5171\u5230 ',
              totalData,
              ' \u6761\u6570\u636E'
            );
          }
        }, paginationProps)) : null
      );
    }
  }]);
  return MTable;
}(_react2.default.PureComponent);

exports.default = MTable;