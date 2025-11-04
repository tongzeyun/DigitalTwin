<!--
 * @Description: 
 * @Author: Zheng He
 * @LastEditors: Zheng He
 * @LastEditTime: 2025-10-25 10:01:12
-->
<template>
  <!-- 项目信息 -->
  <div class="component-container project-info">
    <div class="component-title">
      <img src="@/assets/images/common/component-icon.png" class="component-title-icon" alt="">
      <div class="component-text">
        <span class="component-title-text">采购项目信息</span>
      </div>
    </div>
    <div class="component-box">
      <div class="conponent-box-project">有限公司2025年第三次采购项目信息</div>
      <div class="conponent-box-project">有限公司2025年第三次采购项目信息</div>
      <div class="conponent-box-project">有限公司2025年第三次采购项目信息</div>
    </div>
  </div>
</template>

<script setup>
</script>

<style lang="scss" scoped>
.project-info {
  .component-box {
    padding-top: 16px;
    .conponent-box-project {
      font-weight: 500;
      font-size: 16px;
      color: #FFFFFF;
      line-height: 22px;
      text-align: left;
      font-style: normal;
      width: 398px;
      height: 36px;
      text-align: left;
      line-height: 36px;
      padding-left: 26px;
      margin-bottom: 17px;
      background: url("@/assets/images/home/project-bg.png") no-repeat top left / auto 100%;
    }
  }
}
</style>