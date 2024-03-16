<script setup>
import { ref, computed, onMounted, watch } from "vue";
import { useCookies } from "vue3-cookies";
import SearchDisplay from "../components/SearchDisplay.vue";
import CardDisplay from "../components/CardDisplay.vue";
import CartDisplay from "../components/CartDisplay.vue";
import { products } from '../products';


let searchKey = ref("");
let liked = ref([]);
let cart = ref([]);

const filteredList = computed(() => {
  return products.value.filter((product) => {
    return product.description.toLowerCase().includes(searchKey.value.toLowerCase());
  });
});

const setLikeCookie = (liked) => {
  const { $cookies } = useCookies();

  // Écoute les changements dans la variable liked
  watch(liked, (newValue) => {
    // Définit le cookie "like" avec la nouvelle valeur de liked
    $cookies.set("like", JSON.stringify(newValue));
  });

  // Utilise onMounted pour exécuter le code une fois le composant monté
  onMounted(() => {
    // Vérifie si le cookie "like" existe déjà
    const existingLikeCookie = $cookies.get("like");
    if (existingLikeCookie) {
      // Si le cookie existe, met à jour la variable liked avec sa valeur
      liked.value = JSON.parse(existingLikeCookie);
    }
  });
};

// const cartTotalAmount = computed(() => {
//   let total = 0;
//   for (let item of cart.value) {
//     total += item.quantity * item.price;
//   }
//   return total;
// });

// const itemTotalAmount = computed(() => {
//   let itemTotal = 0;
//   for (let item of cart.value) {
//     itemTotal += item.quantity;
//   }
//   return itemTotal;
// });

// const addToCart = (product) => {
//   for (let i = 0; i < cart.value.length; i++) {
//     if (cart.value[i].id === product.id) {
//       return cart.value[i].quantity++;
//     }
//   }
//   cart.value.push({
//     ...product,
//     quantity: 1,
//   });
// };

// const cartPlusOne = (product) => {
//   product.quantity++;
// };

// const cartMinusOne = (product, id) => {
//   if (product.quantity == 1) {
//     this.cartRemoveItem(id);
//   } else {
//     product.quantity = product.quantity - 1;
//   }
// };

// const cartRemoveItem = (id) => {
//   const index = cart.value.findIndex(item => item.id === id);
//       if (index !== -1) {
//         cart.value.splice(index, 1);
//       }
// };
</script>

