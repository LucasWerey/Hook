<template>
  <div
    class="flex h-[15rem] w-[15rem] select-none flex-col justify-between gap-2 rounded-b-md bg-basic-white p-2 shadow"
  >
    <div></div>
    <Button
      :type="'default'"
      :icon="'none'"
      :state="'active'"
      :iconPosition="'none'"
      :styled="'fill'"
      :isLight="true"
      class="w-full"
      @click="disconnect"
    >
      Se déconnecter
    </Button>
  </div>
</template>

<script setup lang="ts">
const disconnect = () => {
  AuthenticationUtils.removeToken()
  router.push({ name: 'home' })
}
</script>
