<template>
  <!-- 菜单项有children，并且是分组模式 -->
  <el-menu-item-group
    v-if="menuData.children && menuData.children.length > 0 && menuData.isGroup"
  >
    <template #title>
      <span class="menu-item-inner">{{ menuData.text }}</span>
    </template>
    <template v-for="(subMenuData, index) in menuData.children" :key="index">
      <menu-item :menuData="subMenuData"></menu-item>
    </template>
  </el-menu-item-group>
  <!-- 菜单项有children，并且不是分组模式 -->
  <el-submenu
    v-else-if="
      menuData.children && menuData.children.length > 0 && !menuData.isGroup
    "
    :index="menuData.id"
  >
    <template #title>
      <Icon :icon="menuData.icon" />
      <span class="text">{{ menuData.text }}</span>
    </template>
    <template v-for="(subMenuData, index) in menuData.children" :key="index">
      <menu-item :menuData="subMenuData"></menu-item>
    </template>
  </el-submenu>
  <!-- 菜单项没有children -->
  <el-menu-item v-else :index="menuData.id">
    <Icon :icon="menuData.icon" />
    <span class="text">{{ menuData.text }}</span>
  </el-menu-item>
</template>

<script lang="ts">
import Icon from "@/components/icon/index.vue";

export default {
  name: "menu-item",
  components: {
    Icon,
  },
  props: {
    /** 菜单项数据 */
    menuData: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style lang="scss" scoped>
.text {
  margin-left: 8px;
}
</style>
