import { defineStore } from 'pinia'

export const useUiStore = defineStore('ui', () => {
  const showDrawer = ref(null)
  const usedTheme = ref('light')
  const changeTheme = () => {
    usedTheme.value = usedTheme.value === 'light' ? 'dark' : 'light'
  }

  return {
    showDrawer,
    usedTheme,
    changeTheme,
  }
})
