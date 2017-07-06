'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _assign = require('babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

var _toConsumableArray2 = require('babel-runtime/helpers/toConsumableArray');

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

var _fieldTypes = require('./fieldTypes');

var _fieldTypes2 = _interopRequireDefault(_fieldTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * 获取date数据的时间戳
 */
var getDateValue = function getDateValue(value) {
  var defaultValue = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : undefined;

  return value ? value.valueOf() : defaultValue;
};

/**
 * 获取表单field数组
 * 示例:
 * const formFields = getFields(fields,['name','author'],{ name: { rules: []}}).values();
 * const formFields = getFields(fields).excludes(['id','desc']).values();
 * const formFields = getFields(fields).pick(['name','author','openTime']).enhance({name:{ rules: [] }}).values();
 * @param originField 原始fields
 * @param fieldKeys 需要包含的字段keys
 * @param extraFields 扩展的fields
 * @result 链式写法，返回链式对象(包含pick,excludes,enhance,values方法), 需要调用values返回最终的数据
 */
var getFields = function getFields(originFields, fieldKeys, extraFields) {
  var chain = {};
  var fields = [].concat((0, _toConsumableArray3.default)(originFields));

  var pick = function pick(keys) {
    keys = [].concat(keys);
    fields = keys.map(function (key) {
      var field = fields.find(function (item) {
        return key === item.key;
      });
      if (!field) {
        // 如果field不存在，则默认类型的field
        field = {
          key: key,
          name: key
        };
      }
      return field;
    });
    return chain;
  };

  var excludes = function excludes(keys) {
    keys = [].concat(keys);
    fields = fields.filter(function (field) {
      return !keys.includes(field.key);
    });
    return chain;
  };

  var enhance = function enhance(_extraFields) {
    if (!Array.isArray(_extraFields)) {
      _extraFields = (0, _keys2.default)(_extraFields).map(function (key) {
        return (0, _assign2.default)(_extraFields[key], {
          key: key
        });
      });
    }
    _extraFields.forEach(function (extraField) {
      var field = fields.find(function (item) {
        return item.key === extraField.key;
      });
      if (field) {
        (0, _assign2.default)(field, extraField);
      } else {
        fields.push(extraField);
      }
    });
    return chain;
  };

  var values = function values() {
    return fields;
  };

  var toMapValues = function toMapValues() {
    return fields.reduce(function (map, field) {
      map[field.key] = field;
      return map;
    }, {});
  };

  var mixins = function mixins(keys) {
    keys = [].concat(keys);
    fields = keys.map(function (key) {
      var field = void 0;
      if (typeof key === 'string') {
        field = fields.find(function (item) {
          return key === item.key;
        }) || { key: key };
      } else {
        field = key;
      }
      return field;
    });
    return chain;
  };

  if (fieldKeys) {
    mixins(fieldKeys);
  }

  if (extraFields) {
    enhance(extraFields);
  }

  return (0, _assign2.default)(chain, {
    pick: pick,
    excludes: excludes,
    enhance: enhance,
    values: values,
    toMapValues: toMapValues
  });
};

/**
 * 创建antd fieldDecorator
 * @param field 单个的原始的field
 * @param item 定义对应key的初始化值
 * @param getFieldDecorator antd的form.getFieldDecorator方法
 * @param placeholder
 * @param inputProps getFieldDecorator(key,{initialValue, rules, inputProps, ...decoratorOpts })
 * @param decoratorOpts getFieldDecorator(key,{initialValue, rules, inputProps, ...decoratorOpts })
 * @returns {*}
 */

var createFieldDecorator = function createFieldDecorator(field) {
  var item = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var getFieldDecorator = arguments[2];
  var placeholder = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : '';
  var inputProps = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : {};
  var decoratorOpts = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : {};

  // field里面有以下元素
  // type 数据类型，渲染成什么样子，不填则默认为text，不填但有enums属性，则为enum
  // rules 验证规则
  // key 主键，绑定的id
  // enums 枚举类型，如：{0: '男',1: '女'}
  // meta 额外的数据，如InputNumber的min,max属性，textarea里面的rows等
  // required 是否必填，如果不设置rules则默认在rules上添加必填规则
  // render 自定义渲染规则，如果不想用定义好的类型渲染出来，可以自定义render方法，render属性应该定义为render:({initialValue,...以下参数})=>{...}
  var type = field.type,
      rules = field.rules;
  var key = field.key,
      enums = field.enums,
      meta = field.meta,
      required = field.required,
      render = field.render;
  // 判断是否存在type属性，如果存在，则判断在fieldTypes里面存不存在，存在就用原有的type，不存在就判断是否存在enums，存在则是enum，都不存在则默认为text

  type = _fieldTypes2.default.hasOwnProperty(type) && type || enums && 'enum' || 'text';
  // 如果存在render属性，直接用render来做渲染，render属性应该定义为render:({initialValue,...以下参数})=>{...}
  // 不存在render属性，则使用fieldTypes里面已经定义好的类型进行render
  var typedItem = (render || _fieldTypes2.default[type])({ initialValue: item[key], meta: meta, field: field, inputProps: inputProps, placeholder: placeholder });
  var input = typedItem.input,
      initialValue = typedItem.initialValue;
  // 判断是不是一个有效的React元素，用于截取input和初始化值，传给antd的form.getFieldDecorator方法

  if (_react2.default.isValidElement(typedItem)) {
    input = typedItem;
    initialValue = item[key];
  }
  // 如果存在必填项，默认在rules上加入require，如果已经写了rules的话，则不加入，需要手动加入，即写了required，需要再写rules
  if (required && !rules) {
    rules = [{
      required: true,
      message: '\u8BF7\u8F93\u5165' + field.name
    }];
  }

  return getFieldDecorator(key, (0, _extends3.default)({ initialValue: initialValue, rules: rules, inputProps: inputProps }, decoratorOpts))(input);
};

/*
 * 包装antd form validateFields
 * 主要用途自动转换date类型数据，validateFields提供的错误处理大部分情况下都用不到，故提供一个包装函数，简化使用
 * 示例:
 * validate(form, fields)((values) => {
 *     onSave({
 *       ...values,
 *     });
 *  });
 * @param form, antd form对象
 * @param 返回result函数，参数为: onSuccess, onError
 */
var validate = function validate(form) {
  var validateFields = form.validateFields,
      getFieldsValue = form.getFieldsValue;
  // 将date类型的数据，转换成Date数据

  var transformValues = function transformValues(values) {
    var newValues = {};
    (0, _keys2.default)(values).forEach(function (key) {
      var value = values[key];
      var isDateTimeType = value && value instanceof _moment2.default;
      var newValue = isDateTimeType ? getDateValue(values[key]) : values[key];
      // 如果value为undefined,则不赋值到values对象上
      if (newValue !== undefined) {
        newValues[key] = newValue;
      }
    });
    return newValues;
  };

  return function (onSuccess, onError) {
    validateFields(function (errors) {
      if (errors) {
        if (onError) {
          onError(errors);
        }
      } else {
        var originValues = (0, _extends3.default)({}, getFieldsValue());
        onSuccess(transformValues(originValues), originValues);
      }
    });
  };
};

exports.default = {
  fieldTypes: _fieldTypes2.default,
  combineTypes: _fieldTypes.combineTypes,
  getFields: getFields,
  validate: validate,
  getDateValue: getDateValue,
  createFieldDecorator: createFieldDecorator
};