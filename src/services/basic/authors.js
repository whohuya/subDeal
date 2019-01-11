import { Promise } from '../../utils/leancloud'
import parseHelper from '../../helpers/parseHelper'

const ParseAuthor = 'Author'

const parsedAuthor = (author) => {
  delete author['key']

  return {...author}
}

export async function query (params) {
  const {query, current, pageSize, showSizeChanger} = parseHelper.standardQuery(ParseAuthor, params, 'serial', 'name')

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
  return parseHelper.queryAll(ParseAuthor, 'serial')
}

export async function add ({author}) {
  return parseHelper.add(parsedAuthor(author), ParseAuthor)
}

export async function update ({author}) {
  return parseHelper.update(parsedAuthor(author), ParseAuthor)
}

export async function remove ({author}) {
  return parseHelper.remove(author, ParseAuthor)
}
