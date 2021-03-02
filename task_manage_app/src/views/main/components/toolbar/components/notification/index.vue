<template>
  <el-popover placement="bottom" :width="320" trigger="click" show-arrow>
    <template #reference>
      <div class="d-flex">
        <el-badge is-dot type="danger" class="notification-badge">
          <div class="notification-icon">
            <Icon icon="icon-bell" class="trigger-icon" />
          </div>
        </el-badge>
      </div>
    </template>
    <!-- popover显示内容 -->
    <el-tabs v-model="activeTabName" @tab-click="handleTabClick">
      <template v-for="(tab, index) in notificationTabs" :key="index">
        <el-tab-pane :label="tab.label" :name="tab.name">用户管理</el-tab-pane>
      </template>
    </el-tabs>
  </el-popover>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from "vue";
import Icon from "@/components/icon/index.vue";
import { Pane } from "element-plus/lib/el-tabs/src/tabs.vue";

export default defineComponent({
  name: "notification",
  components: {
    Icon,
  },
  setup() {
    const notificationTabs = reactive([
      { label: "通知", name: "notification" },
      { label: "消息", name: "news" },
      { label: "待办", name: "todo" },
    ]);

    const activeTabName = ref(notificationTabs[0].name);

    const handleTabClick = (tab: Pane) => {
      activeTabName.value = tab.paneName.value;
    };

    return {
      notificationTabs,
      activeTabName,
      handleTabClick,
    };
  },
});
</script>

<style lang="scss" scoped>
.d-flex {
  display: flex;
  align-items: center;
  height: 48px;
  &:hover {
    background-color: #f6f6f6;
  }
  .notification-badge {
    margin: 8px;
    .notification-icon {
      padding: 0 4px;
      display: flex;
      align-items: center;
      .trigger-icon {
        font-size: 20px;
      }
    }
  }
}
:deep() .el-popover.el-popper {
  box-sizing: border-box;
}
:deep() .el-badge__content.is-dot {
  width: 6px;
  height: 6px;
}

:deep() .el-tabs__nav {
  width: 100%;
  .el-tabs__item {
    width: 33.3%;
    text-align: center;
  }
}
</style>
