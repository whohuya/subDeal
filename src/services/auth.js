/**
 * Created by zhaoyu on Mar 8, 2018.
 * done: register, login, requestMobilePhoneVerificationCode, verifyMobilePhone, getCurrentUser,
 * test git flow
 * logout todo: register mobile phone
 */

import { Parse, Promise, handleError } from '../utils/leancloud'
import { setAuthority } from '../utils/authority'

export async function register ({username, password}) {
  console.log('in user register: ', username, password)
  try {
    const userObj = new Parse.User()
    userObj.setUsername(username)
    userObj.setPassword(password)
    const user = await userObj.signUp()
    console.warn('registered user: ', user)
    return Promise.resolve(user)
  } catch (e) {
    handleError(e)
  }
}

export async function signUpAdmin ({username, password, mail, name,phone}) {
  const user = new Parse.User()
  try {
    user.setUsername(username)
    user.setPassword(password)
    user.setEmail(mail)
    user.set('name', name)
    user.set('phone', phone)
    // const actNew=new Parse.Role('Admin')
    // const relation=actNew.getUsers()
    // relation.add(user.current())
    //   const a =actNew.save()
    const request = await user.signUp()
    return Promise.resolve({
      status: 'ok'
    })

  } catch (err) {
    handleError(err)
    return Promise.resolve({
      status: 'fail'
    })
  }

}

export async function login ({username, password}) {
  console.log('in user login: ', username, password)
  try {
    // 1. login
    const user = await Parse.User.logIn(username, password)
    // 2. get user roles
    const roles = await getCurrentUserRoles()
    // todo: 3. get user profile
    // 登陆成功返回：
    return Promise.resolve({
      roles: roles.length > 0 ? roles : ['Guest'],
      status: 'ok'
    })
  } catch (e) {
    handleError(e)
    return Promise.resolve({
      status: 'fail'
    })
  }
}

export async function resetPassword ({email}) {
  try {
    const response = await Parse.User.requestPasswordReset(email)
    return Promise.resolve({
      status:'ok'
    })
  } catch (e) {
    handleError(e)
    return Promise.resolve({
      status: 'fail'
    })
  }
}

export async function getCurrentUserAsync () {
  try {
    return Parse.User.currentAsync()
  } catch (e) {
    return Promise.resolve({
      status: 'fail'
    })
  }
}

export function getCurrentUser () {
  return Parse.User.current()
}

export async function getCurrentUserRoles () {
  try {
    const rolesArray = (await Parse.User.current().getRoles()) || []
    console.warn('roles in currentUserRoles', rolesArray)
    const roles = rolesArray.map(role => role.attributes.name)

    // 1. set user authority to local storage
    if (roles.indexOf('Root') >= 0) {
      console.warn('get authority Root!')
      setAuthority('Root')
      // setAuthority('admin')
    } else if (roles.indexOf('Admin') >= 0) {
      console.warn('get authority Admin!')
      setAuthority('Admin')
      // setAuthority('admin')
    } else if (roles.length === 0) {
      setAuthority('Admin')
    }
    else {
      // return 'Guest'
      setAuthority('Guest')
      // setAuthority('guest')
    }
    // 2. return roles;
    return roles
  } catch (error) {
    console.warn('get current user roles error: ')
    console.warn(error)
    setAuthority('guest')
    return []
  }
}

export async function requestMobilePhoneVerificationCode ({
  mobilePhoneNumber
}) {
  try {
    await Parse.User.requestMobilePhoneVerify(mobilePhoneNumber)
    return Promise.resolve()
  } catch (e) {
    console.warn('request mobile phone verification code error: ', e)
    return Promise.reject(e)
  }
}

export async function verifyMobilePhone ({code}) {
  try {
    await Parse.User.verifyMobilePhone(code)
    return Promise.resolve()
  } catch (e) {
    console.warn('verify mobile phone error: ', e)
    return Promise.reject(e)
  }
}

export async function logout () {
  try {
    return Promise.resolve(Parse.User.logOut())
  } catch (e) {
    console.warn('logout error: ', e)
    return Promise.reject(e)
  } finally {
    setAuthority('guest')
  }
}
