/*
 * Created by zhaoyu on Mar 13, 2018.
 * files could only be saved/query, not updated
 */
import { Parse, Promise } from '../utils/leancloud'

export async function save ({uri, filename = 'noname'}) {
  const file = new Parse.File(filename, {blob: {uri}})
  // return file Parse object
  try {
    return file.save()
  } catch (e) {
    console.error('shits happened during parse file save: ', e)
    return Promise.reject(e)
  }
}

export async function get ({id}) {
  // return file Parse object
  try {
    const file = Parse.File.createWithoutData(id)
    console.log('file got:')
    console.log(file)
    return file.fetch()
  } catch (e) {
    console.error('shits happened during parse file get: ', e)
    return Promise.reject(e)
  }
}
