import { Parse, Promise } from '../../utils/leancloud'
import { getCurrentUser } from '../auth'
import parseHelper from '../../helpers/parseHelper'

const ParsePresentation = 'Presentation'

export async function query (params) {
  const {query, current, pageSize, showSizeChanger} = parseHelper.standardQuery(ParsePresentation, params, 'updatedAt')

  query.include('file')
  query.equalTo('user', getCurrentUser())

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
  return parseHelper.queryAll(ParsePresentation, 'updatedAt')
}

export async function add ({presentation}) {
  return parseHelper.add(presentation, ParsePresentation)
}

export async function update ({presentation}) {
  return parseHelper.update(presentation, ParsePresentation)
}

export async function remove ({presentation}) {
  return parseHelper.remove(presentation, ParsePresentation)
}

export async function initialize () {
  const latestUpdatedQuery = new Parse.Query('Presentation').addDescending('updatedAt').limit(1).include('file')
  return latestUpdatedQuery.find()
}

export async function subscribeLatestUpdated () {
  const latestUpdatedQuery = new Parse.Query('Presentation').addDescending('updatedAt').limit(1).include('file')
  return latestUpdatedQuery.subscribe()
}

export async function unsubscribeLatestUpdated ({liveQuery}) {
  console.log('unsubscribe: ', liveQuery)
  if (!liveQuery) {
    return null
  }
  return liveQuery.unsubscribe()
}
