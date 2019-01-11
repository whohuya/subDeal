/**
 * Created by zhaoyu on July 9, 2017.
 */

import React from 'react'
import { Select, Radio } from 'antd'

const Option = Select.Option
const RadioGroup = Radio.Group
const RadioButton = Radio.Button

const withOptions = (OptionType, getType) => Component => ({
  options,
  ...props
}) => {
  if (getType) {
    OptionType = getType(props)
  }
  return (
    <Component {...props}>
      {options.map(({ label, value, ...rest }, key) => (
        <OptionType {...rest} key={key} value={value}>{label}</OptionType>
      ))}
    </Component>
  )
}

export const RadioField = withOptions(
  Option,
  ({ button }) => (button ? RadioButton : Radio)
)(RadioGroup)
export const SelectField = withOptions(Option)(Select)
