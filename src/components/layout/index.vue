<!--
 * @Description: 
 * @Author: Zheng He
 * @LastEditors: Zheng He
 * @LastEditTime: 2025-10-24 09:11:12
-->
<template>
  <div class="layout-container">
    <div class="layout-header">
      <img src="@/assets/images/logo.png" class="menu-logo" alt="">
        <div class="layout-header-title">智慧管理系统</div>
        <div class="layout-setting">
          <div class="header-search">
            <img src="@/assets/images/header/icon-header-search.png" class="pointer" alt="">
          </div>
          <div class="header-setting">
            <img src="@/assets/images/header/icon-header-setting.png" class="pointer" alt="">
          </div>
          <div class="header-fullscreen">
            <img src="@/assets/images/header/icon-header-fullscreen.png" class="pointer" alt="">
          </div>
          <div class="time-box">
            <div class="time-time">{{ dateTime }}</div>
            <div class="time-date-week">
              <div class="time-week">{{ dateWeek }}</div>
              <div class="time-date">{{ dateDay }}</div>
            </div>
          </div>
        </div>
    </div>
    
    
    <!-- 地图按钮 -->
    <div class="map-tools">
      <div class="tools">
        <div class="tools-btn tool-clear">
          <img src="@/assets/images/map/legend-clear.png" class="tool-img"alt="">
        </div>
        <div class="tools-btn tool-layer">
          <img src="@/assets/images/map/legend-layer.png" class="tool-img"alt="">
        </div>
        <div class="tools-btn tool-tools">
          <img src="@/assets/images/map/legend-tools.png" class="tool-img"alt="">
        </div>
      </div>
    </div>

    <!-- 底部菜单 -->
    <menu-component></menu-component>
  </div>
</template>

<script setup>
import { onMounted, onUnmounted, ref } from 'vue'
import { getDayTimeWeek } from '@/utils/utils'; //标签
// 引入组件 底部菜单
import MenuComponent from './menu.vue';

const dateDay = ref();
const dateTime = ref();
const dateWeek = ref();
const getDayTimeFunc = () => { // 获取时间日期
  let arrDate = getDayTimeWeek();
  dateDay.value = arrDate[0];
  dateTime.value = arrDate[1];
  dateWeek.value = arrDate[2];
  arrDate = null;
}
  
  // 组件挂载后执行
  let timer = null;

  onMounted(() => {
    // 启动定时器
    timer = setInterval(() => {
      getDayTimeFunc();
    }, 1000)
  })

  // 组件已卸载
  onUnmounted(() => {
    // 清除定时器
    if (timer != null) {
      clearInterval(timer);
      timer = null;
    }
  })

</script>

<style lang="scss" scoped>
.layout-container {
  width: 100%;
  position: absolute;
  left: 0;
  top: 0;
  z-index: 3;
  .layout-header {
      width: 100%;
      height: 128px;
      background: url("@/assets/images/header/header-title-bg.png") no-repeat top center / auto 128px;
      .layout-header-title {
          font-family: YouSheBiaoTiHei;
          font-size: 40px;
          // color: #44CAFF;
          letter-spacing: 4px;
          // text-shadow: inset 0px 0px 0px rgba(255,255,255,0.6);
          text-align: center;
          font-style: normal;
          background: linear-gradient(to bottom, #FFFFFF 0%, #FFFFFF 20%, #6AC1FF 100%);
          // background: linear-gradient(90deg, #FFFFFF 0%, #6AC1FF 100%);
          -webkit-background-clip: text; /* 兼容 Safari/Chrome */
          background-clip: text;
          color: transparent;
          position: absolute;
          top: 20px;
          left: 50%;
          transform: translateX(-50%);
      }
  }
  .menu-logo {
    position: absolute;
    left: 57px;
    top: 27px;
    width: 170px;
  }
  .layout-setting {
    position: absolute;
    right: 38px;
    top: 38px;
    display: flex;
    align-items: center;
    .header-search {
      margin-right: 12px;
      display: flex;
      align-items: center;
    }
    .header-setting {
      margin-right: 12px;
      display: flex;
      align-items: center;
    }
    .header-fullscreen {
      margin-right: 19px;
      display: flex;
      align-items: center;
    }
    .time-box {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 7px 0 9px;
      width: 181px;
      height: 50px;
      background: url("@/assets/images/header/time-bg.png") no-repeat top center / auto 100%;
      .time-time {
        font-weight: 500;
        font-size: 24px;
        color: #FFFFFF;
        line-height: 28px;
        text-align: left;
        font-style: normal;
        padding-right: 10px;
        background: url("@/assets/images/header/time-line.png") no-repeat center right / 2px 25px;
      }
      .time-date-week {
        font-weight: 400;
        font-size: 12px;
        color: rgba(255,255,255,0.8);
        line-height: 12px;
        text-align: left;
        font-style: normal;
        margin-left: 8px;
        .time-week {
          margin-bottom: 3px;
        }
        .time-date {

        }
      }
    }
  }
  
 
  .map-tools {
    position: fixed;
    right: 51px;
    bottom: 81px;
    z-index: 2;
    .tools {
      width: 43px;
      height: 124px;
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      padding: 8px 0 5px;
      background: url("@/assets/images/map/legend-bg.png") no-repeat top left / 100% 100%;
    }
    .tools-btn {
      cursor: pointer;
    }
  }
}
</style>