<template>
  <div class="home-container">
    <h1>FORMATION</h1>

    <!-- SEARCH DISPLAY -->
    <!-- <div class="input-group mb-3">
      <input v-model="searchKey" type="search" id="search" placeholder="rechercher..." autocomplete="off" />
      <span v-if="searchKey && filteredList.length > 0">
        {{ filteredList.length }} résultat<span v-if="filteredList.length > 1">s</span></span
      >
    </div> -->
    <searchDisplay :searchKey="searchKey" :filteredList="filteredList"></searchDisplay>
    

    <!-- CARD DISPLAY -->
    <CardDisplay :filteredList="filteredList" :liked="liked" :addToCart="addToCart"></CardDisplay>
    <!-- <div class="card-cart-container">
      <div class="card-container">
        <div v-for="product in filteredList" :key="product.id" class="card">

          <div class="img-container">
            <img v-bind:src="product.img" alt="Card image" />
          </div>

          <div class="card-text">
            <h3>{{ product.description }}</h3>
            <span>{{ product.price }}€</span>
          </div>

          <div class="card-icons">
            <div class="like-container">
              <input
                type="checkbox"
                name="checkbox"
                v-bind:id="product.id"
                :value="product.id"
                v-model="liked"
                @click="setLikeCookie()" />
              <label v-bind:for="product.id">
                <i class="fa fa-heart"></i>
              </label>
            </div>

            <div class="add-to-cart">
              <button v-on:click="addToCart(product)">
                <i class="fa-solid fa-basket-shopping"></i>
              </button>
            </div>
          </div>
        </div> -->

        <!-- No result message -->
        <!-- <div v-if="filteredList.length === 0" class="no-result">
          <h3>Désolé</h3>
          <p>Aucun résultat trouvé</p>
        </div> -->
      <!-- </div> -->

      <!-- Cart display -->
      <CartDisplay></CartDisplay>
      <!-- <transition name="cart-anim">
        <div v-if="cart.length > 0" class="shopping-cart" id="shopping-cart">
          <h2>Panier</h2>

          <transition-group name="item-anim" tag="div" class="item-group">
            <div v-for="product in cart" v-bind:key="product.id">
              <div class="img-container">
                <img v-bind:src="product.img" />
              </div>

              <div class="item-description">
                <h4>{{ product.description }}</h4>
                <p>{{ product.price }}€</p>
              </div>

              <div class="item-quantity">
                <h6>quantité : {{ product.quantity }}</h6>

                <div class="cart-icons">
                  <button v-on:click="cartPlusOne(product)">
                    <i class="fa fa-plus"></i>
                  </button>
                  <button v-on:click="cartMinusOne(product, id)">
                    <i class="fa fa-minus"></i>
                  </button>
                  <button v-on:click="cartRemoveItem(id)">
                    <i class="fa fa-trash"></i>
                  </button>
                </div>
              </div>
            </div>
          </transition-group>

          <div class="grand-total">
            <div class="total">
              <h2>Total</h2>
              <h2>{{ cartTotalAmount }}€</h2>
            </div>
            <h6>Total des articles: {{ itemTotalAmount }}</h6>
          </div>
          <div class="order-button">
            <button>Commander</button>
          </div>
        </div>
      </transition> -->
    </div>
  <!-- </div> -->
</template>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Ubuntu&display=swap");
/* :deep* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
  list-style: none;
  font-family: "Ubuntu", sans-serif;
  background: rgba(254, 254, 254, 0.8);
  padding-bottom: 4rem;
  color: #333;
  overflow-x: hidden;
} */

h1 {
  padding: 6rem 0 0 2.4rem;
}

a,
a:visited {
  color: #333;
}

