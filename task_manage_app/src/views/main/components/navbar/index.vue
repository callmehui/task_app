<template>
  <div class="navbar-container" :class="{ 'nav-container-collapse': collapse }">
    <el-menu
      class="navbar-menu"
      :uniqueOpened="true"
      :collapse="collapse"
      :default-active="id"
      @select="handleSelect"
      background-color="#282c34"
      text-color="#fff"
      active-text-color="#ffffff"
    >
      <!-- logo -->
      <el-menu-item class="logo-container" index="0">
        <img class="img" :src="logoImg" alt="logo" />
        <div v-show="!collapse" class="title">{{ logoName }}</div>
      </el-menu-item>
      <!-- 导航栏 -->
      <template v-for="(menu, index) in menuList" :key="index">
        <MenuItem :menuData="menu" />
      </template>
    </el-menu>
  </div>
</template>

<script lang="ts">
import { defineComponent, toRefs } from "vue";
import MenuItem from "./components/menuitem/index.vue";
import { formatMenus, getMenuItemByIds } from "@/hooks/usemenu";
import { useStore } from "vuex";
import { useRouter } from "vue-router";

export default defineComponent({
  props: {
    /** logo的url地址 */
    logoImg: {
      type: String,
      required: true,
    },
    /** logo名称 */
    logoName: {
      type: String,
      required: true,
    },
  },
  components: {
    MenuItem,
  },
  setup() {
    const store = useStore();
    const router = useRouter();
    const menuList = formatMenus;
    const handleSelect = (id: string, idPath: string[]) => {
      store.commit("menu/setId", id);
      store.commit("menu/setIdPath", idPath);
      store.commit("menu/setMenuPath", idPath);
      const menuItems = getMenuItemByIds(menuList, idPath);
      if (menuItems && menuItems.length > 0) {
        const url = menuItems[menuItems.length - 1].url;
        url && router.push(url);
      }
    };

    return {
      ...toRefs(store.state.menu),
      menuList,
      handleSelect,
    };
  },
});
</script>

<style lang="scss" scoped>
.navbar-container {
  width: 210px;
  height: 100%;
  min-height: 100vh;
  /** logo样式 */
  .logo-container {
    display: flex;
    align-items: center;
    height: 64px !important;
    padding: 12px;
    padding-left: 12px !important;

    .img {
      width: 40px;
      height: 40px;
    }
    .title {
      font-size: 20px;
      color: #fff;
      font-weight: 700;
      transition: all 0.5s;
      margin-left: 8px;
    }
  }

  /** 导航条样式 */
  .navbar-menu {
    width: 100%;
    height: 100%;
    overflow: auto;

    :deep() .el-submenu__title:hover {
      background-color: rgb(32, 35, 42);
    }
    :deep() .el-submenu__title,
    :deep() .el-menu-item {
      height: 50px;
      line-height: 50px;
      color: rgba($color: #000000, $alpha: 0.95);
    }

    :deep() .el-menu-item,
    :deep() .el-submenu__title {
      display: flex;
      align-items: center;
    }
    :deep() .el-menu-item.is-active {
      color: #ffffff;
      background-color: #1890ff !important;
    }
    :deep() .el-menu-item-group__title,
    .menu-item-inner {
      padding-left: 50px !important;
    }

    :deep() &:not(.el-menu--collapse) {
      width: 210px;
    }
  }
}

.nav-container-collapse {
  width: 64px;
  flex: 0 0 64px;
}
</style>
