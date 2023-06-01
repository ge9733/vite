<template>
  <div class="play">
    <div class="left">
      <div class="title">MV详情</div>
      <div class="video">
        <video :src="url" autoplay controls></video>
      </div>
      <div class="info">
        <img :src="info.cover" alt="" />
        <span>{{ info.artistName }}</span>
      </div>
      <div class="mv_title">
        <span>{{ info.name }}</span>
      </div>
      <div class="mv_dt">
        <span>发布:{{ ' ' + info.publishTime }}</span>
        <span>播放:{{ ' ' + info.playCount }}次</span>
      </div>
      <div class="mv_dc">
        <span>{{ info.desc }}</span>
      </div>
    </div>
    <div class="right">
      <div class="mv" v-for="mv in similarMvs" :key="mv.id">
        <div class="l">
          <span class="iconfont icon-bofang playcount">{{ mv.playCount }}</span>
          <span class="iconfont icon-bofang mv_time">{{ getTime(mv.duration) }}</span>
          <img :src="mv.cover" alt="" @click="updateMv(mv.id)" />
        </div>
        <div class="r">
          <div class="mvinfobox">
            <div class="name">{{ mv.name }}</div>
            <div class="author">{{ mv.artistName }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref, reactive, computed, onMounted } from 'vue'
import { getmvInfo, getmvSimilar, getmvUrl } from '@/api/utils'
import { useRoute, useRouter } from 'vue-router'
let route = useRoute()
let router = useRouter()
let id = computed(() => {
  return route.params.id
})
let getTime = (millions: number) => {
  let minute = ''
  let se = ''
  let m = parseInt(String(millions / 60))
  if (m < 10) {
    minute = '0' + m
  } else {
    minute = String(m)
  }
  let s = parseInt(String(millions % 60))
  if (s < 10) {
    se = '0' + s
  } else {
    se = String(s)
  }
  return `${minute} : ${se}`
}
let updateMv = id => {
  router.push({
    path: `/MvPlay/${id}`
  })
}
let url = ref('')
let info = ref({})
let similarMvs = ref([])
onMounted(() => {
  getmvUrl(id.value).then(res => {
    url.value = res.data.url
  })
  getmvInfo(id.value).then(res => {
    info.value = res.data
  })
  getmvSimilar(id.value).then(res => {
    similarMvs.value = res?.mvs
    console.log(similarMvs)
  })
})
</script>
<style scoped lang="less">
.play {
  height: 100%;
  width: 90%;
  margin-left: 5%;
  margin-top: 20px;
  display: flex;
  .left {
    width: 70%;
    .title {
      font-size: 20px;
      font-weight: bold;
      margin-bottom: 20px;
    }
    .video video {
      width: 100%;
      height: auto;
    }
    .info {
      display: flex;
      align-items: center;
      margin-top: 20px;
      img {
        width: 50px;
        height: 50px;
        border-radius: 50%;
      }
    }
    .mv_title {
      margin-bottom: 20px;
      font-size: 20px;
      font-weight: bold;
    }
    .mv_dt {
      font-size: 13px;
      color: gray;
      margin-bottom: 10px;
    }
    .mv_de {
      font-size: 15px;
    }
  }
  .right {
    width: 28%;
    margin-left: 2%;
    .mv {
      width: 100%;
      display: flex;
      margin-bottom: 30px;

      .l {
        width: 60%;
        position: relative;
        left: 0px;
        top: 0px;

        img {
          width: 100%;
          height: 120px;
          border-radius: 5px;
          display: block;
        }

        .playcount {
          position: absolute;
          top: 0px;
          right: 0px;
          color: white;
        }
        .mv_time {
          position: absolute;
          bottom: 0px;
          right: 0px;
          color: white;
        }
      }
      .r {
        width: 35%;
        margin-left: 5%;
        .name,
        .author {
          font-size: 13px;
          color: gray;
          margin-top: 20px;
        }
      }
    }
  }
}
</style>
