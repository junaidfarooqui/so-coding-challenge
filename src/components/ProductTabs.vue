<template>
  <div class="tab-list">
    <ul>
      <li
        v-for="tab in tabs"
        :key="tab.name"
        @click="openTab(tab.name)"
        :class="{ active: activeTab === tab.name }"
      >
        {{ tab.label }}
      </li>
    </ul>
  </div>
  <div class="tab-content">
    <div class="tab-pane details" v-show="activeTab === 'details'">
      <div v-html="product.productDetails" />
    </div>
    <div class="tab-pane fit" v-show="activeTab === 'fit'">
      <div v-html="product.productFit" />
    </div>
    <div class="tab-pane material" v-show="activeTab === 'material'">
      <div v-html="product.materialAndCare" />
    </div>
    <div
      class="tab-pane sustainability"
      v-show="activeTab === 'sustainability'"
    >
      <div v-html="product.sustainability" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { Variant } from "@/types";

export default defineComponent({
  name: "ProductTabs",
  props: {
    product: {
      type: Object as () => Variant,
      required: true,
      default: () => ({}),
    },
  },
  data() {
    return {
      activeTab: "details",
      tabs: [
        { name: "details", label: "Details" },
        { name: "fit", label: "Fit" },
        { name: "material", label: "Material & Care Instructions" },
        { name: "sustainability", label: "Sustainability" },
      ],
    };
  },
  methods: {
    openTab(tabName: string) {
      this.activeTab = tabName;
    },
  },
});
</script>
