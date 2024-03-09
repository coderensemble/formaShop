<template>
        <div class="card-cart-container">
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
        </div>
    </div>
    </div>
</template>

<script setup>
import { ref } from "vue";
import { products } from '../products';

const filteredList = ref(products.value);
const liked = ref([]);

const addToCart = (product) => {
  for (let i = 0; i < cart.value.length; i++) {
    if (cart.value[i].id === product.id) {
      return cart.value[i].quantity++;
    }
  }
  cart.value.push({
    ...product,
    quantity: 1,
  });
};

</script>

<style scoped>

</style>