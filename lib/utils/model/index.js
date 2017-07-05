'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _assign = require('babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

var _css = require('antd/lib/modal/style/css');

var _modal = require('antd/lib/modal');

var _modal2 = _interopRequireDefault(_modal);

var _css2 = require('antd/lib/message/style/css');

var _message = require('antd/lib/message');

var _message2 = _interopRequireDefault(_message);

var _typeof2 = require('babel-runtime/helpers/typeof');

var _typeof3 = _interopRequireDefault(_typeof2);

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _extends5 = require('babel-runtime/helpers/extends');

var _extends6 = _interopRequireDefault(_extends5);

var _pathToRegexp = require('path-to-regexp');

var _pathToRegexp2 = _interopRequireDefault(_pathToRegexp);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var PATH_SUBSCRIBER_KEY = '_pathSubscriberKey';

var createNestedValueRecuder = function createNestedValueRecuder(parentKey, value) {
  return function (state, _ref) {
    var key = _ref.payload.key;

    var parentState = state[parentKey];

    if (key) {
      parentState = typeof parentState === 'boolean' ? {} : parentState;
      parentState = (0, _extends6.default)({}, parentState, (0, _defineProperty3.default)({}, key, value));
    } else {
      // 兼容旧版本，如果type不存在，则直接对parent赋值
      parentState = value;
    }

    return (0, _extends6.default)({}, state, (0, _defineProperty3.default)({}, parentKey, parentState));
  };
};

var createNestedRecuder = function createNestedRecuder(parentKey) {
  return function (state, _ref2) {
    var payload = _ref2.payload;

    var parentState = state[parentKey];
    parentState = typeof parentState === 'boolean' ? {} : parentState;

    return (0, _extends6.default)({}, state, (0, _defineProperty3.default)({}, parentKey, (0, _extends6.default)({}, parentState, {
      payload: payload
    })));
  };
};

var getDefaultModel = function getDefaultModel() {
  return {
    // 为了兼容旧版本，初始值依旧为false.如果应用中需要多个控制状态，则在model中覆盖初始属性
    state: {
      visible: false,
      spinning: false,
      loading: false,
      confirmLoading: false
    },
    subscriptions: {},
    effects: {},
    reducers: {
      showLoading: createNestedValueRecuder('loading', true),
      hideLoading: createNestedValueRecuder('loading', false),
      showConfirmLoading: createNestedValueRecuder('confirmLoading', true),
      hideConfirmLoading: createNestedValueRecuder('confirmLoading', false),
      showSpinning: createNestedValueRecuder('spinning', true),
      hideSpinning: createNestedValueRecuder('spinning', false),
      updateLoading: createNestedRecuder('loading'),
      updateSpinner: createNestedRecuder('spinning'),
      updateConfirmLoading: createNestedRecuder('confirmLoading'),
      updateState: function updateState(state, _ref3) {
        var payload = _ref3.payload;

        return (0, _extends6.default)({}, state, payload);
      }
    }
  };
};

var getServerDefaultModel = function getServerDefaultModel(namespace, service) {
  return {
    state: {
      visible: false,
      spinning: false,
      loading: false,
      confirmLoading: false
    },
    subscriptions: {
      setup: function setup(_ref4) {
        var listen = _ref4.listen;

        listen('/' + namespace, { type: 'fetch' });
      }
    },
    effects: {
      fetch: _regenerator2.default.mark(function fetch(action, _ref5) {
        var callWithLoading = _ref5.callWithLoading,
            put = _ref5.put,
            select = _ref5.select;
        var query, res;
        return _regenerator2.default.wrap(function fetch$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.t0 = _extends6.default;
                _context.t1 = {};
                _context.next = 4;
                return select(function (state) {
                  return state[namespace].query;
                });

              case 4:
                _context.t2 = _context.sent;
                query = (0, _context.t0)(_context.t1, _context.t2);

                query.start_date = query.dates[0] ? query.dates[0].format('YYYY-MM-DD') : '';
                query.end_date = query.dates[1] ? query.dates[1].format('YYYY-MM-DD') : '';
                _context.next = 10;
                return callWithLoading(service.fetch, query);

              case 10:
                res = _context.sent;

                if (!(res.errorCode === 0)) {
                  _context.next = 14;
                  break;
                }

                _context.next = 14;
                return put({
                  type: 'fetchSuccess',
                  payload: res.data
                });

              case 14:
              case 'end':
                return _context.stop();
            }
          }
        }, fetch, this);
      })
    },
    reducers: {
      fetchSuccess: function fetchSuccess(state, _ref6) {
        var payload = _ref6.payload;

        return (0, _extends6.default)({}, state, {
          data: payload
        });
      },

      showLoading: createNestedValueRecuder('loading', true),
      hideLoading: createNestedValueRecuder('loading', false),
      showConfirmLoading: createNestedValueRecuder('confirmLoading', true),
      hideConfirmLoading: createNestedValueRecuder('confirmLoading', false),
      showSpinning: createNestedValueRecuder('spinning', true),
      hideSpinning: createNestedValueRecuder('spinning', false),
      updateLoading: createNestedRecuder('loading'),
      updateSpinner: createNestedRecuder('spinning'),
      updateConfirmLoading: createNestedRecuder('confirmLoading'),
      updateState: function updateState(state, _ref7) {
        var payload = _ref7.payload;

        return (0, _extends6.default)({}, state, payload);
      }
    }
  };
};

