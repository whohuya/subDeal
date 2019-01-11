/**
 * Created by zhaoyu on Mar 8, 2018.
 * done: register, login, requestMobilePhoneVerificationCode, verifyMobilePhone, getCurrentRole,
 * logout todo: register mobile phone
 */

import { Parse, Promise, handleError } from '../../utils/leancloud'
import { maxPageSize } from '../../constants/numbers'
import parseHelper from '../../helpers/parseHelper'

const ParseRole = '_Role'

export async function query (params) {
  const {query, current, pageSize, showSizeChanger} = parseHelper.standardQuery(ParseRole, params, '-createdAt', 'username')

  console.warn('query in services: ', query)
  const [total, list] = await Promise.all([query.count(), query.find()])
  console.warn('total, list', total, list)
  return Promise.resolve({
    list,
    pagination: {
      total,
      current,
      pageSize,
      showSizeChanger
    }
  })
}

export async function queryRoleUsers ({role}) {
  const query = role.relation('users')

  console.warn('query in services: ', query)
  const [total, list] = await Promise.all([query.count(), query.find()])
  console.warn('total, list', total, list)
  return Promise.resolve({
    list,
    pagination: {
      total,
      current,
      pageSize,
      showSizeChanger
    }
  })
}

export async function add ({user}) {
  return parseHelper.add(user, ParseRole)
}

export async function update ({user}) {
  return parseHelper.update(user, ParseRole)
}

export async function remove ({user}) {
  return parseHelper.remove(user, ParseRole)
}

export async function search ({username = ''}) {
  console.log('in user search: ', username)
  const query = new Parse.Query(ParseRole)
  query.limit(maxPageSize)

  // handle search
  query.contains('username', username)

  try {
    return await query.find()
  } catch (e) {
    console.log('shits happens during users search:')
    console.log(e)
    handleError(e)
  }
}
