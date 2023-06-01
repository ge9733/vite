<template>
  <div class="discovery">
    <el-carousel :interval="4000" type="card" height="200px">
      <el-carousel-item v-for="(item, index) in banners" :key="index">
        <img class="img" :src="item.pic" alt="" />
      </el-carousel-item>
    </el-carousel>
    <b>推荐歌单1</b>
    <div class="recommend">
      <div class="item" v-for="recommend in recommendList" :key="recommend.id">
        <img :src="recommend.picUrl" alt="" @click="toList(recommend.id)" />
        <span>{{ recommend.name }}</span>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref, reactive, onMounted, watchEffect } from 'vue'
import { getBanner, getRemmendList } from '@/api/utils'
import { useRoute, useRouter } from 'vue-router'
let router = useRouter()

let banners = ref()
let recommendList = ref()

// 监听立即执行
watchEffect(() => {
  getBanner().then(res => {
    banners.value = res.banners
  })
  getRemmendList().then(res => {
    recommendList.value = res.result
    console.log(recommendList)
  })
})
function toList(id: number) {
  router.push(`/playlist/${id}`)
}
</script>
.

<style scoped lang="less">
.discovery {
  width: 90%;
  height: 100%;
  margin-left: 10%;
  margin-top: 20px;
  overflow: scroll;
}

.img {
  display: inline-block;
  width: 100%;
  max-width: 100%;
  height: auto;
}
.recommend {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  .item {
    display: flex;
    flex-direction: column;
    width: 200px;
    margin-bottom: 20px;
    position: relative;
    cursor: pointer;
    img {
      width: 200px;
      border-radius: 8px;
    }
  }
}
</style>
