import { Promise, Parse } from '../../utils/leancloud'
import parseHelper from '../../helpers/parseHelper'

const ParseMajorClassStudent = 'MajorClassStudent'

const parsedMajorClassStudent = (majorClassStudent) => {
console.log(majorClassStudent)
  const getMajorClass = Parse.Object.createWithoutData('MajorClass', majorClassStudent.majorClass.id || majorClassStudent.majorClass)
  const getStudent = Parse.Object.createWithoutData('Student', majorClassStudent.student.id || majorClassStudent.student)
  console.log({
    ...majorClassStudent,
    majorClass: getMajorClass,
    student: getStudent,
  })
  return {
    ...majorClassStudent,
    majorClass: getMajorClass,
    student: getStudent,
  }
}

export async function query (params) {
  const {query, current, pageSize, showSizeChanger} = parseHelper.standardQuery(ParseMajorClassStudent, params, 'serial', 'name')

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
  return parseHelper.queryAll(ParseMajorClassStudent, 'serial')
}

export async function add ({majorClassStudent}) {
  return parseHelper.update(parsedMajorClassStudent(majorClassStudent), ParseMajorClassStudent)
}

export async function update ({majorClassStudent}) {
  // save school info
  return parseHelper.update(parsedMajorClassStudent(majorClassStudent), ParseMajorClassStudent)
}

export async function remove ({majorClassStudent}) {
  return parseHelper.remove(majorClassStudent, ParseMajorClassStudent)
}

export async function select (payload) {
  console.log(payload)

  return parseHelper.select(payload, ParseMajorClassStudent)
}

