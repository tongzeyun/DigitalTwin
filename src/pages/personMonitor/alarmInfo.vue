<!--
 * @Description: 
 * @Author: Zheng He
 * @LastEditors: Zheng He
 * @LastEditTime: 2025-10-25 10:01:12
-->
<template>
  <!-- 告警信息 -->
  <div class="component-container component-container-alarm ">

    <div class="component-title">
      <img src="@/assets/images/common/component-icon.png" class="component-title-icon" alt=""/>
      <div class="component-text component-text-select">
        <span class="component-title-text">人员分布情况 </span>
        <el-select v-model="value" placeholder="请选择" class="custom-select" style="width: 120px;">
            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
         </el-select>
      </div>
    </div>

    <div class="component-box alarm-info">
      <div class="component-box-bottom">
        <ECharts3  />
      </div>
    </div>
    <div class="component-title">
      <img src="@/assets/images/common/component-icon.png" class="component-title-icon" alt=""/>
      <div class="component-text component-text-select">
        <span class="component-title-text">人员热点统计</span>
        <el-select v-model="value" placeholder="请选择" class="custom-select" style="width: 120px;">
            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
         </el-select>
      </div>
    </div>
    
    <div class="component-box alarm-info">
      <div class="component-box-bottom">
        <ECharts2  />
      </div>
    </div>

    <div class="component-title">
      <img src="@/assets/images/common/component-icon.png" class="component-title-icon" alt=""/>
      <div class="component-text component-text-select">
        <span class="component-title-text">区域访客统计</span>
        <el-select v-model="value" placeholder="请选择" class="custom-select" style="width: 120px;">
            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
         </el-select>
      </div>
    </div>
    
    <div class="component-box alarm-info">
      <div class="component-box-bottom">
        <ECharts1  />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue"; //defineComponent
import ECharts1 from "@/components/alarmEchart/echart1.vue"; 
import ECharts2 from "@/components/alarmEchart/echart2.vue"; 
import ECharts3 from "@/components/alarmEchart/echart3.vue";

const value = ref('')
const options = [
  {
    value: 'Option1',
    label: 'Option1',
  },
  {
    value: 'Optiosssssn2',
    label: 'Optionssss2',
  },
  {
    value: 'Option3',
    label: 'Option3',
  },
  {
    value: 'Option4',
    label: 'Option4',
  },
  {
    value: 'Option5',
    label: 'Option5',
  },
]

</script>

<style lang="scss" scoped>

.component-container-alarm .component-title{
  .component-text-select{
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
}
</style>
