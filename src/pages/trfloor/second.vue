<!-- vue3 文件结构 -->
<template>
  <div class="three-container">
    
    <!-- 引入组件 loadText.vue -->
    <loadText  :title="'陶然楼第二层展示'" />
    <div id="loading-progress">
      <div class="progress-bar-container">
        <div id="progress-bar"></div>
      </div>
      <div id="progress-text">加载中...</div>
    </div>
    <div id="three-canvas"></div>
  </div>
</template>
<script setup>
import { onMounted, onUnmounted, ref } from 'vue'
// 使用three.js 加载外部模型 渲染三维场景
import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
// 引入组件 loadText.vue
import loadText from '@/components/loadText.vue'
// 声明场景相关变量
let scene, camera, renderer, controls, loader
// 用于点击检测的变量
let raycaster, mouse
// 存储点击过的对象和它们的原始材质
let selectedObjects = new Map()

// 初始化场景
function initScene() {
  // 创建场景
  scene = new THREE.Scene()
  // scene.background = new THREE.Color(0x333333) // 设置背景色为灰色
  //使用图片做背景
  const textureLoader = new THREE.TextureLoader()
  const backgroundTexture = textureLoader.load('/frtwin/bg.png')
  scene.background = backgroundTexture
  
  // 添加坐标轴辅助（X轴红色，Y轴绿色，Z轴蓝色）
  const axesHelper = new THREE.AxesHelper(100) // 参数表示坐标轴的长度
  // scene.add(axesHelper)
  
  // 创建相机
  const container = document.getElementById('three-canvas')
  const width = container.clientWidth
  const height = container.clientHeight
  camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000)
  camera.position.set(0, 50, 5) // 设置相机位置
  camera.lookAt(0, 50, 0) // 设置相机朝向
  
  // 创建渲染器
  renderer = new THREE.WebGLRenderer({ antialias: true })
  renderer.setSize(width, height)
  renderer.setPixelRatio(window.devicePixelRatio)
  container.appendChild(renderer.domElement)
  
  // 添加轨道控制器
  controls = new OrbitControls(camera, renderer.domElement)
  controls.enableDamping = false
  // controls.dampingFactor = 0.05 // 当enableDamping为false时，这个参数不起作用
  controls.enableZoom = true
  controls.autoRotate = false
  
  // 限制上下旋转角度
  controls.minPolarAngle = Math.PI / 4 // 45度
  controls.maxPolarAngle = Math.PI / 2 // 90度
  
  // 添加光源
  // 环境光
  const ambientLight = new THREE.AmbientLight(0xffffff, 2.0)
  scene.add(ambientLight)
  
  // 平行光
  const directionalLight = new THREE.DirectionalLight(0xffffff, 1.0)
  directionalLight.position.set(5, 10, 7.5)
  directionalLight.castShadow = true
  scene.add(directionalLight)
  
  // 加载模型
  loadModel()
  
  // 添加窗口大小改变事件监听
  window.addEventListener('resize', onWindowResize)
  
  // 开始渲染循环
  animate()
  
  // 初始化点击检测
  initClickDetection()
}

// 初始化点击检测
function initClickDetection() {
  raycaster = new THREE.Raycaster()
  mouse = new THREE.Vector2()
  
  // 添加鼠标点击事件监听
  const container = document.getElementById('three-canvas')
  container.addEventListener('click', onMouseClick)
}

// 处理鼠标点击事件
function onMouseClick(event) {
  if (!scene || !camera) return
  
  // 计算鼠标在标准化设备坐标中的位置
  const container = document.getElementById('three-canvas')
  const rect = container.getBoundingClientRect()
  
  mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1
  mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1
  
  // 更新射线投射器
  raycaster.setFromCamera(mouse, camera)
  
  // 计算与射线相交的对象
  const intersects = raycaster.intersectObjects(scene.children, true)
  
  if (intersects.length > 0) {
    const clickedObject = intersects[0].object
    console.log('点击到的对象:', clickedObject)
    console.log('模型名字:', clickedObject.name || '未命名')

     const worldSignalPos = intersects[0].point; // 射线与地面的交点（世界坐标）
      console.log('鼠标点击交点坐标:', worldSignalPos)
    
    // 检查对象是否有材质
    if (clickedObject.material) {
      // 如果对象已经被选中过，恢复其原始材质
      if (selectedObjects.has(clickedObject)) {
        clickedObject.material = selectedObjects.get(clickedObject)
        selectedObjects.delete(clickedObject)
      } else {
        // 保存原始材质并应用黄色材质
        selectedObjects.set(clickedObject, clickedObject.material)
        
        // 创建黄色材质
        const yellowMaterial = new THREE.MeshBasicMaterial({
          color: 0xffff00, // 黄色
          transparent: true,
          opacity: 0.8
        })
        
        // clickedObject.material = yellowMaterial
      }
    }
  }
}

