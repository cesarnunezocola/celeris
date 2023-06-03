<script setup lang="ts">
import { logger } from "@celeris/utils";
import { designPrefixCls } from "~/config/designConfig";

logger.info("I'm ready!  ⸜(๑'ᵕ'๑)⸝⋆*");
</script>

<template>
  <AConfigProvider :prefix-cls="designPrefixCls" class="w-full h-full">
    <RouterView />
  </AConfigProvider>
</template>
