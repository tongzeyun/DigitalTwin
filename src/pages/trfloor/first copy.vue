<!-- vue3 文件结构 -->
<template>
  <div class="three-container">
  
    <!-- 引入组件 loadText.vue -->
    <loadText  :title="'陶然楼第一层展示'" />
   
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
// 粒子系统相关变量
let particleSystem, edgePoints = [], particleGeometry, particleMaterial, particlePositions, particleSizes, particleAnimationOffsets

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
  scene.add(axesHelper)

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
  // controls.minPolarAngle = Math.PI / 4 // 45度
  // controls.maxPolarAngle = Math.PI / 2 // 90度

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

  // 加载第一层室内模型

  loader.load(
    '/frtwin/trl-model/1/1.glb', // 这是第一层室内模型
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
      model.position.set(-115, 0, -37)

      // 如果需要，可以调整模型大小
      // model.scale.set(1, 1, 1)

      // 创建粒子系统围栏
      createParticleFence(model)

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

// 创建粒子围栏
function createParticleFence(model) {
  // 1. 使用用户提供的指定边缘顶点坐标
  useSpecifiedEdgePoints()
  
  if (edgePoints.length === 0) {
    console.warn('未能使用用户提供的边缘点，使用默认位置')
    // 创建一些默认的点作为示例
    createDefaultEdgePoints()
  }
  
  console.log('使用的边缘点数量：', edgePoints.length)
  
  // 2. 创建粒子几何体
  particleGeometry = new THREE.BufferGeometry()
  
  // 为每个点创建粒子
  const numParticles = edgePoints.length
  particlePositions = new Float32Array(numParticles * 3)
  particleSizes = new Float32Array(numParticles)
  particleAnimationOffsets = new Float32Array(numParticles)
  
  // 初始化粒子位置、大小和动画偏移
  for (let i = 0; i < numParticles; i++) {
    const point = edgePoints[i]
    const i3 = i * 3
    
    particlePositions[i3] = point.x
    particlePositions[i3 + 1] = point.y // 保持原始y坐标，因为已经设置为4
    particlePositions[i3 + 2] = point.z
    
    // 显著增大粒子大小，确保在任何视角下都清晰可见
    particleSizes[i] = Math.random() * 2.0 + 3.0
    
    // 随机动画偏移，使粒子闪烁不同步
    particleAnimationOffsets[i] = Math.random() * Math.PI * 2
  }
  
  // 设置几何体属性
  particleGeometry.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3))
  particleGeometry.setAttribute('size', new THREE.BufferAttribute(particleSizes, 0.5))
  particleGeometry.setAttribute('animationOffset', new THREE.BufferAttribute(particleAnimationOffsets, 1))
  
  // 3. 创建粒子材质 - 增强的红色发光材质
  particleMaterial = new THREE.PointsMaterial({
    color: 0xff0000, // 纯红色以增强视觉效果
    size: 1.0, // 增大基础大小，确保粒子清晰可见
    transparent: true,
    opacity: 1.0, // 保持不透明以确保亮度
    blending: THREE.AdditiveBlending, // 叠加混合模式增强发光效果
    depthWrite: false, // 禁用深度写入，确保粒子总是可见
    vertexColors: false,
    // 增强发光效果
    emissive: 0xff3333, // 增强的红色发光
    emissiveIntensity: 3.0, // 显著提高发光强度
    // 添加半透明外圈效果
    alphaTest: 0.1, // 设置alpha测试阈值
    fog: false // 禁用雾效，确保在任何环境下都清晰可见
  })
  
  // 4. 创建粒子系统并添加到场景
  particleSystem = new THREE.Points(particleGeometry, particleMaterial)
  scene.add(particleSystem)
  
  console.log('粒子围栏创建完成，粒子数量：', numParticles)
  console.log('粒子系统已添加到场景：', scene.children.includes(particleSystem))
}

