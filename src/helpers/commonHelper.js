/**
 * Created by zhaoyu on Oct 11, 2017.
 * @flow
 */

export default class CommonHelper {
  static transferObjectsToSelectOptionsWithoutID (objects: Array<Object>): Object[] {
    if (!objects) {
      return []
    }
    return objects.map(object => Object.assign({},
      {
        key: object.id,
        value: object.id,
        label: `${object.attributes.fullName || object.attributes.name}`
      })
    )
  }

  static transferObjectsToSelectOptions (objects: Array<Object>): Object[] {
    if (!objects) {
      return []
    }
    return objects.map(object => Object.assign({}, object,
      {
        key: object.id,
        value: object.id,
        label: `${object.name || object.title}(${object.id})`
      })
    )
  }

  static transferUsersToOptionsWithUsername (users: Array<Object>): Object[] {
    if (!users) {
      return []
    }
    return users.map(user => Object.assign({},
      {
        key: user.id,
        value: `${user.attributes.username}`,
        label: `${user.attributes.username}`
      })
    )
  }

  static transferUsersToOptionsWithName (users: Array<Object>): Object[] {
    if (!users) {
      return []
    }
    return users.map(user => Object.assign({},
      {
        key: user.id,
        value: `${user.attributes.name}`,
        label: `${user.attributes.name}`
      })
    )
  }

  static transferObjectsToFilterOptions (objects: Array<Object>): Object[] {
    if (!objects) {
      return []
    }
    return objects.map(object => Object.assign({},
      {
        text: object.attributes.fullName || object.attributes.name || '',
        value: object.id || object.value
      })
    )
  }

  static displayOptionValue (value, options: Array<Object>): string {
    const option = options.length > 0 && options.find(option => option['value'] === value)
    return option ? option['label'] : ''
  }

  static parseObjectToObject (parseObject: Object): Object {
    if (!parseObject) {
      return {}
    }
    const {id, createdAt, updatedAt} = parseObject
    const obj = {id, createdAt, updatedAt, key: id}
    Object.keys(parseObject.attributes).forEach(
      attribute => obj[attribute] = parseObject.get(attribute)
    )
    return obj
  }

  // for ant design cascader
  static transferObjectsToSelectOptionsWithoutLeaf (objects: Array<Object>): Object[] {
    if (!objects) {
      return []
    }
    return objects.map(object => Object.assign({},
      {
        value: object.value,
        isLeaf: false,
        label: object.label
      })
    )
  }

  static transferObjectsToSelectOptionsWithoutLeafAndName (objects: Array<Object>, selectValue: string, selectName: string): Object[] {
    if (!objects) {
      return []
    }
    return objects.map(object => Object.assign({},
      {
        key: object[selectValue],
        value: object[selectValue],
        isLeaf: false,
        label: `${object.attributes[selectName] }`
      })
    )
  }

  static transferObjectsToSelectOptionsWithoutName (objects: Array<Object>, selectValue: string, selectName: string): Object[] {
    if (!objects) {
      return []
    }
    return objects.map(object => Object.assign({},
      {
        key: object.attributes[selectValue].id,
        value: object.attributes[selectValue].id,
        label: `${object.attributes[selectName]}`
      })
    )
  }
}
