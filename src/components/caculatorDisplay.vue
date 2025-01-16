<template>
  <view
    @touchstart="onTouchStart"
    @touchmove="onTouchMove"
    class="text-7xl text-end ml-auto pr-7 box-border text-white"
    >{{ displayValue }}</view
  >
</template>

<script setup lang="ts">
defineProps({
  displayValue: {
    type: String,
    default: "0",
  },
});
function debounce<T extends Function>(func: T, wait: number) {
  let timeout;
  return function (this, ...args) {
    clearTimeout(timeout);
    const context = this;
    timeout = setTimeout(() => {
      func.apply(context, args);
    }, wait);
  };
}

const emit = defineEmits();
let touchStartX = 0;
function onTouchStart(e) {
  touchStartX = e.touches[0].clientX;
}
const debounceEmit = debounce(() => emit("touchDelete"), 400);
function onTouchMove(e) {
  const deltaX = Math.round(e.touches[0].clientX) - Number(touchStartX);
  if (Math.abs(deltaX) > 80) {
    debounceEmit();
  }
}

//todo:slide to the left delete displayValue
</script>