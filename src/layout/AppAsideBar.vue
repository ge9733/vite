<template>
  <ul class="app_aside_bar">
    <li v-for="item in menu" @click="router.push({ path: `/${item.routeName}` })" :key="item.name">
      {{ item.name }}
    </li>
  </ul>
</template>
<script setup lang="ts">
import { ref, reactive } from 'vue'
import { useRouter, useRoute } from 'vue-router'
let router = useRouter()
let route = useRoute()

let menu = reactive([
  {
    name: '发现音乐',
    routeName: 'discovery'
  },
  {
    name: '推荐歌单',
    routeName: 'recommend'
  },
  {
    name: '最新音乐',
    routeName: 'newest'
  },
  {
    name: '最新mv',
    routeName: 'mv'
  }
])
</script>
<style lang="less" scoped>
.app_aside_bar {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  li {
    padding: 10px;
  }
}
</style>
