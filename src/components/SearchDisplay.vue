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
.home-container #search {
  margin: 1rem 1rem 2rem 0;
  height: 2.4rem;
  padding: 0 0.5rem;
  border-radius: 5px;
  transition: 0.4s ease;
  border: 2px solid rgba(51, 51, 51, 0.835);
}
.home-container #search:focus {
  outline: none;
  border: 2px solid #2eb7eb;
}
.no-result {
  margin: 0 4rem 0 0.4rem;
}
</style>
