<script setup>
import { ref, computed } from 'vue'
import Home from '@/components/pages/Home.vue';
import ShoppingCart from '@/components/pages/ShoppingCart.vue';
import UserSettings from '@/components/pages/UserSettings.vue';
import WishList from '@/components/pages/WishList.vue';


const routes = {
  '/': Home,
  '/shopping-cart': ShoppingCart,
  '/user-settings': UserSettings,
  '/wish-list': WishList,
}

const currentPath = ref(window.location.hash)

window.addEventListener('hashchange', () => {
  currentPath.value = window.location.hash
})

const currentView = computed(() => {
  return routes[currentPath.value.slice(1) || '/']
})
</script>

<template>
<div>
  <div class="nav-container">
      <div id="logo">
        <a href="#/"><img src="./src/assets/image/logo-html.jpg" alt="logo" /></a>
      </div>
      
      <ul id="icons">
        <li>
          <a href="#/shopping-cart"><i class="fa-solid fa-user"></i></a>
        </li>
        <li>
          <a href="#/user-settings"><i class="fa fa-heart"></i></a>
          <span id="nav-notif"></span>
        </li>
        <li>
          <a href="#/wish-list/"><i class="fa-solid fa-basket-shopping"></i></a>
        </li>
      </ul>
    </div>




<component :is="currentView" />
</div>
</template>

<style scoped>

</style>
