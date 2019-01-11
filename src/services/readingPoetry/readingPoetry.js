import { Promise } from '../../utils/leancloud'
import parseHelper from '../../helpers/parseHelper'

const ParseReadingPoetry = 'ReadingPoetry'

export async function query (params) {
  const {query, current, pageSize, showSizeChanger} = parseHelper.standardQuery(ParseReadingPoetry, params, 'serial', 'name')

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
  return parseHelper.queryAll(ParseReadingPoetry, 'serial')
}

export async function add ({readingPoetry}) {
  return parseHelper.add(readingPoetry, ParseReadingPoetry)
}

export async function update ({readingPoetry}) {
  return parseHelper.update(readingPoetry, ParseReadingPoetry)
}

export async function remove ({readingPoetry}) {
  return parseHelper.remove(readingPoetry, ParseReadingPoetry)
}
