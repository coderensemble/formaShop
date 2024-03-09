<template>
  <div class="input-group mb-3">
    <input v-model="searchKey" type="search" id="search" placeholder="rechercher..." autocomplete="off" />
    <span v-if="searchKey && filteredList.length > 0">
      {{ filteredList.length }} résultat<span v-if="filteredList.length > 1">s</span></span
    >

      <div v-if="filteredList.length === 0" class="no-result">
          <h3>Désolé</h3>
          <p>Aucun résultat trouvé</p>
        </div>
 
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { products } from '../products'

let searchKey = ref("");

const filteredList = computed(() => {
  return products.value.filter((product) => {
    return product.description.toLowerCase().includes(searchKey.value.toLowerCase());
  });
});

</script>

<style scoped>

</style>
