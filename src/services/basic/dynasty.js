import { Promise } from '../../utils/leancloud'
import parseHelper from '../../helpers/parseHelper'

const ParseDynasty = 'Dynasty'

export async function query (params) {
  const {query, current, pageSize, showSizeChanger} = parseHelper.standardQuery(ParseDynasty, params, 'serial', 'name')

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
  return parseHelper.queryAll(ParseDynasty, 'serial')
}

export async function add ({dynasty}) {
  return parseHelper.add(dynasty, ParseDynasty)
}

export async function update ({dynasty}) {
  return parseHelper.update(dynasty, ParseDynasty)
}

export async function remove ({dynasty}) {
  return parseHelper.remove(dynasty, ParseDynasty)
}
