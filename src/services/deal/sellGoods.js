/**
 * Created by zhaoyu on Mar 8, 2018.
 * done: register, login, requestMobilePhoneVerificationCode, verifyMobilePhone, getCurrentUser,
 * test git flow
 * logout todo: register mobile phone
 */

import { Parse, Promise, handleError } from "../../utils/leancloud";
import { setAuthority } from "../../utils/authority";

export async function queryBySellName(payload) {
  const { id } = payload;
  try {
    const query = new Parse.Query("Goods");
    const targetSellName = Parse.Object.createWithoutData("_User", id);
    query.equalTo("sellName", targetSellName);
    query.notEqualTo("sold", true);
    query.descending("createdAt");
    const response = await query.find();
    return response;
  } catch (e) {
    handleError(e);
    return Promise.resolve({
      status: "fail"
    });
  }
}

export async function queryByReplay(payload) {
  const { id } = payload;
  try {
    const query = new Parse.Query("Goods");
    const targetSellName = Parse.Object.createWithoutData("_User", id);
    query.equalTo("sellName", targetSellName);
    query.equalTo("sold", true);
    query.descending("createdAt");
    const response = await query.find();
    return response;
  } catch (e) {
    handleError(e);
    return Promise.resolve({
      status: "fail"
    });
  }
}

export async function add(payload) {
  const { author, content, id, name } = payload;
  try {
    const Comment = Parse.Object.extend("Comments");
    const comments = new Comment();
    comments.set("GoodsId", id);
    comments.set("author", author);
    comments.set("content", content);
    const targetStarName = Parse.Object.createWithoutData("_User", name);
    const targetGoods = Parse.Object.createWithoutData("Goods", id);
    comments.set("Goods", targetGoods);
    comments.set("name", targetStarName);
    const response = await comments.save();

    return Promise.resolve({
      status: "ok",
      response
    });
  } catch (e) {
    handleError(e);
    console.log(e);
    return Promise.resolve({
      status: "fail"
    });
  }
}

export async function update (payload) {
  try {
    const {id,title,price,wear,describe} = payload
    const goods=Parse.Object.createWithoutData('Goods',id)
   goods.set('title',title)
   goods.set('price',price )
   goods.set('wear',wear)
   goods.set('describe',describe)
    await goods.save();
    return Promise.resolve({
      status: 'ok',
    })
  } catch (e) {
    handleError(e)
    console.log(e)
    return Promise.resolve({
      status: 'fail'
    })
  }
}

export async function replay (payload) {
  try {
    const {id} = payload
    const goods=Parse.Object.createWithoutData('Goods',id)
    goods.set('sold',false)
   await goods.save();
    return Promise.resolve({
      status: 'ok',
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
  try {
    const {id} = payload
    const goods=Parse.Object.createWithoutData('Goods',id)
    goods.set('sold',true)
   await goods.save();
    return Promise.resolve({
      status: 'ok',
    })
  } catch (e) {
    handleError(e)
    console.log(e)
    return Promise.resolve({
      status: 'fail'
    })
  }
}

