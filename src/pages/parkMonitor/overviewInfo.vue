<!--
 * @Description: 
 * @Author: Zheng He
 * @LastEditors: Zheng He
 * @LastEditTime: 2025-10-25 10:01:12
-->
<template>
  <!-- 顶部中间 -->
  <div class="top-center">
    <div class="top-center-item">
      <img src="@/assets/images/home/center-icon-zbcg.png" class="top-center-img" alt="">
      <div class="top-center-right">
        <div class="top-center-title">招标采购项目</div>
        <div class="top-center-count"><span>1</span>个</div>
      </div>
    </div>
    <div class="top-center-item">
      <img src="@/assets/images/home/center-icon-pwhgs.png" class="top-center-img" alt="">
      <div class="top-center-right">
        <div class="top-center-title">评委会个数</div>
        <div class="top-center-count"><span>1</span>个</div>
      </div>
    </div>
    <div class="top-center-item">
      <img src="@/assets/images/home/center-icon-pwhrs.png" class="top-center-img" alt="">
      <div class="top-center-right">
        <div class="top-center-title">评委会人员</div>
        <div class="top-center-count"><span>90</span>人</div>
      </div>
    </div>
    <div class="top-center-item">
      <img src="@/assets/images/home/center-icon-gz.png" class="top-center-img" alt="">
      <div class="top-center-right">
        <div class="top-center-title">工作人员数</div>
        <div class="top-center-count"><span>2</span>人</div>
      </div>
    </div>
    <div class="top-center-item">
      <img src="@/assets/images/home/center-icon-jd.png" class="top-center-img" alt="">
      <div class="top-center-right">
        <div class="top-center-title">监督及法律人数</div>
        <div class="top-center-count"><span>10</span>个</div>
      </div>
    </div>
    <div class="top-center-item">
      <img src="@/assets/images/home/center-icon-fw.png" class="top-center-img" alt="">
      <div class="top-center-right">
        <div class="top-center-title">服务保障人数</div>
        <div class="top-center-count"><span>1</span>人</div>
      </div>
    </div>
  </div>
</template>

<script setup>
</script>

<style lang="scss" scoped>
 .top-center {
    width: 735px;
    position: absolute;
    top: 118px;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    user-select: none;
    .top-center-item {
      width: 213px;
      height: 87px;
      margin-bottom: 20px;
      text-align: left;
      padding-left: 110px;
      position: relative;
      background: url("@/assets/images/home/center-item-bg.png") no-repeat top left / 100% 100%;
      .top-center-img {
        position: absolute;
        left: 5px;
      }
      .top-center-right {
        position: relative;
        top: 11px;
      }
      .top-center-title {
        font-size: 16px;
        color: #fff;
        white-space: nowrap;
      }
      .top-center-count {
        font-weight: 600;
        font-size: 16px;
        color: #9CE3FF;
        line-height: 16px;
        text-align: left;
        font-style: normal;
        background: linear-gradient(to bottom, #FFFFFF 0%, rgba(255,255,255,0.4) 100%);
        // background: linear-gradient(90deg, #FFFFFF 0%, #6AC1FF 100%);
        -webkit-background-clip: text; /* 兼容 Safari/Chrome */
        background-clip: text;
        color: transparent;
        span {
          font-size: 36px;
          color: #FFFFFF;
          line-height: 34px;
          text-align: left;
          font-style: normal;
          background: linear-gradient(to bottom, rgba(255,255,255,0.4) 0%, rgba(255,255,255,0.4) 100%);
          // background: linear-gradient(90deg, #FFFFFF 0%, #6AC1FF 100%);
          -webkit-background-clip: text; /* 兼容 Safari/Chrome */
          background-clip: text;
          color: transparent;
        }
      }
    }
  }
</style>