/**
 * 扩展subscription函数的参数,支持listen方法，方便监听path改变
 *
 * listen函数参数如下:
 * pathReg 需要监听的pathname
 * action 匹配path后的回调函数，action即可以是redux的action,也可以是回调函数
 * listen函数同时也支持对多个path的监听，参数为{ pathReg: action, ...} 格式的对象
 *
 * 示例:
 * subscription({ dispath, history, listen }) {
 *  listen('/user/list', { type: 'fetchUsers'});
 *  listen('/user/query', ({ query, params }) => {
 *    dispatch({
 *      type: 'fetchUsers',
 *      payload: params
 *    })
 *  });
 *  listen({
 *    '/user/list': ({ query, params }) => {},
 *    '/user/query': ({ query, params }) => {},
 *  });
 * }
 */
var enhanceSubscriptions = function enhanceSubscriptions() {
  var subscriptions = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  return (0, _keys2.default)(subscriptions).reduce(function (wrappedSubscriptions, key) {
    wrappedSubscriptions[key] = createWrappedSubscriber(subscriptions[key]);
    return wrappedSubscriptions;
  }, {});

  function createWrappedSubscriber(subscriber) {
    return function (props) {
      var dispatch = props.dispatch,
          history = props.history;


      var listen = function listen(pathReg, action) {
        var listeners = {};
        if ((typeof pathReg === 'undefined' ? 'undefined' : (0, _typeof3.default)(pathReg)) === 'object') {
          listeners = pathReg;
        } else {
          listeners[pathReg] = action;
        }

        history.listen(function (location) {
          var pathname = location.pathname;

          (0, _keys2.default)(listeners).forEach(function (key) {
            var _pathReg = key;
            var _action = listeners[key];
            var match = (0, _pathToRegexp2.default)(_pathReg).exec(pathname);

            if (match) {
              if ((typeof _action === 'undefined' ? 'undefined' : (0, _typeof3.default)(_action)) === 'object') {
                dispatch(_action);
              } else if (typeof _action === 'function') {
                _action((0, _extends6.default)({}, location, { params: match.slice(1) }));
              }
            }
          });
        });
      };

      subscriber((0, _extends6.default)({}, props, { listen: listen }));
    };
  }
};

/**
 * 扩展effect函数中的sagaEffects参数
 * 支持:
 *  put 扩展put方法，支持双参数模式: put(type, payload)
 *  update 扩展自put方法，方便直接更新state数据，update({ item: item});
 *  callWithLoading,
 *  callWithConfirmLoading,
 *  callWithSpinning,
 *  callWithMessage,
 *  callWithExtra
 *  以上函数都支持第三个参数,message = { successMsg, errorMsg }
 */
