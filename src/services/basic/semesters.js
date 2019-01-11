import { Promise } from '../../utils/leancloud'
import parseHelper from '../../helpers/parseHelper'

const ParseSemester = 'Semester'

export async function query (params) {
  const {query, current, pageSize, showSizeChanger} = parseHelper.standardQuery(ParseSemester, params, 'serial', 'name')

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
  return parseHelper.queryAll(ParseSemester, 'serial')
}

export async function add ({semester}) {
  return parseHelper.add(semester, ParseSemester)
}

export async function update ({semester}) {
  return parseHelper.update(semester, ParseSemester)
}

export async function remove ({semester}) {
  return parseHelper.remove(semester, ParseSemester)
}
