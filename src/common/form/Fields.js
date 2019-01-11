/**
 * Created by zhaoyu on July 7, 2017.
 */
import moment from "moment";
import {
  DatePicker,
  TimePicker,
  Input,
  InputNumber,
  Checkbox,
  Radio,
  Switch,
  Cascader,
  Upload,
  Slider,
  TreeSelect
} from "antd";
import { SelectField as Select } from "./selectFields";
import { AutoCompleteField as AutoComplete } from "./autoCompleteFields";
// import * as colors from '../../../constants/colors'

import createComponent, {
  mapMetaInput,
  combineReduxProps
} from "./BaseComponent";

moment.locale("zh-cn");

const { TextArea } = Input;
const { RangePicker, MonthPicker } = DatePicker;

const defaultTo = (value, d) => {
  if (!value && value !== 0) {
    return d;
  }
  return value;
};

const eventMap = combineReduxProps(({ input: { onChange } }) => ({
  onChange: v => onChange(v.target.value)
}));

const textFieldMap = combineReduxProps(({ input: { onChange } }) => ({
  onChange: v => onChange(v.nativeEvent.target.value)
}));

const sliderMap = combineReduxProps(
  ({ input: { onChange, value = 0 }, range, min = 0, max = 100 }) => {
    value = defaultTo(value, range ? [min, max] : 0);
    return { onAfterChange: onChange, value };
  }
);

const dateFieldMap = combineReduxProps(
  ({ input: { onChange, value }, dateTimeFormat }) => {
    if (value === "") {
      value = null;
    } else {
      value = moment(value);
    }
    return {
      onChange: (e, v) => onChange(v),
      value,
      format: dateTimeFormat
    };
  }
);

const timeFieldMap = combineReduxProps(
  ({ input: { value }, dateTimeFormat }) => {
    if (value === "") {
      value = null;
    } else {
      value = moment(value);
    }
    return {
      value,
      format: dateTimeFormat
    };
  }
);

const rangeFieldMap = combineReduxProps(
  ({ input: { value }, dateTimeFormat }) => {
    if (value === "") {
      value = [];
    } else {
      value = [moment(value[0]), moment(value[1])];
    }
    return {
      value,
      format: dateTimeFormat
    };
  }
);

const selectFieldMap = combineReduxProps(
  ({ input: { value }, mode, options }) => {
    // if (options && options.length > 0) {
    //   value = value || (mode === 'multiple' ? [options[0].value] : options[0].value)
    // }
    // console.log('input value:', value, mode, options)
    // console.log('value type:', typeof value)
    const newValue = value === "" && mode === "multiple" ? [] : value;
    // console.log('new value and its type:', newValue, typeof newValue)
    return {
      dropdownMatchSelectWidth: true,
      value: newValue,
      style: { minWidth: 200 }
    };
  }
);

const switchFieldMap = combineReduxProps(({ input: { value } }) => {
  return { value: value, checked: value || false };
});

const autoCompleteFieldMap = combineReduxProps(
  ({ input: { value, text }, dataSource }) => {
    if (value) {
      const valueData = dataSource.find(data => data.value === value);
      text = valueData ? valueData.text : value;
      dataSource = dataSource.filter(data => data.text.indexOf(value) >= 0);
    }
    return { dataSource, value, text, style: { minWidth: 200 } };
  }
);

const treeSelectFieldMap = combineReduxProps(({ input: { value } }) => {
  // value = duplicateArrayToUnique(value)
  return { value, style: { minWidth: 200 } };
});

const cascaderFieldMap = combineReduxProps(({ input: { value } }) => {
  // value = duplicateArrayToUnique(value)
  return { value, style: { minWidth: 200 } };
});

const numberFieldMap = combineReduxProps(({ input: { value } }) => {
  // value = duplicateArrayToUnique(value)
  return { value: value && parseFloat(value), style: { minWidth: 160 } };
});

export const TextField = createComponent(Input, textFieldMap);
export const TextAreaField = createComponent(TextArea, textFieldMap);
export const NumberField = createComponent(InputNumber, numberFieldMap);
// export const NumberField = createComponent(InputNumber, mapMetaInput)
export const CheckboxField = createComponent(Checkbox, eventMap);
export const UploadField = createComponent(Upload, eventMap);
export const RadioField = createComponent(Radio, eventMap);
export const SwitchField = createComponent(Switch, switchFieldMap);
export const SliderField = createComponent(Slider, sliderMap);
export const DateField = createComponent(DatePicker, dateFieldMap);
export const TimeField = createComponent(TimePicker, timeFieldMap);
export const RangeField = createComponent(RangePicker, rangeFieldMap);
export const SelectField = createComponent(Select, selectFieldMap);
export const AutoCompleteField = createComponent(
  AutoComplete,
  autoCompleteFieldMap
);
export const TreeSelectField = createComponent(TreeSelect, treeSelectFieldMap);
export const CascaderField = createComponent(Cascader, cascaderFieldMap);
