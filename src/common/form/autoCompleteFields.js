/**
 * Created by zhaoyu on July 9, 2017.
 */

import React from 'react'
import { Select, Radio, AutoComplete } from 'antd'

const Option = Select.Option
const RadioGroup = Radio.Group
const RadioButton = Radio.Button

const withOptions = (OptionType, getType) => Component => ({
  dataSource,
  ...props
}) => {
  if (getType) {
    OptionType = getType(props)
  }
  return (
    <Component {...props}>
      {dataSource.map(({ text, value, ...rest }, key) => (
        <OptionType {...rest} key={key} value={value}>{text}</OptionType>
      ))}
    </Component>
  )
}

export const RadioField = withOptions(
  Option,
  ({ button }) => (button ? RadioButton : Radio)
)(RadioGroup)
export const AutoCompleteField = withOptions(Option)(AutoComplete)
