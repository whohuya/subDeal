/**
 * Created by zhaoyu on Mar 8, 2018.
 * done: register, login, requestMobilePhoneVerificationCode, verifyMobilePhone, getCurrentUser,
 * logout todo: register mobile phone
 */

import { Parse, Promise, handleError } from '../../utils/leancloud'
import { maxPageSize } from '../../constants/numbers'
import parseHelper from '../../helpers/parseHelper'

const ParseUser = '_User'

export async function query (params) {
  const {query, current, pageSize, showSizeChanger} = parseHelper.standardQuery(ParseUser, params, '-createdAt', 'username')

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
  return parseHelper.add(user, ParseUser)
}

export async function update ({user}) {
  return parseHelper.update(user, ParseUser)
}

export async function remove ({user}) {
  return parseHelper.remove(user, ParseUser)
}

export async function search ({username = ''}) {
  console.log('in user search: ', username)
  const query = new Parse.Query(ParseUser)
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
