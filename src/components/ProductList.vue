<template>
  <div class="container product-list-section">
    <h1>Oberteile für Herren</h1>
    <div class="product-list" v-if="products.length">
      <div class="card" v-for="product in products" :key="product.id">
        <div
          class="product-image"
          @click="openPopup(product)"
          v-if="product.pictures.length"
        >
          <img :alt="product.name" :src="product.pictures[0]" loading="lazy" />
        </div>
        <div class="product-info">
          <h4 class="brand-name">{{ product.brand.name }}</h4>
          <h2 class="product-name">{{ product.name }}</h2>
          <p class="price">{{ product.price }}</p>
        </div>
      </div>
    </div>
    <h2 v-else class="no-products">No products found.</h2>
    <ProductPopup
      v-if="state.isPopupOpen"
      :product="state.selectedProduct"
      @closePopup="closePopup"
    />
  </div>
</template>

<script lang="ts">
import axios from "axios";
import { Options, Vue } from "vue-class-component";
import ProductPopup from "./ProductPopup.vue";
import { Products, ProductListState } from "@/types";
import config from "@/config.js";

@Options({
  components: {
    ProductPopup,
  },
})
export default class ProductList extends Vue {
  products: Products[] = [];
  state: ProductListState = {
    isPopupOpen: false,
    selectedProduct: {},
  };

  async mounted() {
    try {
      const apiUrl = config.API_ENDPOINT;
      const response = await axios.get(apiUrl + "/products");
      this.products = response.data.products;
    } catch (error) {
      console.error("There was an error fetching the products:", error);
    }
  }

  openPopup(product: any) {
    this.state.selectedProduct = product;
    this.state.isPopupOpen = true;
    document.body.classList.add("no-scroll");
  }

  closePopup() {
    this.state.isPopupOpen = false;
    document.body.classList.remove("no-scroll");
  }
}
</script>
