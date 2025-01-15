<template>
  <view
    class="text-7xl text-end font-bold ml-auto pr-7 box-border text-white"
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

//todo:slide to the left delete displayValue
</script>
