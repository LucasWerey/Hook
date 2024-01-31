<template>
  <div class="flex w-full flex-col gap-12 text-basic-black">
    <div class="flex w-full items-center gap-8">
      <IconsBase
        name="moveLeft"
        class="h-10 w-10 cursor-pointer"
        color="darkgrey"
        @click="goToMyspace"
      />
      <h2 class="self-baseline text-nowrap text-16 font-800">Ma demande</h2>
    </div>
    <DemandDetailHeader v-if="data && data.profile" :demandInfo="data.profile.jobWanted" />
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  studentId: {
    required: true,
    type: String
  }
})

const studentId = computed(() => props.studentId)

let data = ref()

onMounted(async () => {
  //@ts-ignore
  data.value = await getStudent(studentId.value)
})

const router = useRouter()

const goToMyspace = () => {
  router.push('/myspace')
}
</script>