// 加载模型
function loadModel() {
  loader = new GLTFLoader()
  
  // 加载第二层室内模型
 
  loader.load(
    '/frtwin/trl-model/2/2.glb', // 这是第二层室内模型
    (gltf) => {
      console.log('模型加载成功:', gltf)
      
      // 隐藏进度条
      const loadingProgress = document.getElementById('loading-progress')
      const loadingText = document.getElementById('loading-text')
      if (loadingText) {  //显示标题
        loadingText.style.display = 'block'
      }

      if (loadingProgress) {
        loadingProgress.style.display = 'none'
      }
      
      // 添加模型到场景
      const model = gltf.scene
      scene.add(model)
      
      // 计算模型的包围盒，确保模型几何中心位于原点
      const box = new THREE.Box3().setFromObject(model);
      const center = box.getCenter(new THREE.Vector3());
      
      // 将模型的几何中心移动到坐标原点
      model.position.sub(center);
      
      // 再次明确设置模型位置在原点（确保绝对位置正确）
      model.position.set(-115, -3.5, -37)
      
      // 如果需要，可以调整模型大小
      // model.scale.set(1, 1, 1)
      
    },
    (xhr) => {
      // 加载进度
      const percent = (xhr.loaded / xhr.total) * 100
      console.log(`模型加载进度: ${percent.toFixed(1)}%`)
      
      // 更新进度条
      const progressBar = document.getElementById('progress-bar')
      const progressText = document.getElementById('progress-text')
      if (progressBar && progressText) {
        progressBar.style.width = `${percent}%`
        progressText.textContent = `加载中: ${percent.toFixed(1)}%`
      }
    },
    (error) => {
      console.error('模型加载失败:', error)
      
      // 显示加载失败信息
      const progressText = document.getElementById('progress-text')
      if (progressText) {
        progressText.textContent = '加载失败，请刷新页面重试'
        progressText.style.color = '#ff4444'
      }
      
      alert('模型加载失败，请检查模型文件是否存在')
    }
  )
}

// 窗口大小改变时调整相机和渲染器
function onWindowResize() {
  const container = document.getElementById('three-canvas')
  const width = container.clientWidth
  const height = container.clientHeight
  
  camera.aspect = width / height
  camera.updateProjectionMatrix()
  
  renderer.setSize(width, height)
}

// 渲染循环
function animate() {
  requestAnimationFrame(animate)
  
  // 更新控制器
  if (controls) {
    controls.update()
  }
  
  // 渲染场景
  renderer.render(scene, camera)
}

// 组件挂载时初始化
onMounted(() => {
  // 确保DOM元素已创建
  setTimeout(() => {
    initScene()
  }, 100)
})

// 组件卸载时清理资源
onUnmounted(() => {
  if (renderer) {
    renderer.dispose()
  }
  window.removeEventListener('resize', onWindowResize)
  
  // 移除鼠标点击事件监听
  const container = document.getElementById('three-canvas')
  if (container) {
    container.removeEventListener('click', onMouseClick)
  }
  
  // 清理选中对象的引用
  selectedObjects.clear()
})













</script>

<style scoped>
.three-container {
  width: 100vw;
  height: 100vh;
  padding: 0;
  margin: 0;
  overflow: hidden;
  position: relative;
  background-color: #f0f0f0;
}

.three-container h1 {
  position: absolute;
  top: 20px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 10;
  color: #333;
  font-size: 24px;
  margin: 0;
  text-align: center;
  background-color: rgba(255, 255, 255, 0.8);
  padding: 10px 20px;
  border-radius: 5px;
}

#loading-text {
  display: none;
  color: #1890ff;
  font-size: 20px;
}
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

#loading-progress {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 20;
  text-align: center;
}

.progress-bar-container {
  width: 300px;
  height: 20px;
  background-color: rgba(255, 255, 255, 0.8);
  border-radius: 10px;
  overflow: hidden;
  margin-bottom: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}

#progress-bar {
  height: 100%;
  width: 0;
  background-color: #4CAF50;
  transition: width 0.3s ease;
}

#progress-text {
  font-size: 18px;
  color: #333;
  font-weight: bold;
  background-color: rgba(255, 255, 255, 0.8);
  padding: 5px 15px;
  border-radius: 5px;
}

#three-canvas {
  width: 100%;
  height: 100%;
}

/* 隐藏滚动条但保留滚动功能 */
.three-container::-webkit-scrollbar {
  display: none;
}

.three-container {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
</style>
