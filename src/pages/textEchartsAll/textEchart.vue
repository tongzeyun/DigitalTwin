<!-- vue3 文件结构 -->
<template>
  <div class="textEchartAll">
		<loadText/>
  </div>
</template>
<script setup>
import { onMounted, onUnmounted, ref } from 'vue'

// 引入组件 loadText.vue
import loadText from './loadText.vue'
// 声明场景相关变量
let scene, camera, renderer, controls, loader

// 初始化场景
function initScene() {
}


// 组件挂载时初始化
onMounted(() => {
 
})

// 组件卸载时清理资源
onUnmounted(() => {

})













</script>

<style scoped>

</style>
