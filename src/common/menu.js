import { isUrl } from "../utils/utils";

const menuData = [
  {
    name: "首页",
    icon: "dashboard",
    path: "dashboard",
    authority: ["Guest", "Admin", "Root"]
  },
  {
    name: "我的收藏",
    icon: "shopping-cart",
    authority: ["Root", "Admin"],
    path: "GoodsStar"
  },
  {
    name: "我的商品",
    icon: "inbox",
    authority: ["Root", "Admin"],
    path: "GoodsList"
  },
  {
    name: "出售商品",
    icon: "sound",
    authority: ["Root", "Admin"],
    path: "AddGoods"
  },


];

function formatter(data, parentPath = "/", parentAuthority) {
  return data.map(item => {
    let { path } = item;
    if (!isUrl(path)) {
      path = parentPath + item.path;
    }
    const result = {
      ...item,
      path,
      authority: item.authority || parentAuthority
    };
    if (item.children) {
      result.children = formatter(
        item.children,
        `${parentPath}${item.path}/`,
        item.authority
      );
    }
    return result;
  });
}

export const getMenuData = () => formatter(menuData);
