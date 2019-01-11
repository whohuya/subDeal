import { Promise, Parse } from '../../utils/leancloud'
import parseHelper from '../../helpers/parseHelper'
import { maxPageSize } from '../../constants/numbers'

const ParseTeacher = 'Teacher'

const parsedTeacher = (teacher) => {
  delete teacher['key']
  let parsedTeacher= teacher.school ? {...teacher, school: Parse.Object.createWithoutData('School', teacher.school.id || teacher.school)} : {...teacher}
  parsedTeacher = teacher.user ? {...parsedTeacher, user: Parse.Object.createWithoutData('User', teacher.user.id || teacher.user)} : {...parsedTeacher}
  return parsedTeacher
}

export async function query (params) {
  const {query, current, pageSize, showSizeChanger} = parseHelper.standardQuery(ParseTeacher, params, 'serial', 'name')

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
  return parseHelper.queryAll(ParseTeacher, 'serial')
}

export async function add ({teacher}) {
  return parseHelper.update(parsedTeacher(teacher), ParseTeacher)
}

export async function update ({teacher}) {
  // save school info
  console.log(teacher)
  return parseHelper.update(parsedTeacher(teacher), ParseTeacher)
}

export async function remove ({teacher}) {
  return parseHelper.remove(teacher, ParseTeacher)
}

export async function search ({name = ''}) {
  console.log('in teacher search: ', name)
  const query = new Parse.Query(ParseTeacher)
  query.limit(maxPageSize)

  // handle search
  query.contains('name', name)

  try {
    return await query.find()
  } catch (e) {
    console.log('shits happens during users search:')
    console.log(e)
    handleError(e)
  }
}
