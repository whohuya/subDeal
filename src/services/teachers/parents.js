import { Promise, Parse } from '../../utils/leancloud'
import parseHelper from '../../helpers/parseHelper'

const ParseParent = 'Parent'

const parsedParent = (parent) => {
  delete parent['key']
  let parsedParent = parent.school ? {
    ...parent,
    school: Parse.Object.createWithoutData('School', parent.school.id || parent.school)
  } : {...parent}
  parsedParent = parent.user ? {
    ...parsedParent,
    user: Parse.Object.createWithoutData('User', parent.user.id || parent.user)
  } : {...parsedParent}
  return parsedParent
}

export async function query (params) {
  const {query, current, pageSize, showSizeChanger} = parseHelper.standardQuery(ParseParent, params, 'serial', 'name')

  const [total, list] = await Promise.all([query.count(), query.find()])
  // console.warn('total, list', total, list)
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

export async function queryAll () {
  return parseHelper.queryAll(ParseParent, 'serial')
}

export async function add ({parent}) {
  return parseHelper.update(parsedParent(parent), ParseParent)
}

export async function update ({parent}) {
  // save school info
  return parseHelper.update(parsedParent(parent), ParseParent)
}

export async function remove ({parent}) {
  return parseHelper.remove(parent, ParseParent)
}
