const breakpoints = {
  desktop: 1024,
  largeDesktop: 1440,
  mobile: 425,
  tablet: 768
}

/**
 * A utility function to determine the current screen size.
 * It returns an object with four reactive properties: `isMobile`, `isTablet`, `isDesktop`, and `isLargeDesktop`.
 * Each property is `true` if the current screen width falls within the corresponding range, and `false` otherwise.
 * The function also sets up event listeners to update these properties whenever the window is resized.
 *
 * @returns {Object} An object containing the following properties:
 * - `isMobile`: A boolean indicating whether the screen width is less than or equal to 425px.
 * - `isTablet`: A boolean indicating whether the screen width is between 426px and 768px.
 * - `isDesktop`: A boolean indicating whether the screen width is between 769px and 1024px.
 * - `isLargeDesktop`: A boolean indicating whether the screen width is greater than 1024px.
 */

export function useScreenSize() {
  const isMobile = ref(window.innerWidth <= breakpoints.mobile)
  const isTablet = ref(
    window.innerWidth <= breakpoints.tablet && window.innerWidth > breakpoints.mobile
  )
  const isDesktop = ref(
    window.innerWidth <= breakpoints.desktop && window.innerWidth > breakpoints.tablet
  )
  const isLargeDesktop = ref(window.innerWidth > breakpoints.desktop)

  const updateScreenSize = () => {
    isMobile.value = window.innerWidth <= breakpoints.mobile
    isTablet.value =
      window.innerWidth <= breakpoints.tablet && window.innerWidth > breakpoints.mobile
    isDesktop.value =
      window.innerWidth <= breakpoints.desktop && window.innerWidth > breakpoints.tablet
    isLargeDesktop.value = window.innerWidth > breakpoints.desktop
  }

  onMounted(() => {
    window.addEventListener('resize', updateScreenSize)
  })

  onUnmounted(() => {
    window.removeEventListener('resize', updateScreenSize)
  })

  return { isDesktop, isLargeDesktop, isMobile, isTablet }
}
