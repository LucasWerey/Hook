export function useMobileScreen() {
  const isMobile = ref(window.innerWidth <= 425)

  const updateIsMobile = () => {
    isMobile.value = window.innerWidth <= 425
  }

  onMounted(() => {
    window.addEventListener('resize', updateIsMobile)
  })

  onUnmounted(() => {
    window.removeEventListener('resize', updateIsMobile)
  })

  return isMobile
}
