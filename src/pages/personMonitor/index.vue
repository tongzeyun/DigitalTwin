<!--
 * @Description: 
 * @Author: Zheng He
 * @LastEditors: Zheng He
 * @LastEditTime: 2025-11-04 10:01:12
-->
<template>
  <!-- 人员全景监控 -->
 
  <div class="person-monitor">
    <!-- <overview-info></overview-info> -->
    <!-- 首页左侧 -->
    <div class="component-left">
      <AlarmInfo></AlarmInfo>
    </div>
    <!-- 首页右侧 -->
    <div class="component-right ">
      <project-info></project-info>
      <!-- <alarm-info></alarm-info> -->
    </div>
  </div>
</template>

<script setup>
// 引入组件 采购项目信息
import ProjectInfo from './projectInfo.vue'
// 引入组件 基地总揽信息
// import OverviewInfo from './overviewInfo.vue'
// 引入组件 告警统计
import AlarmInfo from './alarmInfo.vue'

</script>
<style lang="scss" scoped>
.person-monitor {
  // color: #fff;
  // position: absolute;
  // top: 100px;
  background-color: transparent;
}
.component-left {
    width: 400px;
    height: 900px;
    position: absolute;
    left: 19px;
    top: 119px;
  }
  .component-right {
    width: 400px;
    height: 900px;
    position: absolute;
    right: 19px;
    top: 119px;
  }
</style>