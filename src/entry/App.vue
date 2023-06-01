<template>
  <div class="app_contain">
    <AppTabBarVue></AppTabBarVue>
    <aside class="app_contain_aside">
      <b>netease</b>

      <AppAsideBar></AppAsideBar>
    </aside>
    <div class="app_contain_main">
      <AppRouterBarVue></AppRouterBarVue>
    </div>
    <div class="footer">
      <AppFooterVue></AppFooterVue>
    </div>
  </div>
</template>
<script setup lang="ts">
import Control from '@/components/Control.vue'
import AppRouterBarVue from '@/layout/AppRouterBar.vue'
import AppAsideBar from '@/layout/AppAsideBar.vue'
import AppTabBarVue from '@/layout/AppTabBar.vue'
import AppFooterVue from '@/layout/AppFoter.vue'
import { ref, reactive } from 'vue'
</script>
<style>
@import '@/assets/css/common.less';
</style>

<style scoped lang="less">
.app_contain {
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  flex-wrap: wrap;
  align-content: flex-start;

  &_aside {
    height: calc(100% - 90px);
    width: 200px;
    background-color: aquamarine;
    display: flex;
    flex-direction: column;

    & > b {
      width: 100%;
      display: flex;
      justify-content: center;
      align-items: center;

      aspect-ratio: 2/1;
    }
  }
  &_main {
    width: calc(100% - 280px);
    height: calc(100% - 90px);
    overflow-y: scroll;
    overflow-x: hidden;
  }
  .footer {
    width: 100%;
    height: 50px;
    background-color: bisque;
    position: absolute;
    bottom: 0px;
  }
}
</style>
