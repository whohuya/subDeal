import { Promise, Parse } from '../../utils/leancloud'
import parseHelper from '../../helpers/parseHelper'

const ParseStudent = 'Student'

const parsedStudent = (student) => {
  delete student['key']
  let parsedStudent = student.school ? {
    ...student,
    school: Parse.Object.createWithoutData('School', student.school.id || student.school)
  } : {...student}
  parsedStudent = student.user ? {
    ...parsedStudent,
    user: Parse.Object.createWithoutData('User', student.user.id || student.user)
  } : {...parsedStudent}
  return parsedStudent
}

export async function query (params) {
  const {query, current, pageSize, showSizeChanger} = parseHelper.standardQuery(ParseStudent, params, 'serial', 'name')

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
  return parseHelper.queryAll(ParseStudent, 'serial')
}

export async function add ({student}) {
  return parseHelper.update(parsedStudent(student), ParseStudent)
}

export async function update ({student}) {
  // save school info
  return parseHelper.update(parsedStudent(student), ParseStudent)
}

export async function remove ({student}) {
  return parseHelper.remove(student, ParseStudent)
}
