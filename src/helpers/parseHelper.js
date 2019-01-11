/**
 * Created by zhaoyu on Jan 19, 2018.
 * @flow
 */
import { Parse, Promise } from "../utils/leancloud";
import { maxPageSize, defaultPagination } from "../constants/numbers";

export default class ParseHelper {
  static standardQuery(
    parseObjectName: string,
    params: Object,
    sortField: string = "",
    searchFieldName: string = ""
  ) {
    // console.log('in parse helper')
    // console.warn(params, sortField)
    const { pagination, sorter, search } = params;
    const query = new Parse.Query(parseObjectName);
    const includes = params.includes ? params.includes : [];
    // handle pagination
    const { pageSize, current, showSizeChanger } =
      pagination || defaultPagination;
    query.limit(pageSize);
    query.skip((current - 1) * pageSize);

    if (includes.length > 0) {
      for (let i = 0; i < includes.length; i++) {
        query.include(includes[i]);
      }
    }
    // handle sorter
    if (sorter && sorter.order) {
      if (sorter.order === "ascend") {
        query.addAscending(sorter.columnKey);
      } else {
        query.addDescending(sorter.columnKey);
      }
    } else if (sortField.length > 0) {
      if (sortField[0] === "-") {
        query.addDescending(sortField.slice(1, sortField.length));
      } else {
        query.addAscending(sortField);
      }
    }

    // handle search
    if (search && search.length > 0 && searchFieldName !== "") {
      query.contains(searchFieldName, search);
    }

    // console.warn('query in query:', query, params)
    return { query, current, pageSize, showSizeChanger: showSizeChanger };

    // try {
    //   const [total, list] = await Promise.all([query.count(), query.find()])
    //   // console.warn('total, list', total, list)
    //   return Promise.resolve({
    //     list,
    //     pagination: {
    //       showSizeChanger: params.showSizeChanger || false,
    //       total,
    //       current,
    //       pageSize
    //     }
    //   })
    // } catch (e) {
    //   console.error('shits happened during parse fetch: ', e)
    //   return Promise.reject(e)
    // }
  }

  static async queryAll(parseObjectName: string, sortField: string = "serial") {
    const query = new Parse.Query(parseObjectName);

    // handle pagination
    query.limit(maxPageSize);
    // sort by serial
    query.ascending(sortField);

    try {
      const list = await query.find();
      // console.warn('query all results: ', list)
      return Promise.resolve(list);
    } catch (e) {
      // console.error('shits happened during parse fetchAll: ', e)
      return Promise.reject(e);
    }
  }

  static async add(
    originObject: Object,
    parseObjectName: string,
    roleName = "Admin"
  ) {
    console.log(originObject)
    // console.warn('in parse helper add', originObject, parseObjectName)
    const ParseObject = Parse.Object.extend(parseObjectName);
    const parseObject = new ParseObject();
    const acl = new Parse.ACL();
    // console.warn('before for let loop')
    for (let prop in originObject) {
      // console.warn('in for let loop: ', prop)
      if (!originObject.hasOwnProperty(prop)) {
        continue;
      }

      parseObject.set(prop, originObject[prop]);
    }
    acl.setPublicReadAccess(true);
    acl.setRoleWriteAccess(roleName, true);
    parseObject.setACL(acl);
    // console.warn('in add helper function: ', originObject)
    try {
      return parseObject.save();
    } catch (e) {

      console.log(e)
      // console.error('shits happened during parse add: ', e)
      return Promise.reject(e);
    }
  }

  static async update(originObject: Object, parseObjectName: string) {
    console.log(originObject);
    const parseObject = Parse.Object.createWithoutData(
      parseObjectName,
      originObject.id
    );
    for (let prop in originObject) {
      console.warn("prop", prop);
      if (
        !originObject.hasOwnProperty(prop) ||
        prop === "id" ||
        prop === "createdAt" ||
        prop === "updatedAt"
      ) {
        continue;
      }
      parseObject.set(prop, originObject[prop]);
    }
    // console.warn('in update helper function: ', originObject)
    try {
      return parseObject.save();
    } catch (e) {
      // console.error('shits happened during parse update: ', e)
      return Promise.reject(e);
    }
  }

  static async remove(originObject: Object, parseObjectName: string) {
    const parseObject = Parse.Object.createWithoutData(
      parseObjectName,
      originObject.id
    );
    try {
      return parseObject.destroy();
    } catch (e) {
      // console.error('shits happened during parse destroy: ', e)
      return Promise.reject(e);
    }
  }

  static async subscribeLatestUpdated(
    originObject: Object,
    parseObjectName: string
  ) {
    const parseObject = Parse.Object.createWithoutData(
      parseObjectName,
      originObject.id
    );
    try {
      return parseObject.destroy();
    } catch (e) {
      // console.error('shits happened during parse destroy: ', e)
      return Promise.reject(e);
    }
  }

  static async select(
    originObject: Object,
    parseObjectName: string,
    sortField: string = "serial"
  ) {
    const includes = originObject.includes ? originObject.includes : [];
    const query = new Parse.Query(parseObjectName);
    const findObject = Parse.Object.createWithoutData(
      originObject.className,
      originObject.id
    );
    // handle pagination
    query.equalTo(originObject.name, findObject);
    query.limit(maxPageSize);
    if (includes.length > 0) {
      for (let i = 0; i < originObject.includes.length; i++) {
        query.include(includes[i]);
      }
    }

    // sort by serial
    query.ascending(sortField);

    try {
      const list = await query.find();
      return Promise.resolve(list);
    } catch (e) {
      // console.error('shits happened during parse fetchAll: ', e)
      return Promise.reject(e);
    }
  }
}
