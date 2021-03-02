<template>
  <el-dropdown @command="handleCommand">
    <div class="user-info">
      <img class="portrait" :src="portrait" alt="用户头像" />
      {{ name }}
    </div>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item
          class="setting-item"
          v-for="(option, index) in options"
          :key="index"
          :disabled="option.disabled"
          :divided="option.divided"
          :command="option.operate"
        >
          <Icon class="iconfont icon" :icon="option.icon" />
          {{ option.text }}
        </el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<script lang="ts">
import { defineComponent, reactive } from "vue";
import Icon from "@/components/icon/index.vue";

export default defineComponent({
  name: "user-setting",
  components: {
    Icon,
  },
  props: {
    /** 用户名 */
    name: {
      type: String,
      required: true,
    },
    /** 用户头像 */
    portrait: {
      type: String,
      default: "",
    },
    /** 用户id */
    userId: {
      type: String,
    },
  },
  setup() {
    const options = reactive([
      {
        text: "个人中心",
        icon: "icon-user-hollow",
        operate: "userCenter",
        divided: false,
        disabled: false,
      },
      {
        text: "其他操作2",
        icon: "icon-user-hollow",
        operate: "logout",
        divided: false,
        disabled: true,
      },
      {
        text: "退出系统",
        icon: "icon-logout",
        operate: "logout",
        divided: true,
        disabled: false,
      },
    ]);

    const handleCommand = (command: string) => {
      console.log("command", command);
    };

    return {
      options,
      handleCommand,
    };
  },
});
</script>

<style lang="scss" scoped>
.user-info {
  margin-right: 20px;
  display: flex;
  height: 48px;
  min-width: 100px;
  padding: 0 0 0 10px;
  padding-right: 10px;
  overflow: hidden;
  font-size: 14px;
  cursor: pointer;
  align-items: center;
  color: rgba(0, 0, 0, 0.85);
  &:hover {
    background-color: #f6f6f6;
  }
  .portrait {
    width: 32px;
    height: 32px;
    margin-right: 12px;
    border-radius: 50%;
  }
  .setting-item {
    .icon {
      font-size: 14px;
    }
  }
}
</style>
