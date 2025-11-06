<template>
  <div id="loading-text">
      <!-- 返回 园区 -->
      <p>
        <router-link to="/" style="color: #1890ff; margin-right: 50px;font-size: 18px;">返回</router-link>
         <span style="font-size: 24px;">{{ title }}</span>
      </p>

       <!-- 楼层导航 -->
    <div id="floor-nav">
       <!-- 点击跳转到陶然楼负一层 -->
      <router-link to="/trfourth">陶然楼负一层</router-link>
      <!-- 点击跳转到陶然楼第一层 -->
      <router-link to="/trfirst">陶然楼第一层</router-link>
      <!-- 点击跳转到陶然楼第二层 -->
      <router-link to="/trsecond">陶然楼第二层</router-link>
      <!-- 点击跳转到陶然楼第三层 -->
      <router-link to="/trthird">陶然楼第三层</router-link>
      <!-- 点击跳转到陶然楼第五层 -->
      <router-link to="/trfifth">陶然楼第五层</router-link>
    </div>


    </div>
</template>

<script setup>
import { ref, defineProps } from 'vue'
// 定义 props
const props = defineProps({
  title: {
    type: [String, Number],
    default: '加载中...'
  }
})
</script>

<style scoped>

/* 楼层导航 */
#floor-nav {
  position: absolute;
  width: 80%;
  top: 80px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 10;
  color: #333;
  font-size: 24px;
  margin: 0;
  text-align: center;
  /* background-color: rgba(255, 255, 255, 0.8); */
  padding: 10px 20px;
  border-radius: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
}

#floor-nav a {
  margin: 0 10px;
  text-decoration: none;
  font-size: 18px;
  background-color: #fff;
  padding: 5px 10px;
  border-radius: 5px;
  color: #1890ff;
}

#floor-nav a:hover {
  color: #1890ff;
}

</style>
