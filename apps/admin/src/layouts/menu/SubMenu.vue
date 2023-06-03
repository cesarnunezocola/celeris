<script setup lang="ts">
const props = defineProps({
  menu: {
    type: Object,
    required: true,
  },
});
</script>

<template>
  <template v-if="menu.children && !menu.shouldHideMenu">
    <ASubMenu :key="menu.key" :title="menu.title">
      <template v-for="menuItem in menu.children">
        <template v-if="!menuItem.shouldHideMenu">
          <template v-if="menuItem.children">
            <SubMenu :key="menuItem.path" :menu="menuItem" />
          </template>
          <template v-else>
            <AMenuItem>
              <template #icon>
                <Component :is="menuItem.icon" />
              </template>
              <Component :is="menuItem.title" />
            </AMenuItem>
          </template>
        </template>
      </template>
    </ASubMenu>
  </template>
  <template v-else>
    <AMenuItem>
      <template #icon>
        <Component :is="menu.icon" />
      </template>
      <Component :is="menu.title" />
    </AMenuItem>
  </template>
</template>

<style scoped>

</style>
