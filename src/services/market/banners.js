import { Promise } from "../../utils/leancloud";
import parseHelper from "../../helpers/parseHelper";

const ParseBanner = "Banner";

export async function query(params) {
  const {
    query,
    current,
    pageSize,
    showSizeChanger
  } = parseHelper.standardQuery(ParseBanner, params, "serial", "name");

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
  return parseHelper.queryAll(ParseBanner, "serial");
}

export async function add({ banner }) {
  return parseHelper.add(banner, ParseBanner, "WarehouseManager");
}

export async function update({ banner }) {
  console.log("service banner");
  console.log(banner);
  return parseHelper.update(banner, ParseBanner);
}

export async function remove({ banner }) {
  return parseHelper.remove(banner, ParseBanner);
}
