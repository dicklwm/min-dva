/** Created by Min on 2017/7/04.  */
import React from 'react';
import moment from 'moment';

export default class EditableCell extends React.Component {

  constructor (props) {
    super(props);
    this.state = {
      value: this.props.value,
      editable: this.props.editable || false,
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleDateChange = this.handleDateChange.bind(this);
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.value!==this.state.value) {
      this.setState({ value: nextProps.value });
    }
    if (nextProps.editable!==this.state.editable) {
      this.setState({ editable: nextProps.editable });
      if (nextProps.editable) {
        this.cacheValue = this.state.value;
      }
    }
    if (nextProps.status && nextProps.status!==this.props.status) {
      if (nextProps.status==='save') {
        if (nextProps.onSave) {
          nextProps.onSave(nextProps.dataIndex, this.state.value, nextProps.record);
        } else {
          console.warn('field中没有定义onSave方法，请检查，如果继承了MEditTable则直接可以使用this.handleEditChange，也可以不用handleEditChange，自定义(key,value,record)=>{}');
        }
      } else if (nextProps.status==='cancel') {
        this.setState({ value: this.cacheValue });
        if (nextProps.onSave) {
          nextProps.onSave(nextProps.dataIndex, this.cacheValue, nextProps.record);
        } else {
          console.warn('field中没有定义onSave方法，请检查，如果继承了MEditTable则直接可以使用this.handleEditChange，也可以不用handleEditChange，自定义(key,value,record)=>{}');
        }
      }
    }
  }

  shouldComponentUpdate (nextProps, nextState) {
    return nextProps.editable!==this.state.editable ||
      nextState.value!==this.state.value ||
      nextProps.value!==this.state.value ||
      nextProps.status!==this.props.status;
  }

  handleChange (e) {
    const { maxLength } = this.props.meta || {};
    const value = typeof e==='object' ? e.target.value : e;
    if (maxLength) {
      if (value.length < maxLength) {
        this.setState({ value });
      }
    } else {
      this.setState({ value });
    }
  }

  handleDateChange (date, dateString) {
    this.setState({ value: dateString });
  }

  makeInput () {
    const { value } = this.state;
    const { children, type, onCheck } = this.props;
    let trueValue, onChange, onPressEnter;
    switch (type) {
      case 'date':
        trueValue = value ? moment(value, 'YYYY-MM-DD') : undefined;
        onChange = this.handleDateChange;
        break;
      case 'datetime':
        trueValue = value ? moment(value, 'YYYY-MM-DD HH:mm:ss') : undefined;
        onChange = this.handleDateChange;
        break;
      default :
        trueValue = value;
        onChange = this.handleChange;
        onPressEnter = onCheck;
        break;
    }

    return React.cloneElement(children, {
      value: trueValue,
      onChange,
      onPressEnter,
    });
  }

  render () {
    const { value, editable } = this.state;
    return (
      <div>
        {
          <div>
            {editable ? this.makeInput() : value || ' '}
          </div>
        }
      </div>
    );
  }
}
