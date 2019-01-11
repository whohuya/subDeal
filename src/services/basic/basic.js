import { Promise } from '../../utils/leancloud'
import parseHelper from '../../helpers/parseHelper'

const ParseSubject = 'Basic'

export async function query (params) {
  const {query, current, pageSize, showSizeChanger} = parseHelper.standardQuery(ParseSubject, params, 'serial', 'name')

  // console.warn('query in services: ', query)
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
  return parseHelper.queryAll(ParseSubject, 'serial')
}

export async function add ({basic}) {
  return parseHelper.add(basic, ParseSubject)
}

export async function update ({basic}) {
  return parseHelper.update(basic, ParseSubject)
}

export async function remove ({basic}) {
  return parseHelper.remove(basic, ParseSubject)
}
