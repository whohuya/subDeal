/**
 * Created by zhaoyu on Mar 8, 2018.
 * done: register, login, requestMobilePhoneVerificationCode, verifyMobilePhone, getCurrentUser,
 * test git flow
 * logout todo: register mobile phone
 */

import { Parse, Promise, handleError } from '../../utils/leancloud'
import { setAuthority } from '../../utils/authority'

export async function queryStar (payload) {
  const {id, user} = payload
  try {
    const query = new Parse.Query('star')

    query.equalTo('Goods', id)
    query.equalTo('name', user)
    const response = await query.find()
    return response
  } catch (e) {
    handleError(e)
    return Promise.resolve({
      status: 'fail'
    })
  }
}
export async function fetchUserStar (payload) {
  const {id}=payload
  try {
    const query=new Parse.Query('star')
    const targetStarName = Parse.Object.createWithoutData('_User', id)
    query.equalTo('starName',targetStarName)
    query.include('starName')
    query.include('starGoods')
    query.descending('createdAt')
    const response = await query.find()
      return response
  }catch(e){
    handleError(e)
    return Promise.resolve({
      status: 'fail'
    })
  }
}
export async function add (payload) {
  const {id, user} = payload
  try {
    const starObject = Parse.Object.extend('star')
    const starItem=new starObject()
    starItem.set('name', user)
    starItem.set('Goods', id)
    const targetStarName = Parse.Object.createWithoutData('_User', user)
    const targetStarGoods = Parse.Object.createWithoutData('Goods', id)
    starItem.set('starName', targetStarName)
    starItem.set('starGoods', targetStarGoods)
    const response = await starItem.save()
    return Promise.resolve({
      status: 'ok',
      response
    })

  } catch (e) {
    handleError(e)
    console.log(e)
    return Promise.resolve({
      status: 'fail'
    })
  }
}

export async function cancel (payload) {
  const {id,user} = payload
  console.log(payload)
  try {
    const query = new Parse.Query('star')
    query.equalTo('Goods', id)
    query.equalTo('name', user)
    const res = await query.find()

   const del=Parse.Object.createWithoutData('star',res[0].id)
    const response=await  del.destroy()
    return Promise.resolve({
      status: 'ok',
      response
    })
  } catch (e) {
    handleError(e)
    console.log(e)
    return Promise.resolve({
      status: 'fail'
    })
  }
}
