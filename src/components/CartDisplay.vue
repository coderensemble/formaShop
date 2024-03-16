<template>
    <div>
        <transition name="cart-anim">
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
      </transition>
    </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { products } from '../products';
let cart = ref([]);

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

const cartTotalAmount = computed(() => {
  let total = 0;
  for (let item of cart.value) {
    total += item.quantity * item.price;
  }
  return total;
});

const itemTotalAmount = computed(() => {
  let itemTotal = 0;
  for (let item of cart.value) {
    itemTotal += item.quantity;
  }
  return itemTotal;
});


const cartPlusOne = (product) => {
  product.quantity++;
};

const cartMinusOne = (product, id) => {
  if (product.quantity == 1) {
    this.cartRemoveItem(id);
  } else {
    product.quantity = product.quantity - 1;
  }
};

const cartRemoveItem = (id) => {
  const index = cart.value.findIndex(item => item.id === id);
      if (index !== -1) {
        cart.value.splice(index, 1);
      }
};
</script>

<style scoped>

</style>