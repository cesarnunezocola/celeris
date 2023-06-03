<script setup lang="ts">
import { useHeaderSetting } from "~/composables";

defineOptions({
  name: "SettingDrawer",
});
const { getShouldShowSettingDrawer, setShouldShowSettingDrawer } = useHeaderSetting();
</script>

<template>
  <ADrawer
    :open="getShouldShowSettingDrawer" width="25%"
    title="Project Setting"
    @close="setShouldShowSettingDrawer(false)"
  />
</template>

<style scoped>

</style>
