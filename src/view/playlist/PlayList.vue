<template>
  <div class="playlist">
    <div class="header">
      <div class="header_image">
        <img :src="songlist?.coverImgUrl" alt="" />
      </div>
      <div class="header_info">
        <div class="info_name">{{ songlist?.name }}</div>
        <div class="info_avatar">
          <img :src="songlist?.creator.avatarUrl" alt="" />
          <span>{{ songlist?.creator.nickname }}</span>
          <span>{{ getDate(songlist?.createTime) }} 创建12</span>
        </div>
        <div class="playbutton">
          <button>播放</button>
        </div>
        <div class="label">
          <span>标签:</span>
          <button v-for="tag in songlist?.tags" :key="tag">{{ tag }}</button>
        </div>
        <div class="introduce">介绍：{{ songlist?.description }}</div>
      </div>
    </div>

    <br />
    <div class="list">
      <el-table :data="songlist?.tracks" style="width: 100%">
        <el-table-column type="index" />
        <el-table-column>
          <template v-slot="{ row }">
            <div class="listplay" @click="play(row)">
              <i class="iconfont icon-bofang"></i>
              <img :src="row.al.picUrl" alt="" />
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="name" label="音乐标题" width="180" />
        <el-table-column prop="ar[0].name" label="歌手" />
        <el-table-column prop="al.name" label="专辑" />
        <el-table-column label="时长">
          <template v-slot="{ row }">
            {{ getTime(row.dt) }}
          </template>
        </el-table-column>
      </el-table>
    </div>

    <AdBreakTop target=".playlist"></AdBreakTop>
    <Control v-if="visiable"></Control>
  </div>
</template>
<script setup lang="ts">
import Control from '@/components/Control.vue'
import AdBreakTop from '@/components/AdBreakTop.vue'

import { ref, reactive, watch } from 'vue'
import { getSonglistDetail } from '@/api/utils'
import { usePlayList } from '@/store/playList'
import { useNowPlaying } from '@/store/nowPlaying'
import { useRoute } from 'vue-router'
let route = useRoute()
let songlist = ref()

getSonglistDetail(Number(route.params.id)).then(res => {
  songlist.value = res.playlist
})

let getDate = (millions: number) => {
  let date = new Date(millions)
  let year = date.getFullYear()
  let month = date.getMonth()
  let day = date.getDate()
  return `${year}-${month}-${day}`
}
let getTime = (millions: number) => {
  let m = parseInt(String(millions / 1000 / 60))
  if (m < 10) m = '0' + m
  let s = parseInt(String((millions / 1000) % 60))
  if (s < 10) s = '0' + s
  return `${m} : ${s}`
}
let visiable = ref(false)

let play = (song: any) => {
  let play = usePlayList()
  play.playlist.unshift(song)

  let nowplaying = useNowPlaying()
  nowplaying.song = song
  visiable.value = true
}
</script>
<style scoped lang="less">
.playlist {
  width: 80%;
  margin-left: 10%;
  margin-top: 20px;
  width: 100%;
  height: 100%; 
  overflow-x: hidden;
  overflow-y: auto;

  .header {
    display: flex;
    width: 100%;
    align-items: flex-start;
    .header_image {
      display: flex;
      justify-content: center;
      align-items: center;
      img {
        width: 210px;
        height: 210px;
        border-radius: 10px;
      }
    }
    .header_info {
      margin-left: 10px;
      width: calc(100% - 210px);
      display: flex;
      flex-direction: column;

      .info_avatar {
        display: flex;
        align-items: center;
        justify-content: flex-start;
        span {
          margin-left: 20px;
          font-size: 12px;
        }
        img {
          width: 35px;
          height: 35px;
          border-radius: 5px;
        }
      }
      .playbutton {
        margin-top: 10px;
        button {
          height: 30px;
          width: 50px;
        }
      }
      .label {
        display: flex;
        align-items: center;
        align-content: center;
        button {
          width: 50px;
          height: 30px;
          margin-left: 10px;
          border-radius: 15px;
          opacity: 1;
        }
      }
    }
  }
  .list {
    .listplay {
      display: flex;
      justify-content: center;
      align-items: center;

      i {
        position: absolute;
        top: 50%;
        left: 50%;
        font-size: 35px;
        transform: translate(-50%, -50%);
      }

      img {
        width: 60px;
        height: auto;
      }
    }
  }
}

.showlyc {
  position: absolute;
  left: 200px;
  top: 40px;
  height: calc(100vh - 90px);
  width: calc(100vw - 280px);
  background-color: aqua;

  z-index: 1000;
}
</style>
