<template>
  <div class="flex w-full flex-row gap-6">
    <img :src="avatarUrl" type="photo" alt="avatar" class="h-40 w-40" />
    <div class="flex w-full flex-col justify-between">
      <div class="flex items-center gap-4">
        <h1 class="text-16 font-800">
          {{ firstName }} <span class="uppercase">{{ lastName }}</span>
        </h1>
        <div
          class="flex items-center gap-1 rounded bg-basic-verylightgrey px-2 font-eina1 text-4 text-basic-darkgrey"
        >
          <p>Suggéré à</p>
          <span
            class="text-8"
            :class="parseInt(offerMatchs) > 90 ? 'text-success' : 'text-warning'"
          >
            {{ offerMatchs }}
          </span>
          <IconsBase name="info" size="small" color="darkgrey" />
        </div>
      </div>
      <ChipContainer :label="degree" class="max-w-fit" />
      <div class="flex flex-col gap-2 font-eina1 text-4 text-basic-darkgrey">
        <div class="flex gap-10">
          <div class="flex items-center gap-2 lowercase">
            <IconsBase name="mail" size="small" color="darkgrey" />
            {{ eMail }}
          </div>
          <div class="flex items-center gap-2 lowercase tracking-tight">
            <IconsBase name="phone" size="small" color="darkgrey" />
            {{ formattedNumber }}
          </div>
        </div>
        <div class="flex items-center gap-2">
          <IconsBase name="mapPin" size="small" color="darkgrey" />
          {{ address }}
        </div>
      </div>
    </div>
    <div class="flex flex-col items-center justify-end gap-2">
      <Button type="default" state="active" styled="outlined" class="max-w-72 uppercase">
        Télécharger le CV
      </Button>
      <Button
        type="default"
        :state="buttonState ? 'active' : 'disabled'"
        styled="fill"
        class="max-w-72 cursor-pointer uppercase"
        @click="buttonState = !buttonState"
      >
        Ce profil m'intéresse
      </Button>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  data: { required: true, type: Object }
})

const buttonState = ref(true)

const studentData = computed(() => props.data.student)
const offerData = computed(() => props.data.offer)
const userData = computed(() => props.data.user)

const userId = computed(() => userData.value?._id?.$oid)
const firstName = computed(() => userData.value.firstname)
const lastName = computed(() => userData.value.lastname)
const eMail = computed(() => userData.value.email)
const phoneNumber = computed(() => userData.value.phone)
const address = computed(() => userData.value.address)

const degree = computed(() => studentData.value.level)

const offerMatchs = computed(() => computeOfferMatches(offerData, userId))

const formattedNumber = computed(() => formatPhoneNumber(phoneNumber))

const avatarUrl = computed(() => computeAvatarUrl(firstName))

function computeOfferMatches(
  offerData: ComputedRef<Record<string, any>>,
  userId: ComputedRef<string>
) {
  if (offerData.value && offerData.value.matchs) {
    const match = offerData.value.matchs.find(
      (match: any) => match.student_id.$oid === userId.value
    )
    return match ? match.globalMatch : null
  }
  return null
}

function formatPhoneNumber(phoneNumber: any) {
  return phoneNumber.value === '' ? '' : phoneNumber.value.match(/.{1,2}/g).join(' ')
}

function computeAvatarUrl(firstName: ComputedRef<string>) {
  if (firstName) {
    return `https://api.dicebear.com/7.x/micah/svg?seed=${firstName.value}&radius=50&mouth=pucker,smile,smirk,laughing&backgroundColor=b6e3f4,ffd5dc,d1d4f9,c0aede,ffdfbf`
  }
  return 'https://api.dicebear.com/7.x/micah/svg?seed=hugo&radius=50&mouth=pucker,smile,smirk,laughing&backgroundColor=b6e3f4,ffd5dc,d1d4f9,c0aede,ffdfbf'
}
</script>
