<template>
   <p>{{ horloge }}</p>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const horloge = ref('')

onMounted(() => {
  setInterval(() => {
    const d = new Date();
    horloge.value = d.toLocaleTimeString();
  }, 1000);
});
</script>

<style lang="scss" scoped>

</style>

<!--v-base3 pour le squellette-->