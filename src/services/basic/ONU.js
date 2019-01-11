import { Promise } from "../../utils/leancloud";
import parseHelper from "../../helpers/parseHelper";

const ParseNotice = "ONU";

export async function query(params) {
  const {
    query,
    current,
    pageSize,
    showSizeChanger
  } = parseHelper.standardQuery(ParseNotice, params, "serial", "sn");
  const [total, list] = await Promise.all([query.count(), query.find()]);

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

export async function add({ ONU }) {
  return parseHelper.add(ONU, ParseNotice, "Admin");
}

export async function update({ ONU }) {
  return parseHelper.update(ONU, ParseNotice);
}

export async function remove({ ONU }) {
  return parseHelper.remove(ONU, ParseNotice);
}