// 使用用户提供的指定边缘顶点坐标，并添加中间点形成封闭的围栏效果
function useSpecifiedEdgePoints() {
  // 清空现有边缘点数组
  edgePoints = []
  
  // 用户提供的边缘顶点坐标 - 所有点y坐标统一为4
  const specifiedPoints = [
    {x: 22.8802490234375, y: 4.5, z: 0.8359708271287616},
    {x: 23.00619500276079, y: 4.5, z: 13.989364624023438},
    {x: 10.92418426783071, y: 4.5, z: 13.073173747922468},
    {x: -4.370465267607004, y: 4.5, z: 13.41724858913333},
   
    {x: -8.024559020996094, y: 4.5, z: 13.661955206414845},
    {x: -8.532225058623268, y: 4.5, z: 13.708649646505684},
    {x: -14.199089843693429, y: 4.5, z: 13.183549790587989},
    {x: -27.635809240537338, y: 4.5, z: 13.619241320231023},
    {x: -28.001373066914837, y: 4.5, z: 5.8112335205078125},
    {x: -27.025384159414273, y: 4.5, z: 0.6862030029296875},
    {x: -11.24991824355935, y: 4.5, z: 0.43903350830078125},
    {x: 5.2959958441867485, y: 4.5, z: 0.48790740966796875}
  ]
  
  // 先添加用户提供的点到临时数组
  const tempPoints = []
  specifiedPoints.forEach(point => {
    tempPoints.push(new THREE.Vector3(point.x, point.y, point.z))
  })
  
  // 对边缘点进行线性插值，增加点的密度，使围栏更加连续
  const interpolatedPoints = []
  const segmentPoints = 54 // 每两个点之间插入的点数
  
  for (let i = 0; i < tempPoints.length; i++) {
    const currentPoint = tempPoints[i]
    const nextPoint = tempPoints[(i + 1) % tempPoints.length] // 循环回到起点，确保围栏封闭
    
    interpolatedPoints.push(currentPoint.clone())
    
    // 在每两个点之间插入额外的点  
    //再密集一些，增加点的数量
    // 增加点的数量，使围栏更加连续
    // const segmentPoints = 18 // 每两个点之间插入的点数

    for (let j = 1; j <= segmentPoints; j++) {
      const t = j / (segmentPoints + 1)
      const interpolatedPoint = new THREE.Vector3(
        currentPoint.x + (nextPoint.x - currentPoint.x) * t,
        currentPoint.y + (nextPoint.y - currentPoint.y) * t,
        currentPoint.z + (nextPoint.z - currentPoint.z) * t
      )
      interpolatedPoints.push(interpolatedPoint)
    }
  }
  
  // 使用插值后的点作为最终的边缘点
  edgePoints = interpolatedPoints
  
  console.log('封闭围栏创建完成，原始点数：', tempPoints.length, '，插值后总点数：', edgePoints.length)
}

// 从模型中提取边缘点（保留原有方法但不再使用）
function extractEdgePoints(model) {
  // 这个函数已经被useSpecifiedEdgePoints替代
  console.log('extractEdgePoints函数已被替代')
}

// 创建默认的边缘点（如果无法从模型中提取）
function createDefaultEdgePoints() {
  // 创建一个简单的矩形围栏作为示例
  const size = 50
  const segments = 20
  
  // 底部边框
  for (let i = 0; i <= segments; i++) {
    const x = -size + (i / segments) * (2 * size)
    edgePoints.push(new THREE.Vector3(x, 0, -size))
  }
  
  // 右侧边框
  for (let i = 0; i <= segments; i++) {
    const z = -size + (i / segments) * (2 * size)
    edgePoints.push(new THREE.Vector3(size, 0, z))
  }
  
  // 顶部边框
  for (let i = segments; i >= 0; i--) {
    const x = -size + (i / segments) * (2 * size)
    edgePoints.push(new THREE.Vector3(x, 0, size))
  }
  
  // 左侧边框
  for (let i = segments; i >= 0; i--) {
    const z = -size + (i / segments) * (2 * size)
    edgePoints.push(new THREE.Vector3(-size, 0, z))
  }
}

// 渲染循环
function animate() {
  requestAnimationFrame(animate)

  // 更新控制器
  if (controls) {
    controls.update()
  }

  // 更新粒子围栏动画效果
  if (particleSystem && particleMaterial) {
    // 实现粒子呼吸效果
    const time = Date.now() * 1
    // 使粒子大小随时间变化，创建呼吸效果
    const pulseFactor = 0.5 + Math.sin(time) * 0.5
    particleMaterial.size = 1.0 * pulseFactor
    
    // 调整透明度，增强呼吸效果
    particleMaterial.opacity = 0.8 + Math.sin(time + 1) * 0.2
    
    // 实时更新材质属性
    particleMaterial.needsUpdate = true
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
  
  // 清理粒子系统资源
  if (particleGeometry) {
    particleGeometry.dispose()
  }
  if (particleMaterial) {
    particleMaterial.dispose()
  }
  edgePoints = []
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
