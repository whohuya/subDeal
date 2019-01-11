import { Parse, Promise } from "../../utils/leancloud";
import parseHelper from "../../helpers/parseHelper";

const ParseSubject = "Classroom";

export async function queryAll() {
  // const classroom=Parse.Object.createWithoutData(ParseSubject,'')
  console.log(parseHelper.queryAll(ParseSubject, "serial"));

  return parseHelper.queryAll(ParseSubject, "serial");
}
