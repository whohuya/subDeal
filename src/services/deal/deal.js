/**
 * Created by zhaoyu on Mar 8, 2018.
 * done: register, login, requestMobilePhoneVerificationCode, verifyMobilePhone, getCurrentUser,
 * test git flow
 * logout todo: register mobile phone
 */

import { Parse, Promise, handleError } from '../../utils/leancloud'
import { setAuthority } from '../../utils/authority'
import comment from '../../models/dashboard/comment'

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
    query.notEqualTo('sold', true)
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

export async function add (payload) {
  try {
    console.log('payload', payload)
    const {imgName, file,isDiscuss,place,price,title,type,wear,user,describe} = payload
    const img = new Parse.File(imgName, file)
    const res = await img.save()
    const Comment = Parse.Object.extend('Goods')
    const targetSellName = Parse.Object.createWithoutData('_User', user)
    const comments = new Comment();
    comments.set('img',res)
    comments.set('title',title)
    comments.set('wear',wear)
    comments.set('place',place)
    comments.set('isDiscuss',isDiscuss)
    comments.set('type',type)
    comments.set('describe',describe)
    comments.set('price',price)
    comments.set('sellName',targetSellName)
    const response = await comments.save();
    console.log(response)
    return response
  } catch (e) {
    handleError(e)
    console.log(e)
    return Promise.resolve({
      status: 'fail'
    })
  }
}

