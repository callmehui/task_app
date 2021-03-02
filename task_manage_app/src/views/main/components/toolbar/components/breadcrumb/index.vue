<template>
  <div class="breadcrumb">
    <div class="home" v-if="menuPath[0].text !== '首页'">
      <span class="link" @click="goToPage('/home')">首页</span>
      <Icon class="separator" icon="icon-separator" />
    </div>
    <span class="container" v-for="(menu, index) in menuPath" :key="menu.id">
      <el-tooltip
        v-if="menu.children && menu.children.length > 0"
        placement="bottom"
        effect="light"
        :offset="-10"
      >
        <template #content>
          <div class="popover-content">
            <div
              class="children-item"
              v-for="child in menu.children"
              :key="child.id"
              @click="goToPage(child.url, child)"
            >
              {{ child.text }}
            </div>
          </div>
        </template>
        <span class="popover-container">
          <span class="link">{{ menu.text }}</span>
          <Icon icon="icon-action-down" class="iconfont icon" />
        </span>
      </el-tooltip>
      <span v-else class="last-link">{{ menu.text }}</span>
      <Icon
        v-if="index + 1 !== menuPath.length"
        class="separator"
        icon="icon-separator"
      />
    </span>
  </div>
</template>

<script lang="ts">
import { defineComponent, toRefs } from "vue";
import Icon from "@/components/icon/index.vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import { MenuItem } from "@/config/menu";
import { handleCurrentPathById } from "@/hooks/usemenu";

export default defineComponent({
  name: "breadcrumb",
  components: {
    Icon,
  },
  setup() {
    const router = useRouter();
    const store = useStore();
    const menu = toRefs(store.state.menu);
    const menuPath: MenuItem[] = menu.menuPath;

    const goToPage = (url: string, menu?: MenuItem) => {
      if (menu && menu.id) {
        const idPath = handleCurrentPathById(menu.id);
        store.commit("menu/setId", menu.id);
        store.commit("menu/setIdPath", idPath);
        store.commit("menu/setMenuPath", idPath);
      }
      router.push(url);
    };

    return {
      ...toRefs(store.state.menu),
      menuPath,
      goToPage,
    };
  },
});
</script>

<style lang="scss" scoped>
@mixin link {
  font-size: 14px;
  color: rgba(#000000, 0.65);
  text-decoration: none;
  padding: 0 2px;
  &:hover {
    color: #409eff;
  }
}

@mixin separator {
  color: #999;
  font-size: 20px;
}

.breadcrumb {
  display: flex;
  align-items: center;
  padding: 0 8px;
  box-sizing: border-box;
  .home {
    .link {
      @include link;
      cursor: pointer;
    }
    .separator {
      @include separator;
    }
  }
  .container {
    display: flex;
    align-items: center;
    .popover-container {
      .link {
        @include link;
      }
      :deep() .icon {
        font-size: 10px;
        font-weight: normal;
        color: rgba(0, 0, 0, 0.45);
        margin: 0 0 0 4px;
        cursor: pointer;
      }
    }
    .separator {
      @include separator;
    }
    .last-link {
      color: #999;
      font-size: 14px;
      padding: 0 2px;
    }
  }
}
:deep() .el-popover.el-popper {
  width: 80px;
}

.popover-content {
  z-index: 2001;
  background-color: #fff;
  border-radius: 4px;
  font-size: 14px;
  padding: 4px 0;
  border: 1px solid #e4e7ed;
  outline: 0;
  box-shadow: 0 2px 8px #f9f9f9;
  .children-item {
    padding: 5px 12px;
    cursor: pointer;
    color: rgba(#000000, 0.65);
    &:hover {
      background-color: #f5f5f5;
    }
  }
}
</style>
