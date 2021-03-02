<template>
  <div class="menu-folder" @click="toggleCollapse">
    <Icon
      :class="['iconfont', 'icon']"
      :icon="collapse ? 'icon-unfold' : 'icon-fold'"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, toRefs } from "vue";
import Icon from "@/components/icon/index.vue";
import { useStore } from "vuex";

export default defineComponent({
  name: "menu-folder",
  components: {
    Icon,
  },
  setup() {
    const store = useStore();
    const { collapse } = toRefs(store.state.menu);
    const toggleCollapse = () => {
      store.commit("menu/setCollapse");
    };

    return {
      collapse,
      toggleCollapse,
    };
  },
});
</script>

<style lang="scss" scoped>
.menu-folder {
  display: flex;
  align-items: center;
  height: 100%;
  padding: 1px 10px 0 16px;
  cursor: pointer;
  &:hover {
    background-color: #f6f6f6;
  }
  .icon {
    font-size: 16px;
  }
}
</style>
