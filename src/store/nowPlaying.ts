import { defineStore } from 'pinia'

import { usePlayList } from './playList'

export const useNowPlaying = defineStore('nowplaying', {
  state() {
    return {
      song: {
        ar: []
      }
    }
  }
})
