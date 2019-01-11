export default class commonHelper {
  static parseObjectToObject(parseObject) {
    if (!parseObject) {
      return null;
    }
    const { id, createdAt, updatedAt } = parseObject;
    const obj = { id, createdAt, updatedAt, key: id };
    Object.keys(parseObject.attributes).forEach(
      attribute => (obj[attribute] = parseObject.get(attribute))
    );
    return obj;
  }

  static parseObjectArrayToObjectArray(parseObjectArray) {
    if (!parseObjectArray) {
      return [];
    }
    const objectArray = [];
    parseObjectArray.forEach(parseObject => {
      objectArray.push(this.parseObjectToObject(parseObject));
    });
    return objectArray;
  }
}