/* button {
  border: none;
  background: none;
  outline: none;
  cursor: pointer;
} */
.home-container {
  max-width: 1250px;
  margin: 0 auto;
  padding-left: 2.4rem;
}
@media screen and (max-width: 600px) {
  .home-container {
    padding-left: 0.2rem;
  }
}
.home-container h1 {
  padding-left: 0;
}
/* .home-container .card-cart-container {
  display: flex;
} */
/* .home-container .card-cart-container .card-container {
  display: flex;
  flex-wrap: wrap;
} */
/* .home-container .card-cart-container .card-container .card {
  margin: 0.4rem 1rem 0.4rem 0;
  background: white;
  border-radius: 4px;
  overflow: hidden;
  position: relative;
  box-shadow: 0 0px 6px rgba(51, 51, 51, 0.15);
  transition: 0.2s ease;
  width: 202px;
} */
/* @media screen and (max-width: 600px) {
  .home-container .card-cart-container .card-container .card {
    margin-right: 0.2rem;
  }
}
.home-container .card-cart-container .card-container .card:hover {
  transform: scale(1.04);
}
.home-container .card-cart-container .card-container .card:hover img {
  transform: scale(1.08);
}
.home-container .card-cart-container .card-container .card:hover .card-text {
  opacity: 1;
  bottom: 1.8rem;
}
.home-container .card-cart-container .card-container .card .img-container {
  overflow: hidden;
}
.home-container .card-cart-container .card-container .card .img-container img {
  height: 210px;
  transition: 0.4s ease;
}
.home-container .card-cart-container .card-container .card .card-text {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.3rem 0.8rem;
  position: absolute;
  bottom: 2rem;
  opacity: 0;
  transition: 0.8s;
  width: 100%;
  height: 20vh;
  background: linear-gradient(0deg, white 40%, transparent 100%);
}
.home-container .card-cart-container .card-container .card .card-text h3 {
  font-size: 1.2rem;
  padding-right: 4px;
}
.home-container .card-cart-container .card-container .card .card-text span {
  background: #2eb7eb;
  font-weight: bold;
  padding: 4px 6px;
  color: white;
  border-radius: 4px;
}
.home-container .card-cart-container .card-container .card .card-icons {
  display: flex;
  align-items: start;
  justify-content: space-around;
  height: 10px;
}
.home-container .card-cart-container .card-container .card .card-icons i {
  padding: 3px 5px;
  transition: 0.2s;
  cursor: pointer;
}
.home-container .card-cart-container .card-container .card .card-icons i:hover {
  animation: scaler 0.8s infinite linear;
}
.home-container .card-cart-container .card-container .card .card-icons .fa-heart:hover {
  color: rgba(251, 38, 38, 0.5);
}
.home-container .card-cart-container .card-container .card .card-icons .fa-shopping-cart {
  font-size: 16px;
  color: #2eb7eb;
}
.home-container .card-cart-container .card-container .card .card-icons .fa-shopping-cart:hover {
  filter: brightness(125%);
}
.home-container .card-cart-container .card-container .card .card-icons .like-container input {
  display: none;
}
.home-container .card-cart-container .card-container .card .card-icons .like-container input:checked + label i {
  color: #fb2626;
  animation: heart 1.3s forwards ease;
}
@keyframes heart {
  0% {
    filter: hue-rotate(0deg);
    transform: scale(1);
  }
  50% {
    filter: hue-rotate(-270deg);
    transform: scale(1.3);
  }
  100% {
    filter: hue-rotate(0deg);
    transform: scale(1);
  }
} */
.home-container .card-cart-container .card-container .no-result {
  margin: 0 4rem 0 0.4rem;
}
.home-container .shopping-cart {
  transition: 0.4s ease;
  background: #2eb7eb;
  color: white;
  padding: 1.4rem;
  border-radius: 4px;
  min-width: 290px;
  box-shadow: 0 1px 6px rgba(51, 51, 51, 0.25);
  height: 100%;
  margin: -8rem 2.4rem 0 0;
}
.home-container .shopping-cart h2 {
  margin-bottom: 1rem;
  color: #333;
  text-align: center;
}
.home-container .shopping-cart .item-group {
  max-height: 400px;
  overflow-y: scroll;
  overflow-x: hidden;
  padding-right: 6px;
}
.home-container .shopping-cart .item-group::-webkit-scrollbar {
  display: none;
}
.home-container .shopping-cart .item-group .item {
  margin-bottom: 2.4rem;
  position: relative;
  display: grid;
  grid-template-columns: 50px 1fr;
  grid-template-rows: 60% 40%;
  grid-template-areas: "a b" "a c";
}
.home-container .shopping-cart .item-group .item:after {
  content: "";
  position: absolute;
  height: 1px;
  width: 100%;
  background: rgba(85, 85, 85, 0.2);
  left: 50%;
  bottom: -22px;
  transform: translateX(-50%);
}
.home-container .shopping-cart .item-group .item .img-container {
  grid-area: a;
  display: flex;
  align-items: center;
}
.home-container .shopping-cart .item-group .item .img-container img {
  height: 50px;
  width: 50px;
  border-radius: 50%;
  transform: scale(0);
  animation: img-scale 1s forwards;
}
@keyframes img-scale {
  to {
    transform: scale(1);
  }
}
.home-container .shopping-cart .item-group .item .item-description {
  grid-area: b;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-left: 10px;
}
.home-container .shopping-cart .item-group .item .item-description h4 {
  margin: 0 0.9rem 0.9rem 0;
  background: rgba(51, 51, 51, 0.1);
  padding: 3px 5px;
  border-radius: 4px;
  box-shadow: 0 1px 1px rgba(51, 51, 51, 0.15);
  transform: scaleX(0);
  transform-origin: left;
  animation: img-scale 1s forwards;
}
@keyframes img-scale {
  to {
    transform: scaleX(1);
  }
}
.home-container .shopping-cart .item-group .item .item-description p {
  transform: translateY(3px);
}
.home-container .shopping-cart .item-group .item .item-quantity {
  grid-area: c;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin-left: 10px;
}
.home-container .shopping-cart .item-group .item .item-quantity h6 {
  color: #333;
}
.home-container .shopping-cart .item-group .item .item-quantity .cart-icons {
  display: flex;
  justify-content: space-between;
  width: 30%;
  margin-left: 10px;
}
.home-container .shopping-cart .item-group .item .item-quantity .cart-icons button {
  transform: scaleY(0);
}
.home-container .shopping-cart .item-group .item .item-quantity .cart-icons button:nth-child(1) {
  animation: icon 0.5s ease forwards;
  animation-delay: 0.2s;
}
@keyframes icon {
  to {
    transform: scaleY(1);
  }
}
.home-container .shopping-cart .item-group .item .item-quantity .cart-icons button:nth-child(2) {
  animation: icon 0.5s ease forwards;
  animation-delay: 0.4s;
}
@keyframes icon {
  to {
    transform: scaleY(1);
  }
}
.home-container .shopping-cart .item-group .item .item-quantity .cart-icons button:nth-child(3) {
  animation: icon 0.5s ease forwards;
  animation-delay: 0.6s;
}
@keyframes icon {
  to {
    transform: scaleY(1);
  }
}
.home-container .shopping-cart .item-group .item .item-quantity .cart-icons i {
  font-size: 0.55rem;
  padding: 5px;
  margin: 0 2px;
  background: white;
  border-radius: 50%;
  color: #2eb7eb;
  transition: 0.3s ease;
}
.home-container .shopping-cart .item-group .item .item-quantity .cart-icons i:hover {
  background: #222;
  color: #2eb7eb;
}
.home-container .shopping-cart .grand-total h6 {
  color: #333;
}
.home-container .shopping-cart .grand-total .total {
  display: flex;
  justify-content: space-between;
  margin: 1.4rem 0 0.4rem;
}
.home-container .shopping-cart .grand-total .total h2 {
  color: white;
  margin-bottom: 0;
}
.home-container .shopping-cart .order-button {
  margin: 1rem auto 0;
  width: 100%;
  text-align: center;
}
.home-container .shopping-cart .order-button button {
  background: white;
  padding: 0.8rem;
  border-radius: 4px;
  box-shadow: 0 1px 6px rgba(51, 51, 51, 0.2);
  transition: all 0.2s ease;
  letter-spacing: 1px;
}
.home-container .shopping-cart .order-button button:hover {
  background: black;
  color: #2eb7eb;
  font-weight: bold;
  letter-spacing: 6px;
  animation: scaler 1.5s infinite linear;
}
.home-container .shopping-cart .order-button button:active {
  transform: scale(0.92);
}
.home-container .cart-anim-enter-active, .home-container .cart-anim-leave-active {
  transition: 1.3s cubic-bezier(0.23, 0.66, 0.08, 0.93);
  transform: translateX(0px);
}
.home-container .cart-anim-enter, .home-container .cart-anim-leave-to {
  opacity: 0;
  transform: translateX(400px);
}
.home-container .item-anim-enter-active, .home-container .item-anim-leave-active {
  opacity: 1;
  transition: 0.8s;
}
.home-container .item-anim-enter, .home-container .item-anim-leave-to {
  opacity: 0;
  transform: translateY(100px);
  transition: 0.7s;
}

@keyframes scaler {
  50% {
    transform: scale(1.1);
  }
  100% {
    transform: scale(1);
  }
}


</style>
