import { Promise } from '../../utils/leancloud'
import parseHelper from '../../helpers/parseHelper'

const ParseSchool = 'School'

export async function query (params) {
  const {query, current, pageSize, showSizeChanger} = parseHelper.standardQuery(ParseSchool, params, 'serial', 'name')

  console.warn('query in services: ', query)
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
  return parseHelper.queryAll(ParseSchool, 'serial')
}

export async function add ({school}) {
  return parseHelper.add(school, ParseSchool)
}

export async function update ({school}) {
  return parseHelper.update(school, ParseSchool)
}

export async function remove ({school}) {
  return parseHelper.remove(school, ParseSchool)
}