var enhanceEffects = function enhanceEffects() {
  var effects = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  var wrappedEffects = {};
  (0, _keys2.default)(effects).forEach(function (key) {
    wrappedEffects[key] = _regenerator2.default.mark(function _callee(action, sagaEffects) {
      var extraSagaEffects;
      return _regenerator2.default.wrap(function _callee$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              extraSagaEffects = (0, _extends6.default)({}, sagaEffects, {
                put: createPutEffect(sagaEffects),
                update: createUpdateEffect(sagaEffects),
                callWithLoading: createExtraCall(sagaEffects, { loading: true }),
                callWithConfirmLoading: createExtraCall(sagaEffects, { confirmLoading: true }),
                callWithSpinning: createExtraCall(sagaEffects, { spinning: true }),
                callWithMessage: createExtraCall(sagaEffects),
                callWithExtra: function callWithExtra(serviceFn, args, config) {
                  createExtraCall(sagaEffects, config)(serviceFn, args, config);
                }
              });
              _context2.next = 3;
              return effects[key](action, extraSagaEffects);

            case 3:
            case 'end':
              return _context2.stop();
          }
        }
      }, _callee, this);
    });
  });

  return wrappedEffects;

  function createPutEffect(sagaEffects) {
    var put = sagaEffects.put;

    return _regenerator2.default.mark(function putEffect(type, payload) {
      var action,
          _args3 = arguments;
      return _regenerator2.default.wrap(function putEffect$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              action = { type: type, payload: payload };

              if (_args3.length === 1 && (typeof type === 'undefined' ? 'undefined' : (0, _typeof3.default)(type)) === 'object') {
                action = _args3[0];
              }
              _context3.next = 4;
              return put(action);

            case 4:
            case 'end':
              return _context3.stop();
          }
        }
      }, putEffect, this);
    });
  }

  function createUpdateEffect(sagaEffects) {
    var put = sagaEffects.put;

    return _regenerator2.default.mark(function updateEffect(payload) {
      return _regenerator2.default.wrap(function updateEffect$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              _context4.next = 2;
              return put({ type: 'updateState', payload: payload });

            case 2:
            case 'end':
              return _context4.stop();
          }
        }
      }, updateEffect, this);
    });
  }

  function createExtraCall(sagaEffects) {
    var config = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    var put = sagaEffects.put,
        call = sagaEffects.call;

    return _regenerator2.default.mark(function extraCallEffect(serviceFn, args) {
      var message = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      var result, loading, confirmLoading, spinning, successMsg, errorMsg, key;
      return _regenerator2.default.wrap(function extraCallEffect$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              result = void 0;
              loading = config.loading, confirmLoading = config.confirmLoading, spinning = config.spinning;
              successMsg = message.successMsg, errorMsg = message.errorMsg, key = message.key;

              if (!loading) {
                _context5.next = 6;
                break;
              }

              _context5.next = 6;
              return put({ type: 'showLoading', payload: { key: key } });

            case 6:
              if (!confirmLoading) {
                _context5.next = 9;
                break;
              }

              _context5.next = 9;
              return put({ type: 'showConfirmLoading', payload: { key: key } });

            case 9:
              if (!spinning) {
                _context5.next = 12;
                break;
              }

              _context5.next = 12;
              return put({ type: 'showSpinning', payload: { key: key } });

            case 12:
              _context5.prev = 12;
              _context5.next = 15;
              return call(serviceFn, args);

            case 15:
              result = _context5.sent;

              successMsg && _message2.default.success(successMsg);
              _context5.next = 23;
              break;

            case 19:
              _context5.prev = 19;
              _context5.t0 = _context5['catch'](12);

              errorMsg && _modal2.default.error({ title: errorMsg });
              throw _context5.t0;

            case 23:
              _context5.prev = 23;

              if (!loading) {
                _context5.next = 27;
                break;
              }

              _context5.next = 27;
              return put({ type: 'hideLoading', payload: { key: key } });

            case 27:
              if (!confirmLoading) {
                _context5.next = 30;
                break;
              }

              _context5.next = 30;
              return put({ type: 'hideConfirmLoading', payload: { key: key } });

            case 30:
              if (!spinning) {
                _context5.next = 33;
                break;
              }

              _context5.next = 33;
              return put({ type: 'hideSpinning', payload: { key: key } });

            case 33:
              return _context5.finish(23);

            case 34:
              return _context5.abrupt('return', result);

            case 35:
            case 'end':
              return _context5.stop();
          }
        }
      }, extraCallEffect, this, [[12, 19, 23, 34]]);
    });
  }
};

/**
 * 模型继承方法
 *
 * 如果参数只有一个，则继承默认model
 * @param defaults
 * @param properties
 */
function extend(defaults, properties, service) {
  if (!properties) {
    properties = defaults;
    defaults = null;
  }

  var _properties = properties,
      namespace = _properties.namespace;

  var model = defaults || service ? getServerDefaultModel(namespace, service) : getDefaultModel();
  var modelAssignKeys = ['state', 'subscriptions', 'effects', 'reducers'];

  modelAssignKeys.forEach(function (key) {
    if (key === 'subscriptions') {
      properties[key] = enhanceSubscriptions(properties[key]);
    }
    if (key === 'effects') {
      properties[key] = enhanceEffects(properties[key]);
    }
    (0, _assign2.default)(model[key], properties[key]);
  });

  var initialState = (0, _extends6.default)({}, model.state);

  (0, _assign2.default)(model.reducers, {
    resetState: function resetState() {
      return (0, _extends6.default)({}, initialState);
    }
  });

  return (0, _assign2.default)(model, { namespace: namespace });
}

exports.default = {
  extend: extend
};