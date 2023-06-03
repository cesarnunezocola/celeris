<script setup lang="ts">
import type { Menu } from "@celeris/types";
import { CAUnoCSSIcon } from "@celeris/components";
import { mapTreeStructure } from "@celeris/utils";
import type { RouteLocationNormalizedLoaded } from "vue-router";
import { RouterLink } from "vue-router";
import { useMenuSetting } from "~/composables/setting/useMenuSetting";
import SubMenu from "~/layouts/menu/SubMenu.vue";
import { REDIRECT_NAME } from "~/router/constant";
import { getMenus } from "~/router/menus";
import { listenToRouteChange } from "~/router/mitt/routeChange";

defineOptions({
  name: "MenuLayout",
});
const activeMenu = ref<string[]>();
const isCollapse = useMenuSetting().getCollapsed;
const { currentRoute } = useRouter();
const menuList = ref<any[]>([]);

listenToRouteChange((route) => {
  if (route.name === REDIRECT_NAME) {
    return;
  }
  const currentActiveMenu = route.meta?.currentActiveMenu;
  handleMenuChange(route as RouteLocationNormalizedLoaded);
  if (currentActiveMenu) {
    activeMenu.value = [currentActiveMenu];
  }
});
async function handleMenuChange(route?: RouteLocationNormalizedLoaded) {
  const menu = route || unref(currentRoute);
  activeMenu.value = [menu.path];
}
const transformProjectMenuToAntdMenu = (menu: Menu) => {
  const { path, meta, icon, children } = menu;
  const renderIcon = (icon?: string) => {
    return () => h(CAUnoCSSIcon, { icon });
  };
  const renderTitle = () => {
    if (children) {
      return meta?.title;
    } else {
      return () => h(
        RouterLink,
        {
          to: {
            path,
          },
        },
        { default: () => meta?.title },
      );
    }
  };
  return {
    title: renderTitle(),
    key: path,
    icon: renderIcon(icon || meta?.icon as string),
  };
};

onMounted(() => {
  const menus = getMenus();
  menuList.value = mapTreeStructure(menus, menu => transformProjectMenuToAntdMenu(menu));
});
</script>

<template>
  <div :class="isCollapse ? 'w-16' : 'w-64'" class="transition-width h-full shrink-0 flex-col overflow-hidden duration-75 lg:flex">
    <AMenu mode="inline" :selected-keys="activeMenu" :collapsed="isCollapse">
      <template v-for="menu in menuList" :key="menu.key">
        <SubMenu :menu="menu" />
      </template>
    </AMenu>
  </div>
</template>

<style scoped lang="scss">
</style>
