<template>
  <div class="mv">
    <div class="options">
      <div>
        地区：
        <li
          :class="['item', { item_active: options[0] == area }]"
          v-for="area in areas"
          @click="handleOption('areas', area)"
          :key="area"
        >
          {{ area }}
        </li>
      </div>
      <div>
        类型：
        <li
          :class="['item', { item_active: options[1] == type }]"
          v-for="type in types"
          @click="handleOption('types', type)"
          :key="type"
        >
          {{ type }}
        </li>
      </div>
      <div>
        排序：
        <li
          :class="['item', { item_active: options[2] == order }]"
          v-for="order in orders"
          @click="handleOption('orders', order)"
          :key="order"
        >
          {{ order }}
        </li>
      </div>
    </div>
    <div class="mvlist">
      <div class="mv1" v-for="mv in mvs" @click="play(mv.id)" :key="mv.id">
        <img :src="mv.cover" alt="" />
        <div class="info">{{ mv.artistName }}</div>
        <div class="info">{{ mv.name }}</div>
        <div class="count">
          <i class="iconfont icon-play"></i><span>{{ mv.playCount }}</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref, reactive, watchEffect } from 'vue'
import { getNewMv } from '@/api/utils'
import { useRouter } from 'vue-router'
let areas = reactive(['全部', '内地', '欧美', '日本', '韩国'])
let types = reactive(['全部', '官方版', '原生', '现场版', '网易出品'])
let orders = reactive(['上升最快', '最热', '最新'])
let options = reactive(['全部', '全部', '上升最快'])
function handleOption(option: string, item: any) {
  if (option == 'areas') {
    options[0] = item
  }
  if (option == 'types') {
    options[1] = item
  }
  if (option == 'orders') {
    options[2] = item
  }
}
let mvs = ref()

watchEffect(() => {
  getNewMv(options, 1).then(res => {
    mvs.value = res.data
    console.log(mvs.value)
  })
})
let router = useRouter()
function play(mvid) {
  router.push({
    path: `/MvPlay/${mvid}`
  })
}
</script>
<style scoped lang="less">
.mv {
  height: 100%;
  width: 80%;
  margin: 0 auto;

  .options {
    width: 60%;
    display: flex;
    flex-direction: column;
    position: relative;
    top: 30px;
    div {
      display: flex;
      margin-bottom: 5px;
      .item {
        flex: 1;
        color: gray;
        height: 25px;
        line-height: 25px;
        text-align: center;
        font-size: 13px;
        &:hover {
          color: #000;
        }
        &.item_active {
          background-color: #fdf5f5;
          color: #ec4141 !important;
          border-radius: 20px;
          transition: all 1s ease;
        }
      }
    }
  }
  .mvlist {
    margin-top: 20px;
    height: calc(100% - 120px);
    position: relative;
    top: 30px;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;

    .mv1 {
      width: 22%;
      margin-right: 3%;
      position: relative;

      img {
        width: 100%;
        height: 120px;
        border-radius: 5px;
        cursor: pointer;
      }
      .info {
        font-size: 13px;
        margin-top: 10px;
      }
      .count {
        font-size: 13px;
        position: absolute;
        top: 0px;
        right: 0px;
      }
    }
  }
}
</style>
