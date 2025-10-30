<!--
 * @Description: 
 * @Author: Zheng He
 * @LastEditors: Zheng He
 * @LastEditTime: 2025-10-23 10:12:59
-->
<template>
  <div class="digital-twin-container">
    <!-- 首页右侧 -->
    <div class="component-right">
      <!-- 告警信息 -->
      <div class="component-container">
        <div class="component-title">
          <img src="@/assets/images/common/component-icon.png" class="component-title-icon" alt="">
          <div class="component-title-text">
            告警信息
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
</script>

<style lang="scss" scoped>
.digital-twin-container {
  width: 100%;
  height: 100%;
  background: url("@/assets/images/bg.png") no-repeat top left / 100% 100%;
  position: relative;
  &::before {
    content: '';
    width: 508px;
    height: 100%;
    background: url("@/assets/images/header/layer-left.png") no-repeat top left / 100% 100%;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 2;
    pointer-events: none;
  }
  &::after {
    content: '';
    width: 508px;
    height: 100%;
    background: url("@/assets/images/header/layer-right.png") no-repeat top left / 100% 100%;
    position: absolute;
    top: 0;
    right: 0;
    z-index: 2;
    pointer-events: none;
  }
}
</style>