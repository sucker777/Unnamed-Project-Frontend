import { defineStore } from 'pinia'

export const useAppStore = defineStore('app', {
  state: () => {
    return {
      authenticated: false,
      name: '',
      needRefresh: false
    }
  }
})