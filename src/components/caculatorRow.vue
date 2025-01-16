<template>
  <view class="flex gap-4">
    <button
      @tap="() => onKeyTap(row)"
      :class="row === '0' ? 'justify-start w-40 pl-10' : 'justify-center'"
      class="flex items-center size-20 h-20 rounded-full overflow-clip box-border p-0 text-white"
      v-for="row in colume"
      :key="row"
      :style="{
        'background-color': `rgb(${getKeysBgColor(row)})`,
        color: `${getKeysColor(row)}`,
      }"
    >
      <text class="overflow-hidden text-3xl">{{ row }}</text>
    </button>
  </view>
</template>

<script setup lang="ts">
const props = defineProps<{ colume: string[] }>();
const emit = defineEmits();
function onKeyTap(value: string) {
  emit("onTap", value);
}

function getKeysBgColor(key: string) {
  const caculateOpt = ["÷", "×", "-", "=", "+"];
  if (caculateOpt.includes(key)) {
    return "251,142,15";
  }
  const functionOpt = ["AC", "⁺/₋", "%", "C"];
  if (functionOpt.includes(key)) {
    return "148,148,148";
  }
  return "38,38,38";
}
function getKeysColor(key: string) {
  const functionOpt = ["AC", "⁺/₋", "%", "C"];
  if (functionOpt.includes(key)) {
    return "#000";
  }
  return "#fff";
}
</script>

<style>
</style>