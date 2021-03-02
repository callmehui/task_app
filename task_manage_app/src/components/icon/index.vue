<template>
  <svg class="icon" aria-hidden="true">
    <use :xlink:href="`#${icon}`"></use>
  </svg>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "icon",
  props: {
    /** 图标名称 */
    icon: {
      type: String,
      required: true,
    },
  },
});
</script>

<style scoped>
.icon {
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}
</style>
