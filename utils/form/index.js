import moment from 'moment';
import { default as fieldTypes, combineTypes } from './fieldTypes';

/*
 * 获取date数据的时间戳
 */
const getDateValue = (value, defaultValue = undefined) => {
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
const getFields = (originFields, fieldKeys, extraFields) => {
  const chain = {};
  let fields = [...originFields];

  const pick = (keys) => {
    keys = [].concat(keys);
    fields = keys.map((key) => {
      let field = fields.find(item => key === item.key);
      if (!field) {
        // 如果field不存在，则默认类型的field
        field = {
          key,
          name: key,
        };
      }
      return field;
    });
    return chain;
  };

  const excludes = (keys) => {
    keys = [].concat(keys);
    fields = fields.filter(field => !keys.includes(field.key));
    return chain;
  };

  const enhance = (_extraFields) => {
    if (!Array.isArray(_extraFields)) {
      _extraFields = Object.keys(_extraFields).map((key) => {
        return Object.assign(_extraFields[key], {
          key,
        });
      });
    }
    _extraFields.forEach((extraField) => {
      const field = fields.find(item => item.key === extraField.key);
      if (field) {
        Object.assign(field, extraField);
      } else {
        fields.push(extraField);
      }
    });
    return chain;
  };

  const values = () => {
    return fields;
  };

  const toMapValues = () => {
    return fields.reduce((map, field) => {
      map[field.key] = field;
      return map;
    }, {});
  };

  const mixins = (keys) => {
    keys = [].concat(keys);
    fields = keys.map((key) => {
      let field;
      if (typeof key === 'string') {
        field = fields.find(item => key === item.key) || { key };
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

  return Object.assign(chain, {
    pick,
    excludes,
    enhance,
    values,
    toMapValues,
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

const createFieldDecorator = (field, item, getFieldDecorator, placeholder = '', inputProps = {}, decoratorOpts = {}) => {
  // field里面有以下元素
  // type 数据类型，渲染成什么样子，不填则默认为text，不填但有enums属性，则为enum
  // rules 验证规则
  // key 主键，绑定的id
  // enums 枚举类型，如：{0: '男',1: '女'}
  // meta 额外的数据，如InputNumber的min,max属性，textarea里面的rows等
  // required 是否必填，如果不设置rules则默认在rules上添加必填规则
  // render 自定义渲染规则，如果不想用定义好的类型渲染出来，可以自定义render方法，render属性应该定义为render:({initialValue,...以下参数})=>{...}
  let { type, rules } = field;
  const { key, enums, meta, required, render } = field;
  // 判断是否存在type属性，如果存在，则判断在fieldTypes里面存不存在，存在就用原有的type，不存在就判断是否存在enums，存在则是enum，都不存在则默认为text
  type = (fieldTypes.hasOwnProperty(type) && type) || (enums && 'enum') || 'text';
  // 如果存在render属性，直接用render来做渲染，render属性应该定义为render:({initialValue,...以下参数})=>{...}
  // 不存在render属性，则使用fieldTypes里面已经定义好的类型进行render
  const typedItem = (render || fieldTypes[type])({ initialValue: item[key], meta, field, inputProps, placeholder });
  let { input, initialValue } = typedItem;
  // 判断是不是一个有效的React元素，用于截取input和初始化值，传给antd的form.getFieldDecorator方法
  if (React.isValidElement(typedItem)) {
    input = typedItem;
    initialValue = item[key];
  }
  // 如果存在必填项，默认在rules上加入require，如果已经写了rules的话，则不加入，需要手动加入，即写了required，需要再写rules
  if (required && !rules) {
    rules = [{
      required: true,
      message: `请输入${field.name}`,
    }];
  }

  return getFieldDecorator(key, { initialValue, rules, inputProps, ...decoratorOpts })(input);
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
const validate = (form) => {
  const { validateFields, getFieldsValue } = form;
  // 将date类型的数据，转换成Date数据
  const transformValues = (values) => {
    const newValues = {};
    Object.keys(values).forEach((key) => {
      const value = values[key];
      const isDateTimeType = value && value instanceof moment;
      const newValue = isDateTimeType ? getDateValue(values[key]) : values[key];
      // 如果value为undefined,则不赋值到values对象上
      if (newValue !== undefined) {
        newValues[key] = newValue;
      }
    });
    return newValues;
  };

  return (onSuccess, onError) => {
    validateFields((errors) => {
      if (errors) {
        if (onError) {
          onError(errors);
        }
      } else {
        const originValues = { ...getFieldsValue() };
        onSuccess(transformValues(originValues), originValues);
      }
    });
  };
};

export default {
  fieldTypes,
  combineTypes,
  getFields,
  validate,
  getDateValue,
  createFieldDecorator,
};

