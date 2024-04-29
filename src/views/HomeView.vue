<template>
  <div class="container">
    <header class="header">
      <div class="logo">
        <img
          src="/assets/images/logo.svg"
          class="logo-img"
          alt="S.Oliver logo"
        />
      </div>
    </header>
    <ProductList />
    <footer>copyright S.Oliver 2024</footer>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import ProductList from "@/components/ProductList.vue";

@Options({
  components: {
    ProductList,
  },
})
export default class HomeView extends Vue {}
</script>
