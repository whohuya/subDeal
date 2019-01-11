import { Promise, Parse } from '../../utils/leancloud'
import parseHelper from '../../helpers/parseHelper'

const ParseMajorClass = 'MajorClass'

const parsedMajorClass = (majorClass) => {
  delete majorClass['key']
  let parsedMajorClass = majorClass.school ? {
    ...majorClass,
    school: Parse.Object.createWithoutData('School', majorClass.school.id || majorClass.school)
  } : {...majorClass}
  parsedMajorClass = majorClass.adviser ? {
    ...parsedMajorClass,
    adviser: Parse.Object.createWithoutData('Teacher', majorClass.adviser.id || majorClass.adviser)
  } : {...parsedMajorClass}
  return parsedMajorClass
}

export async function query (params) {
  const {query, current, pageSize, showSizeChanger} = parseHelper.standardQuery(ParseMajorClass, params, 'serial', 'name')

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
  return parseHelper.queryAll(ParseMajorClass, 'serial')
}

export async function add ({majorClass}) {
  return parseHelper.update(parsedMajorClass(majorClass), ParseMajorClass)
}

export async function update ({majorClass}) {
  // save school info
  return parseHelper.update(parsedMajorClass(majorClass), ParseMajorClass)
}

export async function remove ({majorClass}) {
  return parseHelper.remove(majorClass, ParseMajorClass)
}

export async function select (payload) {
  console.log(payload)
  return parseHelper.select(payload, ParseMajorClass)
}

