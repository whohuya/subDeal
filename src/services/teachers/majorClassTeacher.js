import { Promise, Parse } from '../../utils/leancloud'
import parseHelper from '../../helpers/parseHelper'

const ParseMajorClassTeacher = 'MajorClassTeacher'

const parsedMajorClassTeacher = (majorClassTeacher) => {
  const getSchool = Parse.Object.createWithoutData('School', majorClassTeacher.school)
  const getMajorClass = Parse.Object.createWithoutData('MajorClass', majorClassTeacher.majorClass)
  const getSubject = Parse.Object.createWithoutData('Subject', majorClassTeacher.subject)
  const getTeacher = Parse.Object.createWithoutData('Teacher', majorClassTeacher.teacher.id || majorClassTeacher.teacher)
  return {
    ...majorClassTeacher,
    school: getSchool,
    majorClass: getMajorClass,
    subject: getSubject,
    teacher: getTeacher,
  }
}

export async function query (params) {
  const {query, current, pageSize, showSizeChanger} = parseHelper.standardQuery(ParseMajorClassTeacher, params, 'serial', 'name')

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
  return parseHelper.queryAll(ParseMajorClassTeacher, 'serial')
}

export async function add ({majorClassTeacher}) {
  return parseHelper.update(parsedMajorClassTeacher(majorClassTeacher), ParseMajorClassTeacher)
}

export async function update ({majorClassTeacher}) {
  // save school info
  return parseHelper.update(parsedMajorClassTeacher(majorClassTeacher), ParseMajorClassTeacher)
}

export async function remove ({majorClassTeacher}) {
  return parseHelper.remove(majorClassTeacher, ParseMajorClassTeacher)
}

export async function select (payload) {
  console.log(payload)
  return parseHelper.select(payload, ParseMajorClassTeacher)
}

