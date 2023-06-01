import { defineStore } from 'pinia'
export const usePlayList = defineStore('playlist', {
  state: () => {
    return {
      playlist: []
    }
  }
})
