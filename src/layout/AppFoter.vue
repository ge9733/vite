<template>
  <div>
    <div class="audio">
      <div class="controls">
        <div clas="button shangyiqu">
          <Icon name="icon-shangyigeshangyiqu"></Icon>
        </div>
        <div clas="button bofang" @click="handlePlay()">
          <Icon :name="icon" size="30"></Icon>
        </div>
        <div class="button next">
          <Icon name="icon-xiayigexiayiqu"></Icon>
        </div>
      </div>
      <div class="play">
        <div class="bg" v-if="song?.url" @click="showlyc()">
          <img :src="nowPlaying.song?.al.picUrl" alt="" />
        </div>

        <audio
          autoplay
          :src="song?.url"
          id="audio"
          ref="audio"
          @canplay="getDuration()"
          @timeupdate="getCurrent()"
          @ended="handleEnd()"
        ></audio>
        <div class="progress">
          <div>
            {{ nowPlaying.song?.name }} <span>{{ nowPlaying.song?.ar[0]?.name }} </span>
          </div>
          <el-progress
            :percentage="Number.isNaN(percentage) ? 0 : percentage"
            :show-text="false"
          ></el-progress>
        </div>
        <div class="persent">
          <span> {{ duration }} /{{ currentTime }}</span>
        </div>
        <div class="extra">
          <Icon name="icon-24gf-volumeHigh" size="20"></Icon>
          <Icon name="icon-bofang-xunhuanbofang" :size="'20'"></Icon>
          <Icon name="icon-bofangliebiao" size="20"></Icon>
        </div>
      </div>
    </div>

    <div v-if="show" class="showlyc">
      <div class="right">
        <div class="wrapper" ref="scrolls">
          <div class="contents">
            <div
              :class="['items', { item_actice: lycindex == index }]"
              v-for="(item, index) in lyric"
              :key="index"
            >
              {{ item[1] }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import BScroll from 'better-scroll'
import '@/assets/icon/iconfont.css'
import '@/assets/icon/iconfont.js'
import Icon from '@/components/Icon.vue'
import { ref, reactive, watch, computed, onMounted, nextTick } from 'vue'
import { getSongUrl, getlyc } from '@/api/utils'
import { useNowPlaying } from '@/store/nowPlaying'
let nowPlaying = useNowPlaying()
let song = ref()
let lyric = ref()
watch(nowPlaying, (newV, oldV) => {
  getSongUrl(newV.song.id).then(res => {
    song.value = res.data[0]
    console.log(song.value)
  })
  getlyc(newV.song.id).then(res => {
    let lyclist = res.lrc.lyric.split('\n')
    let re = /\[\d{2}:\d{2}.\d{2,3}\]/
    let lyc = []
    for (let i in lyclist) {
      if (lyclist[i]) {
        let date = lyclist[i].match(re)
        date = date[0].slice(1, -1)
        let timelist = date.split(':') //以:分割
        let m = timelist[0]
        let s = timelist[1]
        let time = parseFloat(m) * 60 + parseFloat(s) //计算时间
        let lrcitem = lyclist[i].replace(re, '') //获取歌词
        if (lrcitem != '') {
          lyc.push([time, lrcitem])
        }
      }
    }
    lyric.value = lyc
    console.log(lyric.value)
  })
})

let audio = ref(null)
// 获取歌曲时长
let duration = ref('')
let durationNum = ref(0)
function getDuration() {
  playState.value = !playState.value
  duration.value = getTime(audio.value?.duration)
  durationNum.value = audio.value?.duration
}
// 获取当前播放时长
let currentTime = ref('')
let currentTimtNum = ref(0)
function getCurrent() {
  currentTime.value = getTime(audio.value?.currentTime)
  currentTimtNum.value = audio.value?.currentTime

  let lyc = lyric.value
  for (let i = 0; i < lyc.length; i++) {
    if (lyc?.[i]?.[0] < currentTimtNum.value && currentTimtNum.value < lyc?.[i + 1]?.[0]) {
      lycindex.value = i
      if (scroll.value) {
        scrolls.value?.scrollTo(0, (lycindex.value - 6) * 40)
        console.log(lycindex.value)
      }
    }
  }
}
let percentage = computed(() => {
  return (currentTimtNum.value / durationNum.value) * 100
})
// play
let icon = computed(() => {
  return playState.value ? 'icon-bofang1' : 'icon-bofang'
})
let playState = ref(false)
function handlePlay() {
  playState.value = !playState.value
  if (playState.value) {
    audio.value?.play()
  } else {
    audio.value?.pause()
  }

  console.log(playState.value)
}
function handleEnd() {
  playState.value = false
}

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

// 显示歌词
let show = ref(false)
let scrolls = ref()
let scroll = ref()
let lycindex = ref(0)
function showlyc() {
  show.value = !show.value
  setTimeout(() => {
    scroll.value = new BScroll(scrolls.value)
  }, 100)
}
</script>
<style scoped lang="less">
.audio {
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  z-index: 21;

  .controls {
    display: flex;
    align-items: center;
    div {
      margin-left: 10px;
    }
  }
  .play {
    display: flex;

    .bg {
      height: 50px;
      margin-left: 10px;
      margin-right: 10px;
      img {
        width: 50px;
        height: 50px;
      }
    }
    audio {
      height: 50px;
    }
    .progress {
      font-size: 10px;
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      width: 300px;
      span {
        margin-left: 15px;
      }
    }
    .persent {
      display: flex;
      align-items: flex-end;
      height: 50px;
      margin-left: 10px;
      font-size: 12px;
    }
    .extra {
      display: flex;
      align-items: flex-end;
      margin-left: 20px;
    }
  }
}

.showlyc {
  position: absolute;
  left: 200px;
  top: -663.6px;
  height: calc(100vh - 90px);
  width: calc(100vw - 280px);
  background-color: aqua;
  overflow: hidden;

  z-index: 1000;
}

.wrapper {
  width: 100%;
  height: 520px;
  text-align: center;
  overflow: hidden;
  cursor: default;
  user-select: none;
  font-size: 15px;
  .items {
    height: 40px;
    color: gray;
  }
  .item_actice {
    color: #fff;
    transition: all 0.5s ease;
    font-size: 18px;
  }
}
.right {
  height: 100%;
  width: calc(100% - 150px);
  position: absolute;
  left: 200px;
  top: 100px;
}
</style>
