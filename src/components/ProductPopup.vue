<template>
  <div class="overlay" />
  <div class="product-popup">
    <a href="javascript:;" class="btn-close" @click="close" />
    <div v-if="singleProduct.variants.length > 0">
      <div class="product-section">
        <ProductGallery :pictures="selectedVariant.pictures" />
        <div class="product-info">
          <strong class="condition">{{ selectedVariant.condition }}</strong>
          <h3>{{ product.name }}</h3>
          <span class="brand">
            <img
              :src="'/assets/' + product?.brand?.logo"
              :alt="product?.brand?.name"
            />
          </span>
          <div class="price">
            <span v-if="selectedVariant.specialPrice" class="discount">
              {{ getFormattedPrice(selectedVariant.specialPrice) }}
            </span>
            <span
              :class="{ 'discount-active': selectedVariant.specialPrice }"
              class="normal"
            >
              {{ getFormattedPrice(selectedVariant.price) }}
            </span>
          </div>
          <div class="variants">
            Colors: <strong>{{ selectedVariant.color }}</strong>
            <ul class="color-options">
              <li
                v-for="color in singleProduct.availableColors"
                :key="color"
                :class="{ active: selectedVariant.color === color.name }"
                @click="selectColor(color.name, selectedVariant.size)"
              >
                <img :src="color.thumbnail" :alt="color.name" />
              </li>
            </ul>
          </div>
          <div class="variants">
            Sizes: <strong>{{ selectedVariant.size }}</strong>
            <ul class="size-options">
              <li
                v-for="size in singleProduct.availableSizes"
                :key="size"
                :class="{ active: selectedVariant.size === size }"
                @click="selectSize(size, selectedVariant.color)"
              >
                {{ size }}
              </li>
            </ul>
          </div>
          <p class="stock-warning" v-if="selectedVariant.stock < 5">
            Hurry! Only few items remains of this product
          </p>
        </div>
      </div>
      <div class="product-additional-details">
        <ProductTabs :product="selectedVariant" />
      </div>
      <div class="popup-footer">
        <div class="product-title">
          {{ product.name }}
        </div>
        <div class="product-cta">
          <button @click="addToCart" class="btn btn-primary cart-icon">
            Add to Cart
          </button>
        </div>
      </div>
    </div>
    <h3 v-else class="no-product-found">Product not found!</h3>
  </div>
</template>

<script lang="ts">
import axios from "axios";
import { defineComponent, onMounted, reactive } from "vue";
import { Product, Variant } from "@/types";
import ProductGallery from "./ProductGallery.vue";
import ProductTabs from "./ProductTabs.vue";
import { Vue } from "vue-class-component";
import config from "@/config";

export default defineComponent({
  name: "ProductPopup",
  props: {
    product: {},
  },
  components: {
    ProductGallery,
    ProductTabs,
  },
  setup() {
    // Initialize the product with a reactive state using the Product interface
    const singleProduct = reactive<Product>({
      id: "",
      name: "",
      availableColors: [],
      availableSizes: [],
      variants: [],
    });

    // Initialize the selected variant with a reactive state using the Variant interface
    const selectedVariant = reactive<Variant>({
      id: "",
      color: "",
      size: "",
      price: 0,
      specialPrice: 0,
      stock: 0,
      SKU: "",
      condition: "",
      pictures: [],
      productDetails: "",
      productFit: "",
      materialAndCare: "",
      sustainability: "",
    });

    onMounted(() => {
      const apiUrl = config.API_ENDPOINT;
      axios
        .post(apiUrl + "/product")
        .then((response) => {
          Object.assign(singleProduct, response.data);
          // Initialize with the first variant as selected, if available
          if (singleProduct.variants.length > 0) {
            Object.assign(selectedVariant, singleProduct.variants[0]);
          }
        })
        .catch((error) => console.error("Error fetching product:", error));
    });

    const selectVariant = (variant: Variant) => {
      Object.assign(selectedVariant, variant);
    };

    const selectSize = (size: string, color: string) => {
      const matchingVariant = singleProduct.variants.find(
        (variant) => variant.size === size && variant.color === color
      );

      if (matchingVariant) {
        selectVariant(matchingVariant);
      }
    };

    const selectColor = (color: string, size: string) => {
      const matchingVariant = singleProduct.variants.find(
        (variant) => variant.color === color && variant.size === size
      );

      if (matchingVariant) {
        selectVariant(matchingVariant);
      }
    };

    const getFormattedPrice = (price: any) => {
      // Create a formatter object for Euro currency formatting
      const formatter = new Intl.NumberFormat("de-DE", {
        style: "currency",
        currency: "EUR",
      });

      // Format the price using the formatter and return
      return formatter.format(price);
    };

    const addToCart = () => {
      // Implement add to cart functionality here
      console.log("Added to cart:", selectedVariant);
    };

    function close(this: Vue) {
      this.$emit("closePopup");
    }
    // Expose the product, selectedVariant, selectVariant, and addToCart to the template
    return {
      singleProduct,
      selectedVariant,
      selectSize,
      selectColor,
      getFormattedPrice,
      selectVariant,
      close,
      addToCart,
    };
  },
});
</script>
