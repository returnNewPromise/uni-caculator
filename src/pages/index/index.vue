<template>
  <view
    :style="{ paddingBottom: safeAreaInsets?.bottom + 'px' }"
    class="bg-black h-screen box-border flex flex-col justify-end font-sans"
  >
    <caculator-display
      @touchDelete="onBackSpace"
      :displayValue="disPlayValue"
    />
    <!-- keyboard -->
    <view class="flex flex-col gap-4 p-4">
      <!-- 行 -->
      <view v-for="(colume, index) in KeyBoard" :key="index">
        <!-- 列 -->
        <caculator-row
          :colume="colume"
          @onTap="(value: string) => setCaculateValue(value)"
        />
      </view>
    </view>
  </view>
</template>

<script lang="ts" setup>
import { computed, ref, watch } from "vue";
import caculatorRow from "@/components/caculatorRow.vue";
import expressionEval from "@/utils/evaluate";
import caculatorDisplay from "@/components/caculatorDisplay.vue";

const KeyBoard = ref([
  ["AC", "⁺/₋", "%", "÷"],
  ["7", "8", "9", "×"],
  ["4", "5", "6", "-"],
  ["1", "2", "3", "+"],
  ["0", ".", "="],
]);
const { safeAreaInsets } = uni.getSystemInfoSync();
const disPlayValue = ref<string>("0");
const optEnable = computed(() =>
  isNaN(Number(disPlayValue.value[disPlayValue.value.length - 1]))
);
const decimalEnable = computed(() => {
  //判断是否允许添加decimal
  const boolenArr = disPlayValue.value.split(/[\+\-×÷\/]/).map((item) => {
    return item.includes(".");
  });
  //判断最后一个字符是否为NaN
  const lastChar = Number(disPlayValue.value[disPlayValue.value.length - 1]);
  return !boolenArr[boolenArr.length - 1] && !isNaN(lastChar);
});
//滑动退格
function onBackSpace() {
  if (disPlayValue.value.length === 1) {
    disPlayValue.value = "0";
  }
  if (disPlayValue.value === "0") {
    return;
  }
  disPlayValue.value = disPlayValue.value.slice(
    0,
    disPlayValue.value.length - 1
  );
}
watch(disPlayValue, () => {
  if (disPlayValue.value !== "0") {
    KeyBoard.value[0][0] = "C";
  } else {
    KeyBoard.value[0][0] = "AC";
  }
});
function setCaculateValue(value: string): void {
  switch (value) {
    case "=":
      try {
        const result = expressionEval(
          disPlayValue.value.replaceAll("×", "*").replaceAll("÷", "/")
        );
        disPlayValue.value = result;
      } catch (error) {
        console.log(error);
        disPlayValue.value = "expression error";
      }
      break;
    case "⁺/₋":
      disPlayValue.value = (Number(disPlayValue.value) * -1).toString();

      break;
    case "%":
      disPlayValue.value = (Number(disPlayValue.value) / 100).toString();
      break;
    case "+":
      if (!optEnable) {
        break;
      }
      if (disPlayValue.value[disPlayValue.value.length - 1] === value) {
        break;
      }
      if (isNaN(Number(disPlayValue.value[disPlayValue.value.length - 1]))) {
        disPlayValue.value = disPlayValue.value.slice(0, -1) + value;
        break;
      }
      disPlayValue.value = disPlayValue.value + value;
      break;
    case "-":
      if (!optEnable) {
        break;
      }
      if (disPlayValue.value[disPlayValue.value.length - 1] === value) {
        break;
      }
      if (isNaN(Number(disPlayValue.value[disPlayValue.value.length - 1]))) {
        disPlayValue.value = disPlayValue.value.slice(0, -1) + value;
        break;
      }
      disPlayValue.value = disPlayValue.value + value;
      break;
    case "÷":
      if (!optEnable) {
        break;
      }
      if (disPlayValue.value[disPlayValue.value.length - 1] === value) {
        break;
      }
      if (isNaN(Number(disPlayValue.value[disPlayValue.value.length - 1]))) {
        disPlayValue.value = disPlayValue.value.slice(0, -1) + value;
        break;
      }
      disPlayValue.value = disPlayValue.value + value;
      break;
    case "×":
      if (!optEnable) {
        break;
      }
      //无法连续输入运算符
      if (disPlayValue.value[disPlayValue.value.length - 1] === value) {
        break;
      }
      //替换表达式最后一个运算符
      if (isNaN(Number(disPlayValue.value[disPlayValue.value.length - 1]))) {
        disPlayValue.value = disPlayValue.value.slice(0, -1) + value;
        break;
      }
      disPlayValue.value = disPlayValue.value + value;
      break;
    case "AC":
      disPlayValue.value = "0";
      break;
    case "C":
      disPlayValue.value = "0";
      break;
    case ".":
      if (decimalEnable.value) {
        disPlayValue.value = disPlayValue.value + value;
      }
      break;
    default:
      if (disPlayValue.value === "0") {
        disPlayValue.value = value;
        break;
      }
      disPlayValue.value = disPlayValue.value + value;
      break;
  }
}
</script>


