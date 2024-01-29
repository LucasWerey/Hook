<template>
  <div
    class="audio-player flex max-h-[88px] w-fit items-center justify-center rounded-2xl border border-basic-lightgrey px-6"
  >
    <div class="controls flex items-center gap-2">
      <div class="play-button flex h-8 w-8 cursor-pointer items-center" @click="togglePlay">
        <IconsBase name="play" color="moonstone" v-if="!isPlaying" />
        <svg
          v-else
          class="pause-icon"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="#3AAFA9"
          width="32"
          height="32"
        >
          <path d="M4 22h6V2H4v20zm10-20v20h6V2h-6z" />
        </svg>
      </div>
      <div class="progress-bars">
        <div
          v-for="bar in bars"
          :key="bar.id"
          class="progress-bar bottom-0 w-[1.3%] rounded-xl"
          :class="{
            'bg-basic-grey': bar.color === '#ccc',
            'bg-primary-moonstone': bar.color === '#3498db'
          }"
          :style="{
            height: bar.height,
            bottom: '50%',
            transform: 'translateY(50%)',
            left: bar.left + '%'
          }"
        ></div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'
import coldplayMp3 from '../../../assets/audio/Coldplay.mp3'

interface Bar {
  id: number
  color: string
  left: number
  height: string
}

const audio = new Audio(coldplayMp3)
const isPlaying = ref(false)
const numberOfBars = 75
const barHeights = [10, 21, 36, 40, 36, 21, 6, 23, 39, 33, 24] // Add more values as needed

const bars = ref<Bar[]>(
  Array.from({ length: numberOfBars }, (_, index) => {
    const waveHeight = barHeights[index % barHeights.length]
    return {
      color: '#ccc',
      height: waveHeight + 'px', // Convert the height to a pixel value
      id: index,
      left: (index / numberOfBars) * 100
    }
  })
)

const togglePlay = () => {
  isPlaying.value = !isPlaying.value
  isPlaying.value ? audio.play() : audio.pause()
}

const updateProgress = () => {
  const percentage = (audio.currentTime / audio.duration) * 100

  bars.value = bars.value.map((bar, index) => {
    return {
      ...bar,
      color: (index / numberOfBars) * 100 <= percentage ? '#3498db' : '#ccc'
    }
  })
}

onMounted(() => {
  audio.addEventListener('timeupdate', updateProgress)
})

onBeforeUnmount(() => {
  audio.removeEventListener('timeupdate', updateProgress)
})
</script>

<style scoped>
.audio-player {
  display: flex;
  flex-direction: column;
  height: 100px;
}

.controls {
  display: flex;
  align-items: center;
}

.play-button {
  cursor: pointer;
  margin-right: 10px; /* Adjust as needed */
}

.play-icon,
.pause-icon {
  width: 24px;
  height: 24px;
}

.progress-bars {
  width: 300px; /* Adjust the width of the progress bars container as needed */
  height: 40px; /* Adjust the height of the progress bars container as needed */
  position: relative;
  overflow: hidden;
}

.progress-bar {
  width: 1%; /* Adjust the width of each bar as needed */
  position: absolute;
  bottom: 0;
}
</style>
