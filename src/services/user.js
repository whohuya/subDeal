import request from '../utils/request';
import { Parse, Promise, handleError } from '../utils/leancloud'

export async function query() {
  return request('/api/users');
}

export async function queryCurrent() {
  const user = await Parse.User.current();
  return user;
}
