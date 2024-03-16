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
.card-cart-container {
  display: flex;
}
.card-container {
  display: flex;
  flex-wrap: wrap;
}
.card {
  margin: 0.4rem 1rem 0.4rem 0;
  background: white;
  border-radius: 4px;
  overflow: hidden;
  position: relative;
  box-shadow: 0 0px 6px rgba(51, 51, 51, 0.15);
  transition: 0.2s ease;
  width: 202px;
}
@media screen and (max-width: 600px) {
  .card {
    margin-right: 0.2rem;
  }
}
.card:hover {
  transform: scale(1.04);
}
.card:hover img {
  transform: scale(1.08);
}
.card:hover .card-text {
  opacity: 1;
  bottom: 2.2rem;
}
.img-container {
  overflow: hidden;
}
.img-container img {
  height: 210px;
  transition: 0.4s ease;
}
.card-text {
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
.card-text h3 {
  font-size: 1.2rem;
  padding-right: 4px;
}
.card-text span {
  background: #2eb7eb;
  font-weight: bold;
  padding: 4px 6px;
  color: white;
  border-radius: 4px;
}
.card-icons {
  display: flex;
  align-items: start;
  justify-content: space-around;
  height: 40px;
}
.card-icons i {
  padding: 3px 5px;
  transition: 0.2s;
  cursor: pointer;
}
.card-icons i:hover {
  animation: scaler 0.8s infinite linear;
}
.fa-heart:hover {
  color: rgba(251, 38, 38, 0.5);
}
.fa-shopping-cart {
  font-size: 16px;
  color: #2eb7eb;
}
.like-container input {
  display: none;
}
.like-container input:checked + label i {
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
}
</style>