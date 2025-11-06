<template>
  <div ref="chart" style="width: 100%; height: 250px;"></div>
</template>

<script lang="ts" setup>
  import { option } from "./echart3";

  import * as echarts from 'echarts';
  import { ref, onMounted,onUnmounted } from 'vue';


//   const option = defineProps({
//   // option: String,
//   // count: Number
// });


  const chart = ref(null);

  const renderChart = () => {
    const myChart = echarts.init(chart.value);
    let option1 = option
    myChart.setOption(option1);
  };
  // const renderChart111 = () => {
  //   const myChart = echarts.init(chart.value);
  //   myChart.resize();
  // };
  // const resizeChart = () => {
  //   window.addEventListener('resize', () => {
  //     renderChart111();
  //   });
  // };
  onMounted(() => {
    renderChart();
    // resizeChart();
  });
  onUnmounted(() => {
      // window.removeEventListener('resize',() => {
      //     renderChart111();
      // });
       //移除监听事件
  });
</script>
