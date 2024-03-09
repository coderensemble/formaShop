<script setup>
import { ref, computed } from "vue";
import Home from "@/pages/Home.vue";
import ShoppingCart from "@/pages/ShoppingCart.vue";
import UserSettings from "@/pages/UserSettings.vue";
import WishList from "@/pages/WishList.vue";

const routes = {
  "/": Home,
  "/shopping-cart": ShoppingCart,
  "/user-settings": UserSettings,
  "/wish-list": WishList,
};

const currentPath = ref(window.location.hash);

window.addEventListener("hashchange", () => {
  currentPath.value = window.location.hash;
});

const currentView = computed(() => {
  return routes[currentPath.value.slice(1) || "/"];
});
</script>

<template>
  <nav>
    <div class="nav-container">
      <div id="logo">
        <a href="#/"><img src="../assets/img/logo-html.jpg" alt="logo" /></a>
        <p class="text-center" id="text">Aspiration Sport Shop</p>
      </div>

      <ul id="icons">
        <li>
          <a href="#/user-settings"><i class="fa-solid fa-user"></i></a>
        </li>
        <li>
          <a href="#/wish-list/"><i class="fa fa-heart"></i></a>
          <span id="nav-notif"></span>
        </li>
        <li>
          <a href="#/shopping-cart"><i class="fa-solid fa-basket-shopping"></i></a>
        </li>
      </ul>
    </div>
    <component :is="currentView" />
  </nav>
</template>

<style scoped>
nav {
  padding: 0.8rem 2.4rem;
  background: rgba(255, 255, 255, 0.97);
  position: sticky;
  width: 100%;
  z-index: 2;
  box-shadow: 0 2px 4px -3px rgba(51, 51, 51, 0.2);
}
nav .nav-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1050px;
  margin: 0 auto;
}
nav .nav-container #text {
  font-size: 15px;
  width: 34%;
}

nav .nav-container #logo {
  display: flex;
  height: 32px;
  width: 66%;
}
nav .nav-container #logo img {
  height: 100%;
}
nav .nav-container #icons {
  display: flex;
  font-size: 24px;
  width: 34%;
  justify-content: flex-end;
}
nav .nav-container #icons li {
  margin-left: calc(35% + 8px);
}
nav .nav-container #icons li a {
  position: relative;
}
nav .nav-container #icons #nav-not {
  height: 8px;
  width: 8px;
  border-radius: 50%;
  background: #ff2929;
  position: absolute;
  visibility: hidden;
  opacity: 0;
  transition: 0.6s;
  transform: translate(-4px, -1px);
}
nav .nav-container #icons i {
  transition: 0.25s;
  cursor: pointer;
}
nav .nav-container #icons i:hover {
  color: rgba(34, 34, 34, 0.65);
}
</style>
