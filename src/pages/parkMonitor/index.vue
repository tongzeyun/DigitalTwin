<!--
 * @Description: 
 * @Author: Zheng He
 * @LastEditors: Zheng He
 * @LastEditTime: 2025-10-25 10:01:12
-->
<template>
  <div class="park-monitor">
    <overview-info></overview-info>
    <!-- 首页左侧 -->
    <div class="component-left">
      <project-info></project-info>
    </div>
    <!-- 首页右侧 -->
    <div class="component-right">
      <alarm-info></alarm-info>
    </div>
  </div>
</template>

<script setup>
// 引入组件 采购项目信息
import ProjectInfo from './projectInfo.vue'
// 引入组件 基地总揽信息
import OverviewInfo from './overviewInfo.vue'
// 引入组件 告警统计
import AlarmInfo from './alarmInfo.vue'

</script>

<style lang="scss" scoped>
.park-monitor {
  background-color: transparent;
  // width: 100%;
  // height: 215px;
  // background: url("@/assets/images/header/layer-bottom.png") no-repeat top center / 100% 100%;
//   position: fixed;
//   left: 0;
//   bottom: -9px;
//   pointer-events: none;
//   display: flex;
//   align-items: flex-end;
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