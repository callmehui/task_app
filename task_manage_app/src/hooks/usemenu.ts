import { MenuItem, menus } from "@/config/menu";
import { reactive } from "vue";

const leafMenuIds: string[] = [];

/**
 * 通过递归给menus添加id
 * @param list 被递归处理的menu数组
 * @param isChildren true: 是子级菜单项数组，false：不是子级菜单项数组
 * @param parentId 父级菜单id
 */
function recursiveMenus(
  list: MenuItem[],
  isChildren: boolean,
  parentId: string
) {
  let realIndex = 0;
  list.forEach((menu: MenuItem) => {
    realIndex += 1;
    if (menu.id === undefined) {
      if (menu.isGroup) {
        if (menu.children && menu.children.length > 0) {
          menu.children.forEach((groupMenu: MenuItem, groupIndex) => {
            if (!isChildren) {
              groupMenu.id = String(realIndex + groupIndex);
            } else {
              groupMenu.id = `${parentId}-${String(realIndex + groupIndex)}`;
            }
            if (groupMenu.children && groupMenu.children.length > 0) {
              recursiveMenus(groupMenu.children, true, groupMenu.id);
            } else {
              leafMenuIds.push(groupMenu.id);
            }
          });
          realIndex += menu.children.length - 1;
        }
      } else {
        if (!isChildren) {
          menu.id = String(realIndex);
        } else {
          menu.id = `${parentId}-${String(realIndex)}`;
        }
        if (menu.children && menu.children.length > 0) {
          recursiveMenus(menu.children, true, menu.id);
        } else {
          leafMenuIds.push(menu.id);
        }
      }
    }
  });
}

/**
 * 格式化配置文件里的menu数组
 * @param menuList 配置文件里的menu数组
 */
function handleMenus(menuList: MenuItem[]) {
  let list: MenuItem[] = [];
  if (menuList.length > 0) {
    recursiveMenus(menuList, false, "");
    list = menuList;
  }
  return list;
}

/**
 * 获取当前菜单选中项的path
 * @param id 当前菜单选中项id
 */
function handleCurrentPathById(id: string) {
  const idList = id.split("-");
  const idPath: string[] = [];
  idList.forEach((id: string, index) => {
    if (id) {
      if (index === 0) {
        idPath.push(id);
      } else {
        idPath.push(`${idPath[idPath.length - 1]}-${id}`);
      }
    }
  });
  return idPath;
}

/**
 * 通过菜单项id获取当前菜单项和当前菜单项目的子级
 * @param menus 菜单项数组
 * @param menuIds 菜单项id数组
 */
const getMenuItemByIds = (menus: MenuItem[], menuIds: string[]) => {
  let list = menus;
  const resultList: MenuItem[] = [];
  menuIds.forEach((id) => {
    let findResult = list.find((menu) => {
      if (menu.id === id) {
        return true;
      } else if (menu.isGroup && menu.children && menu.children.length > 0) {
        return menu.children.find((groupMenu) => groupMenu.id === id);
      }
    });
    /** 当菜单为菜单组的时候，从菜单组的子级取匹配的菜单项 */
    if (findResult && findResult.isGroup) {
      findResult = findResult.children?.find((menu) => menu.id === id);
    }

    if (findResult) {
      /** 返回值的数据结构 */
      const resultObj: MenuItem = {
        id: findResult.id,
        text: findResult.text,
        icon: findResult.icon,
        url: findResult.url,
        children: [],
      };
      if (findResult.children) {
        const findResultChildren: MenuItem[] = [];
        findResult.children.forEach((result: MenuItem) => {
          if (result.isGroup) {
            result.children?.forEach((groupResult) => {
              findResultChildren.push({
                id: groupResult.id,
                text: groupResult.text,
                icon: groupResult.icon,
                url: groupResult.url,
              });
            });
          } else {
            findResultChildren.push({
              id: result.id,
              text: result.text,
              icon: result.icon,
              url: result.url,
            });
          }
        });
        resultObj.children = findResultChildren;
        list = findResult.children;
      } else {
        list = [];
      }
      resultList.push(resultObj);
    }
  });
  return resultList;
};

/** 格式化后的menu数组 */
const formatMenus = reactive(handleMenus(menus));

const currentMenu = reactive({
  /** 当前选中的menu的id */
  id: leafMenuIds[0] || "",
  /** 当前选中的menu的id的完整路径，包含当前菜单的id和所有父级的id */
  idPath: handleCurrentPathById(leafMenuIds[0]),
  /** 是否收起导航栏 */
  collapse: false,
});

export { formatMenus, currentMenu, handleCurrentPathById, getMenuItemByIds };
