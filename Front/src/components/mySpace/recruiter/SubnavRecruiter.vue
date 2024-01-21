<template>
  <div class="flex h-12 w-full flex-row items-end gap-16 text-basic-black">
    <h2 class="self-baseline text-nowrap text-16 font-800">Mon espace</h2>
    <div class="relative flex w-full flex-row gap-16 border-b border-b-basic-grey">
      <ul class="flex w-full gap-16 text-4 text-basic-grey">
        <li
          v-for="(page, index) in pages"
          :key="index"
          :class="{
            'active-page text-primary-moonstone': activePage === index,
            'left-to-right': direction === 'ltr',
            'right-to-left': direction === 'rtl'
          }"
          class="relative cursor-pointer select-none"
          @click="changePage(index, activePage < index ? 'ltr' : 'rtl')"
        >
          {{ page }}
        </li>
      </ul>
      <div
        id="underline"
        :style="{ width: underlineWidth + 'px', left: underlineLeft + 'px' }"
        class="absolute bottom-[-0.05rem] left-0 h-[0.1rem] w-0 rounded-full bg-primary-moonstone transition-all duration-500"
      ></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch, nextTick, defineEmits } from 'vue'

const pages = ['Les offres', 'Profils']
const activePage = ref(0)
const direction = ref('ltr')
const underlineWidth = ref(0)
const underlineLeft = ref(0)

const emit = defineEmits(['update-page'])

const changePage = (page: number, dir: 'ltr' | 'rtl') => {
  activePage.value = page
  direction.value = dir
  emit('update-page', pages[page])
}

watch(
  [activePage, direction],
  async () => {
    await nextTick()
    const activeElement = document.querySelector('.active-page')
    if (activeElement) {
      underlineWidth.value = activeElement.offsetWidth
      underlineLeft.value = activeElement.offsetLeft
    }
  },
  { immediate: true }
)

onMounted(() => {
  changePage(activePage.value, direction.value)
})
</script>
