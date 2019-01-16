/**
 * Created by zhaoyu on Mar 8, 2018.
 * done: register, login, requestMobilePhoneVerificationCode, verifyMobilePhone, getCurrentUser,
 * test git flow
 * logout todo: register mobile phone
 */

import { Parse, Promise, handleError } from '../../utils/leancloud'
import { setAuthority } from '../../utils/authority'

export async function queryCarousel () {
  try {
    const query = new Parse.Query('carousel')
    const response = await query.find()
    return response
  } catch (e) {
    handleError(e)
    return Promise.resolve({
      status: 'fail'
    })
  }
}

export async function queryAllGoods () {
  try {
    const query = new Parse.Query('Goods')
    query.notEqualTo('sold',true)
    query.include('sellName')
    query.descending('createdAt')
    const response = await query.find()
    return response
  } catch (e) {
    handleError(e)
    return Promise.resolve({
      status: 'fail'
    })
  }
}

export async function query (payload) {
  try {
    const {id} = payload
    const query = new Parse.Query('Goods')
    query.include('sellName')
    const response = await query.get(id)
    return response
  } catch (e) {
    handleError(e)
    return Promise.resolve({
      status: 'fail'
    })
  }
}

export async function find (payload) {
  try {
    const {type} = payload
    const query = new Parse.Query('Goods')
    query.equalTo('type', type)
    query.include('sellName')
    query.descending('createdAt')
    const response = await query.find()
    return response
  } catch (e) {
    handleError(e)
    return Promise.resolve({
      status: 'fail'
    })
  }
}

