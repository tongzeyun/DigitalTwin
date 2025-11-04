<!--
 * @Description: 
 * @Author: YiFan Zhang
 * @LastEditors: YiFan Zhang
 * @LastEditTime: 2025-09-23 09:08:12
-->

<template>
  <div class="app-container">
    <!--公共区域 -->
    <layout />
    <div class="route-box">
      <router-view></router-view>
    </div>
    <home-page></home-page>
  </div>
</template>
<script setup>
// 引入组件 layout.vue
import layout from '@/components/layout/index.vue'
// 引入组件 三维模型
import HomePage from '@/pages/home/index.vue'
</script>
<style lang="scss" scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
.app-container {
  width: 100%;
  height: 100%;
  .route-box {
    // width: 100%;
    // height: 100%;
    background-color: transparent;
    position: relative;
    z-index: 2;
  }
}
</style>
