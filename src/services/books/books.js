import { Promise } from '../../utils/leancloud'
import parseHelper from '../../helpers/parseHelper'

const ParseBook = 'Book'

export async function query (params) {
  const {query, current, pageSize, showSizeChanger} = parseHelper.standardQuery(ParseBook, params, 'serial', 'name')

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
  return parseHelper.queryAll(ParseBook, 'serial')
}

export async function add ({book}) {
  return parseHelper.add(book, ParseBook)
}

export async function update ({book}) {
  return parseHelper.update(book, ParseBook)
}

export async function remove ({book}) {
  return parseHelper.remove(book, ParseBook)
}
