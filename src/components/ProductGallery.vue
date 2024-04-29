<template>
  <div class="gallery-section">
    <div
      class="slides-container"
      :style="{ transform: `translateX(-${currentIndex * 100}%)` }"
    >
      <div
        class="slide"
        v-for="(picture, index) in pictures"
        :key="index"
        :style="{ backgroundImage: 'url(' + picture + ')' }"
      />
    </div>
    <div class="navigation">
      <span
        v-for="(picture, index) in pictures"
        :key="'nav-' + index"
        class="nav-dot"
        :class="{ active: index === currentIndex }"
        @click="goToSlide(index)"
      >
      </span>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, ref } from "vue";

export default defineComponent({
  name: "ProductGallery",
  props: {
    pictures: {
      type: Array as PropType<string[]>,
      required: true,
    },
  },
  setup() {
    const currentIndex = ref(0);

    const goToSlide = (index: number) => {
      currentIndex.value = index;
    };

    return { currentIndex, goToSlide };
  },
});
</script>
