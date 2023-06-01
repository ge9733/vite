import { defineStore } from 'pinia'
import { reactive } from 'vue'

const useLatestPlay = defineStore('latestplay', () => {
  const latestPlay = reactive([])

  return {
    latestPlay
  }
})
