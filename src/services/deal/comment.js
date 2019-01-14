/**
 * Created by zhaoyu on Mar 8, 2018.
 * done: register, login, requestMobilePhoneVerificationCode, verifyMobilePhone, getCurrentUser,
 * test git flow
 * logout todo: register mobile phone
 */

import { Parse, Promise, handleError } from '../../utils/leancloud'
import { setAuthority } from '../../utils/authority'

export async function query (payload) {
  const {id} = payload
  try {
    const query = new Parse.Query('Comments')
    query.equalTo('GoodsId', id)
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

export async function add (payload) {
  const {author,content,id,name} = payload
  console.log(payload)
  try {
    const Comment = Parse.Object.extend('Comments')
    const comments=new Comment()
   comments.set('GoodsId',id)
    comments.set('author',author)
    comments.set('content',content)
    const targetStarName = Parse.Object.createWithoutData('_User', name)
    comments.set('name',targetStarName)
    const response = await comments.save()
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
