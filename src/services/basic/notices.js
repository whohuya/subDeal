import { Promise } from "../../utils/leancloud";
import parseHelper from "../../helpers/parseHelper";

const ParseNotice = "Notice";

export async function query(params) {
  const {
    query,
    current,
    pageSize,
    showSizeChanger
  } = parseHelper.standardQuery(ParseNotice, params, "serial", "title");

  // console.warn('query in services: ', query)
  const [total, list] = await Promise.all([query.count(), query.find()]);
  // console.warn('total, list', total, list)
  return Promise.resolve({
    list,
    pagination: {
      total,
      current,
      pageSize,
      showSizeChanger
    }
  });
}

export async function queryAll() {
  return parseHelper.queryAll(ParseNotice, "serial");
}

export async function add({ notice }) {
  return parseHelper.add(notice, ParseNotice, "Admin");
}

export async function update({ notice }) {
  return parseHelper.update(notice, ParseNotice);
}

export async function remove({ notice }) {
  return parseHelper.remove(notice, ParseNotice);
}
