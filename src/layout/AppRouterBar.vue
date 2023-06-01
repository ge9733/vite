<template>
  <RouterView v-slot="{ Component }" :key="route.path">
    <Transition>
      <KeepAlive>
        <component :is="Component"></component>
      </KeepAlive>
    </Transition>
  </RouterView>
</template>
<script setup lang="ts">
import { ref, reactive } from 'vue'
import { useRoute } from 'vue-router'
let route = useRoute()
</script>
<style scope></style>
