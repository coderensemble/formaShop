<script setup>
import { ref, computed } from "vue";
import { useCookies } from "vue3-cookies";

const { getCookie, setCookie } = useCookies();

const products = ref([
  { id: 1, description: "Ultimate", price: 150, img: "/assets/img/ultimate.jpg" },
  { id: 2, description: "Course d'orientation", price: 200, img: "" },
  { id: 3, description: "Roller", price: 200, img: "" },
  { id: 4, description: "Tir à l'arc", price: 200, img: "" },
  { id: 5, description: "Vélo Tout Terrain", price: 200, img: "" },
  { id: 6, description: "Rugby", price: 150, img: "" },
  { id: 7, description: "Skateboard", price: 200, img: "" },
  { id: 8, description: "Roller", price: 200, img: "" },
  { id: 9, description: "Slack Line", price: 200, img: "" },
  { id: 10, description: "Trail", price: 150, img: "" },
]);

let searchKey = ref("");
let liked = ref([]);
let cart = ref([]);

const filteredList = computed(() => {
  return products.value.filter((product) => {
    return product.description.toLowerCase().includes(searchKey.value.toLowerCase());
  });
});

const getLikeCookie = () => {
  let cookieValue = JSON.parse($cookies.get("like"));
  liked.value = cookieValue || [];
};

const setLikeCookie = () => {
  document.addEventListener("input", () => {
    setTimeout(() => {
      let cookieValue = JSON.stringify(liked.value);
      $cookies.set("like", cookieValue);
    }, 300);
  });
};

const addToCart = (product) => {
  for (let i = 0; i < cart.value.length; i++) {
    if (cart.value[i].id === product.id) {
      return cart.value[i].quantity++;
    }
  }
  cart.value.push({
    id: product.id,
    img: product.img,
    description: product.description,
    price: product.price,
    quantity: 1,
  });
};

const cartRemoveItem = (id) => {
  cart.value.splice(id, 1);
};
</script>

<template>
  <div class="container">
    <h1 class="my-4">ARTICLES</h1>

    <!-- SEARCH DISPLAY -->
    <div class="input-group mb-3">
      <input v-model="searchKey" type="search" id="search" placeholder="rechercher..." autocomplete="off" />
      <span v-if="searchKey && filteredList.length > 0">
        {{ filteredList.length }} résultat<span v-if="filteredList.length > 1">s</span></span
      >
    </div>

    <!-- CARD DISPLAY -->
    <div class="row">
      <div
        v-for="product in filteredList"
        :key="product.id"
        class="col-lg-4 col-md-6 mb-4"
        style="width: 18rem; height: 18rem">
        <img class="" :src="product.img" alt="Card image" />
        <div class="card-body">
          <h5 class="card-title">{{ product.description }}</h5>
          <p class="card-text">{{ product.price }}€</p>
          <div class="card-icons">
            <div class="like-container">
              <input
                type="checkbox"
                name="checkbox"
                v-bind:id="product.id"
                :value="product.id"
                v-model="liked"
                @click="setLikeCookie" />
              <label v-bind:for="product.id">
                <i class="fas fa-heart"></i>
              </label>
            </div>
            <button class="btn btn-primary" v-on:click="addToCart(product)">
              <i class="fa-solid fa-cart-shopping"></i>
            </button>
          </div>
        </div>
      </div>

      <!-- No result message -->
      <div v-if="filteredList.length === 0" class="no-result">
        <h3>Désolé</h3>
        <p>Aucun résultat trouvé</p>
      </div>

      <!-- Cart display -->
      <div v-if="cart.length > 0" class="shopping-cart" id="shopping-cart">
        <h2>Panier</h2>

        <div class="item-group">
        <div v-for="product in cart" :key="product.id">
          <div>
            <h4>{{ product.description }}</h4>
            <p>{{ product.price }}€</p>
          </div>
          <div class="">
            <h6>quantité : {{ product.quantity }}</h6>
          </div>

          <div class="cart-icons">
            <button>
              <i class="fa fa-plus"></i>
            </button>
            <button>
              <i class="fa fa-minus"></i>
            </button>
            <button>
              <i class="fa fa-trash"></i>
            </button>
          </div>
        </div>
      </div>
    </div>

    </div>
  </div>
</template>

<style scoped></style>
