<script lang="ts" setup>
import { computed } from "vue";

interface ToolTipperProps {
  // Tooltip 显示的文本信息
  // The text content of the tooltip
  tooltipText?: string;

  // Tooltip 显示的位置
  // The placement of the tooltip
  placement?: "top" | "left" | "right" | "bottom" | "topLeft" | "topRight" | "bottomLeft" | "bottomRight" | "leftTop" | "leftBottom" | "rightTop" | "rightBottom";

  // Tooltip 的触发方式
  // The trigger mode of the tooltip
  tooltipTrigger?: "hover" | "focus" | "click" | "contextMenu";

  // Tooltip 的额外样式类，用于自定义样式
  // The class name to apply to the content element for custom styling
  contentClass?: string;
}

const props = withDefaults(defineProps<ToolTipperProps>(), {
  tooltipText: "",
  placement: "bottomLeft",
  tooltipTrigger: "hover",
  contentClass: "",
});
const { tooltipText, placement, tooltipTrigger, contentClass } = toRefs(props);
const shouldShowTooltip = computed(() => Boolean(tooltipText));
</script>

<template>
  <div v-if="shouldShowTooltip">
    <ATooltip :placement="placement" :trigger="tooltipTrigger" :auto-adjust-overflow="true">
      <template #title>
        <div class="flex-center h-full rounded-lg cursor-pointer dark:hover:bg-gray-900" :class="contentClass">
          {{ tooltipText }}
        </div>
      </template>
      <slot />
    </ATooltip>
  </div>
  <div v-else class="flex-center rounded-lg cursor-pointer dark:hover:bg-gray-900" :class="contentClass">
    <slot />
  </div>
</template>

<style scoped></style>
