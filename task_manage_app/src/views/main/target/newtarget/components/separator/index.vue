<template>
  <div class="separator-wrap" :style="typeColorStyle">
    <div class="separator value">
      <div class="text">达成百分比({{ typeText }})</div>
    </div>
    <div class="separator desc">
      <div class="text">达成百分比描述({{ typeText }})</div>
    </div>
    <div class="separator reward-or-punish">
      <div class="text">奖励或惩罚({{ typeText }})</div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, toRefs } from "vue";

export default defineComponent({
  name: "separator",
  props: {
    type: {
      type: String,
      default: "reached",
      validator: (val: string): boolean =>
        ["reached", "reward", "punish"].includes(val),
    },
  },
  setup(props) {
    const { type } = toRefs(props);
    const typeText = computed(() => {
      let result = "";
      if (type.value === "reached") {
        result = "合格";
      } else if (type.value === "reward") {
        result = "奖励";
      } else if (type.value === "punish") {
        result = "惩罚";
      }
      return result;
    });
    const typeColorStyle = computed(() => {
      let result = "";
      if (type.value === "reached") {
        result = "#409EFF";
      } else if (type.value === "reward") {
        result = "#67C23A";
      } else if (type.value === "punish") {
        result = "#F56C6C";
      }
      return `color: ${result}`;
    });

    return {
      typeText,
      typeColorStyle,
    };
  },
});
</script>

<style lang="scss" scoped>
.separator-wrap {
  display: flex;
  align-items: center;
  width: 100%;
  height: 24px;
  .separator {
    display: block;
    width: 100%;
    margin: 12px 0;
    padding-right: 16px;
    height: 1px;
    background-color: #dcdfe6;
    position: relative;
    box-sizing: border-box;
    .text {
      position: absolute;
      left: 0;
      transform: translateY(-50%);
      position: absolute;
      background-color: #fff;
      font-weight: 500;
      font-size: 14px;
    }
  }
  .value {
    width: 140px;
    .text {
      padding-right: 12px;
    }
  }
  .desc {
    width: 216px;
    .text {
      padding: 0 12px;
    }
  }
  .reward-or-punish {
    flex: 1;
    .text {
      padding: 0 12px;
    }
  }
}
</style>
