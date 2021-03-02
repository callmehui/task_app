import { MenuItem } from "@/config/menu";
import { formatMenus, currentMenu, getMenuItemByIds } from "@/hooks/usemenu";

 interface Menu {
  id: string;
  idPath: string[];
  collapse: boolean;
  menuPath?: MenuItem[];
}

type MenuState  = () => Menu;

interface MenuModule {
  namespaced: boolean;
  state: MenuState;
  getters: {};
  mutations: {
    setId: (state: Menu, id: string) => void;
    setIdPath: (state: Menu, id: string[]) => void;
    setMenuPath: (state: Menu, id: string[]) => void;
    setCollapse: (state: Menu) => void;
  }
}

const state: MenuState =  () => ({
  id: currentMenu.id,
  idPath: currentMenu.idPath,
  collapse: currentMenu.collapse,
  menuPath: getMenuItemByIds(formatMenus, currentMenu.idPath),
});

const menuModule: MenuModule = {
  namespaced: true,
  state,
  getters: {
    /** vue3.1版本发布前，仍旧有问题 */
  },
  mutations: {
    setId(state: Menu, id: string) {
      state.id = id;
    },
    setIdPath(state: Menu, idPath: string[]) {
      state.idPath = idPath;
    },
    setMenuPath(state: Menu,idPath: string[]) {
      state.menuPath = getMenuItemByIds(formatMenus, idPath);
    },
    setCollapse(state: Menu) {
      state.collapse = !state.collapse;
    },
  },
};

export {
  Menu,
  menuModule,
  MenuModule,
}