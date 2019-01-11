import { Promise, Parse } from '../../utils/leancloud'
import parseHelper from '../../helpers/parseHelper'

const ParseReadingBook = 'ReadingBook'

// Parse == AV
const parsedReadingBook = (book) => {
  delete book['key']   //删除参数对象中，ant.design.Table 为每条记录添加的key 属性
    // book.author 存在，
    //    1）string类型：是一条author记录的ID，根据ID查询表将其转成Pointer类型 （期望）
    //    2)Object （结构体） book.author的值 本声就是结构体，Pointer类型
  // let parsedBook =book.author ? {...book, author: Parse.Object.createWithoutData('Author',book.author)||book.author } : {...book}
  //     parsedBook =book.dynasty ? {...book, dynasty: Parse.Object.createWithoutData('Dynasty',book.dynasty)||book.dynasty} : {...parsedBook}

  let parsedBook = {...book, author: Parse.Object.createWithoutData('Author',book.author.id || book.author)}

      return parsedBook
}


export async function query (params) {
  const {query, current, pageSize, showSizeChanger} = parseHelper.standardQuery(ParseReadingBook, params, 'serial', 'name')

  const [total, list] = await Promise.all([query.count(), query.find()])

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
  return parseHelper.queryAll(ParseReadingBook, 'serial')
}

export async function add ({book}) {
  return parseHelper.add(parsedReadingBook(book), ParseReadingBook)
}

export async function update ({book}) {
  //console.log(book)
  const newBook=parsedReadingBook(book)
  console.log(newBook)
  return parseHelper.update(parsedReadingBook(book), ParseReadingBook)
}

export async function remove ({book}) {
  return parseHelper.remove(parsedReadingBook(book), ParseReadingBook)
}

