/**
 * Created by zhaoyu on Sep 27, 2017.
 * @flow
 */
import React from 'react'

import * as Fa from 'react-icons/lib/fa'
// import * as Md from 'react-icons/lib/md'
// import * as Ti from 'react-icons/lib/ti'
// import * as Go from 'react-icons/lib/go'
import * as colors from '../constants/colors'

export default class IconsHelper {
  static assembleIcon (name: string, size: ?number = 15, color: ?string = colors.blue300): ?Object {
    let icon = null
    const category = name.substr(0, 2)
    switch (category) {
      case 'Fa': {
        icon = Fa[name]
        break
      }
      // case 'Md': {
      //   icon = Md[name]
      //   break
      // }
      // case 'Ti': {
      //   icon = Ti[name]
      //   break
      // }
      // case 'Go': {
      //   icon = Go[name]
      //   break
      // }
      default:
        return null
    }
    if (icon === undefined || icon === null) {
      return null
    }
    return React.createElement(icon, {size, color})
  }
}
