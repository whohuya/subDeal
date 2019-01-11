import { Promise, Parse } from '../../utils/leancloud'
import parseHelper from '../../helpers/parseHelper'

const ParseMajorClassParent = 'MajorClassParent'

const parsedMajorClassParent = (majorClassParent) => {

  const getStudent = Parse.Object.createWithoutData('Student', majorClassParent.student.id || majorClassParent.student)
  const getMajorClass = Parse.Object.createWithoutData('MajorClass', majorClassParent.majorClass.id || majorClassParent.majorClass)
  const getParent = Parse.Object.createWithoutData('Parent', majorClassParent.parent.id || majorClassParent.parent)
  return {
    ...majorClassParent,
    student: getStudent,
    majorClass: getMajorClass,
    parent: getParent
  }
}

export async function query (params) {
  const {query, current, pageSize, showSizeChanger} = parseHelper.standardQuery(ParseMajorClassParent, params, 'serial', 'name')

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
  return parseHelper.queryAll(ParseMajorClassParent, 'serial')
}

export async function add ({majorClassParent}) {
  return parseHelper.update(parsedMajorClassParent(majorClassParent), ParseMajorClassParent)
}

export async function update ({majorClassParent}) {
  // save school info
  return parseHelper.update(parsedMajorClassParent(majorClassParent), ParseMajorClassParent)
}

export async function remove ({majorClassParent}) {
  return parseHelper.remove(majorClassParent, ParseMajorClassParent)
}

export async function select (payload) {
  console.log(payload)
  return parseHelper.select(payload, ParseMajorClassParent)
}

