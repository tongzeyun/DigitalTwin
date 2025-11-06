<!--
 * @Description: 
 * @Author: Zheng He
 * @LastEditors: Zheng He
 * @LastEditTime: 2025-10-24 09:11:12
-->
<template>
  <div class="layout-menu">
    <div class="layout-menu-bg">
      <router-link to="/park" class="menu-btn-box" active-class="active">
          <img src="@/assets/images/common/menu-home.png" class="menu-btn" alt="">
          <div class="menu-btn-text">园区全景监控</div>
      </router-link>
      <router-link to="/person" class="menu-btn-box" active-class="active">
          <img src="@/assets/images/common/menu-person.png" class="menu-btn" alt="">
          <div class="menu-btn-text">人员全景监控</div>
      </router-link>
      <router-link to="/device" class="menu-btn-box" active-class="active">
          <img src="@/assets/images/common/menu-device.png" class="menu-btn" alt="">
          <div class="menu-btn-text">设备全景监控</div>
      </router-link>
      <router-link to="/alarm" class="menu-btn-box" active-class="active">
          <img src="@/assets/images/common/menu-alarm.png" class="menu-btn" alt="">
          <div class="menu-btn-text">告警监控展示</div>
      </router-link>
    </div>
  </div>
</template>

<script setup>
</script>

<style lang="scss" scoped>
.layout-menu {
  width: 100%;
  height: 215px;
  background: url("@/assets/images/header/layer-bottom.png") no-repeat top center / 100% 100%;
  position: fixed;
  left: 0;
  bottom: -9px;
  pointer-events: none;
  display: flex;
  align-items: flex-end;
  .layout-menu-bg {
    width: 100%;
    height: 90px;
    background: url("@/assets/images/common/menu-bottom-bg.png") no-repeat top center / 100% 100%;
    display: flex;
    justify-content: center;
    padding-left: 10px;
  }
  .menu-btn-box {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    position: relative;
    top: -68px;
    margin-right: 12px;
    transform-origin: center bottom;
    transition: all 0.2s;
    cursor: pointer;
    pointer-events: all;
    &:hover,
    &.active {
      transform: scale(1.2);
      .menu-btn-text {
        color: #fff;
        font-weight: bold;
      }
    }
    .menu-btn {
      width: 58px;
      height: 57px;
    }
    .menu-btn-text {
      font-size: 12px;
      color: #B9D3E6;
      text-align: center;
      text-shadow: 0 0 12px #9b9ba6;
    }
  }
}
</style>