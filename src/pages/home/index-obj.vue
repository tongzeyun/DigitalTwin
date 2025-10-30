<!--
 * @Description: 
 * @Author: YiFan Zhang
 * @LastEditors: YiFan Zhang
 * @LastEditTime: 2025-09-23 09:12:59
-->
<template>
  <div class="digital-twin-container">
    <div class="header-section">
      <h1>三维数字孪生园区展示</h1>
      <!-- 点击跳转到陶然楼第一层 -->
      <!-- <router-link to="/trfirst">陶然楼第一层</router-link> -->
      <!-- 点击跳转到陶然楼第二层 -->
      <!-- <router-link to="/trsecond">陶然楼第二层</router-link> -->
      <!-- 点击跳转到陶然楼第三层 -->
      <!-- <router-link to="/trthird">陶然楼第三层</router-link> -->
       <!-- 点击跳转到陶然楼第四层 -->
      <!-- <router-link to="/trfourth">陶然楼第四层</router-link> -->
       <!-- 点击跳转到陶然楼第五层 -->
      <!-- <router-link to="/trfifth">陶然楼第五层</router-link> -->

      <div class="action-buttons">
        <!-- <el-button @click="getPages" v-hasPermi="['/api/fr/bbm/db/100-page']">获取数据</el-button> -->
        <!-- <el-button @click="toDigitalTwinPage2">跳转到数字孪生页面2</el-button> -->
        <!-- <router-link to="/digitalTwinPage2">跳转到数字孪生页面2</router-link> -->
      </div>
    </div>

    <!-- 三维渲染容器 -->
    <div class="three-container">
      <div id="model-container" ref="modelContainer"></div>

      <!-- 模型控制信息 -->
      <!-- <div class="model-info" v-if="modelLoaded">
        <p>园区模型加载完成</p>
        <p>使用鼠标拖动: 旋转视角</p>
        <p>使用鼠标滚轮: 缩放视图</p>
        <p>使用鼠标右键: 平移视图</p>
        <p>使用鼠标左键: 点击模型调整材质</p>
      </div> -->

      <!-- 材质调整控制面板 -->
      <!-- <div class="material-controls" v-if="selectedObject">
        <h4>材质调整 - {{ selectedObjectName }}</h4>
        <div class="control-group">
          <label>颜色:</label>
          <span>{{ selectedMaterialColor }}</span>
          <input type="color" v-model="selectedMaterialColor" @change="updateSelectedMaterial" />
        </div>
        <div class="control-group">
          <label>透明度:</label>
          <input type="range" min="0" max="1" step="0.01" v-model="selectedMaterialOpacity"
            @input="updateSelectedMaterial" />
          <span>{{ Math.round(selectedMaterialOpacity * 100) }}%</span>
        </div>
        <div class="control-group">
          <label>粗糙度:</label>
          <input type="range" min="0" max="1" step="0.01" v-model="selectedMaterialRoughness"
            @input="updateSelectedMaterial" />
          <span>{{ Math.round(selectedMaterialRoughness * 100) }}%</span>
        </div>
        <div class="control-group">
          <label>金属度:</label>
          <input type="range" min="0" max="1" step="0.01" v-model="selectedMaterialMetalness"
            @input="updateSelectedMaterial" />
          <span>{{ Math.round(selectedMaterialMetalness * 100) }}%</span>
        </div>
        <el-button @click="resetSelectedMaterial">重置材质</el-button>
      </div> -->
      <div class="loading-indicator" v-if="showLoadingIndicator">
        <h3>正在加载园区模型...</h3>
        <el-progress :percentage="loadingProgress" :stroke-width="20" :text-inside="true"></el-progress>
        <p class="progress-text">{{ loadingProgress }}% - 请稍候...</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import * as lib from 'gimp-tools'
import { fetchPosts } from '@/api/user'

// 导入Three.js核心库和相关模块
import * as THREE from 'three'
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js'
import { OBJLoader } from 'three/addons/loaders/OBJLoader.js';
import { MTLLoader } from 'three/addons/loaders/MTLLoader.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'
import { RGBELoader } from 'three/addons/loaders/RGBELoader.js'
import { CSS2DRenderer, CSS2DObject } from 'three/addons/renderers/CSS2DRenderer.js';// 引入CSS2渲染器CSS2DRenderer和CSS2模型对象CSS2DObject 
import { CSS3DRenderer, CSS3DObject } from 'three/addons/renderers/CSS3DRenderer.js';// 引入CSS3渲染器CSS3DRenderer
import { createLabel } from '@/utils/SpriteThree'; //标签
import DeviceSpriteDom from '@/utils/device'; // 精灵DOM类

// Vue响应式数据
import { ref, onMounted, onUnmounted, onBeforeUnmount } from 'vue'
import router from '@/router'


// 模型状态
const modelContainer = ref(null)
const modelLoaded = ref(false)
const showLoadingIndicator = ref(true)
const loadingProgress = ref(0)
const selectedObject = ref(null)
const selectedMaterialColor = ref('#ffffff')
const selectedMaterialOpacity = ref(1)
const selectedMaterialRoughness = ref(0.5)
const selectedMaterialMetalness = ref(0.5)
const originalMaterials = new Map()
const selectedObjectName = ref('')

// 存储对象的原始位置，用于动画恢复
const originalPositions = new Map()
// 存储需要动画的对象
const animatingObjects = ref([])
// 存储显示的标签对象
const nameLabels = new Map()

// Three.js场景相关变量
let scene, camera, renderer, controls, loader, labelRenderer

// 标签数组
const labelList = [
  {
    color: "#eef0a7",
    name: "陶然楼",
    value: "陶然楼一层",
    position: { x: 140, y: -2, z: 50 },
    scale: 1,
    route: '/trfirst'  // 添加路由信息
  },
  {
    color: "#eef0a7",
    name: "陶然楼",
    value: "陶然楼二层",
    position: { x: 140, y: 2, z: 50 },
    scale: 1,
    route: '/trsecond'  // 添加路由信息
  },
   {
    color: "#eef0a7",
    name: "陶然楼",
    value: "陶然楼三层",
    position: { x: 140, y: 6, z: 50 },
    scale: 1,
    route: '/trthird'  // 添加路由信息
  },
   {
    color: "#eef0a7",
    name: "陶然楼",
    value: "陶然楼负一层",
    position: { x: 140, y: -5, z: 50 },
    scale: 1,
    route: '/trfourth'  // 添加路由信息
  },
   {
    color: "#eef0a7",
    name: "陶然楼",
    value: "陶然楼五层",
    position: { x: 140, y: 10, z: 50 },
    scale: 1,
    route: '/trfifth'  // 添加路由信息
  },


  
];

// 创建模型名称标签
function createNameLabel(object) {
  // 先移除已有的标签
  removeNameLabel(object)

  // 创建画布来显示文本
  const canvas = document.createElement('canvas')
  const context = canvas.getContext('2d')
  const fontSize = 16
  context.font = `${fontSize}px Arial`

  // 测量文本宽度
  const textWidth = context.measureText(object.name).width + 10
  const textHeight = fontSize + 5
  canvas.width = textWidth
  canvas.height = textHeight

  // 重新设置字体并绘制背景
  context.font = `${fontSize}px Arial`
  context.fillStyle = 'rgba(0, 0, 0, 0.7)'
  context.fillRect(0, 0, textWidth, textHeight)

  // 绘制文本
  context.fillStyle = 'white'
  context.textAlign = 'center'
  context.textBaseline = 'middle'
  context.fillText(object.name, textWidth / 2, textHeight / 2)

  // 创建纹理和材质
  const texture = new THREE.CanvasTexture(canvas)
  const material = new THREE.SpriteMaterial({ map: texture, transparent: true })

  // 确保几何体有边界框
  if (!object.geometry.boundingBox) {
    object.geometry.computeBoundingBox()
  }

  // 创建精灵并设置位置
  const sprite = new THREE.Sprite(material)
  sprite.position.set(0, object.geometry.boundingBox.max.y + 1, 0)
  sprite.scale.set(textWidth * 0.1, textHeight * 0.1, 1)

  // 将标签添加到对象上
  object.add(sprite)

  // 存储标签引用以便后续移除
  nameLabels.set(object.uuid, sprite)
}

// 移除模型名称标签
function removeNameLabel(object) {
  if (nameLabels.has(object.uuid)) {
    const label = nameLabels.get(object.uuid)
    if (object.children.includes(label)) {
      object.remove(label)
      label.material.dispose()
      if (label.material.map) {
        label.material.map.dispose()
      }
    }
    nameLabels.delete(object.uuid)
  }
}

// 初始化Three.js场景
function initThreeScene() {
  const container = modelContainer.value
  if (!container) return

  console.log('开始初始化Three.js场景')

  // 创建场景
  scene = new THREE.Scene()
  // 暂时使用简单的背景颜色，以便更容易看到模型
  scene.background = new THREE.Color(0x87CEEB)  // 天蓝色背景
  
  // 注释掉天空盒，因为它可能会影响模型的可见性
  
  scene.background = new THREE.CubeTextureLoader()
    .setPath('/frtwin/sky/')
    .load(['px.jpg', 'nx.jpg', 'py.jpg', 'ny.jpg', 'pz.jpg', 'nz.jpg']
    );
  

    //暂时禁用雾化效果，以便更容易看到模型
    // scene.fog = new THREE.Fog(0xc1dbfe, 100, 300)

      // 开启雾化效果
    // renderer.outputEncoding = THREE.sRGBEncoding
    // renderer.toneMapping = THREE.ACESFilmicToneMapping
    // renderer.toneMappingExposure = 1.2
    // renderer.shadowMap.enabled = true
    // renderer.shadowMap.type = THREE.PCFSoftShadowMap
    
  // 创建相机
  const width = container.clientWidth
  const height = container.clientHeight
  camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000)
  // 调整相机位置，确保能看到模型
  camera.position.set(50, 50, 150)  // 这个位置应该能看到原点附近的模型
  camera.lookAt(0, 20, 0)  // 看向模型可能的中心位置
  console.log('相机初始化完成，位置:', camera.position)
  
  // 创建渲染器
  renderer = new THREE.WebGLRenderer({ antialias: true })
  renderer.setSize(width, height)
  renderer.setPixelRatio(window.devicePixelRatio)
  container.appendChild(renderer.domElement)
  
  // 创建CSS2渲染器用于显示标签
  labelRenderer = new CSS2DRenderer();
  labelRenderer.setSize(width, height);
  labelRenderer.domElement.style.position = 'absolute';
  labelRenderer.domElement.style.top = '0';
  labelRenderer.domElement.style.pointerEvents = 'none'; // 允许标签响应鼠标事件
  container.appendChild(labelRenderer.domElement);

  // 添加轨道控制器
  controls = new OrbitControls(camera, renderer.domElement)
  controls.enableDamping = false
  // controls.dampingFactor = 0.05
  controls.autoRotate = false
  
  // 限制上下旋转角度
  controls.minPolarAngle = Math.PI / 12// 30度（不允许用户完全向下看）
  controls.maxPolarAngle = 2 * Math.PI / 4 // 90度（不允许用户完全向上看）

  // 添加环境光 - 增加强度以确保模型可见
  const ambientLight = new THREE.AmbientLight(0xffffff, 2.0)  // 增加环境光强度
  scene.add(ambientLight)
  console.log('环境光添加完成，强度: 2.0')

  // 添加平行光
  const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5)
  directionalLight.position.set(5, 10, 7.5)
  scene.add(directionalLight)

  // 沿着X轴添加平行光
  const xAxisLight = new THREE.DirectionalLight(0xf8f8f8, 4.0)  // 略微调整光色并增加强度，使阴影更加明显
  xAxisLight.position.set(200, 100, 50)  // 提高光源位置，使阴影更长更明显
  // 增加光源面积
  xAxisLight.shadow.camera.left = -500
  xAxisLight.shadow.camera.right = 500
  xAxisLight.shadow.camera.top = 500
  xAxisLight.shadow.camera.bottom = -500
  xAxisLight.target.position.set(-100, 0, 0)  // 指向模型中心位置
  scene.add(xAxisLight)
  scene.add(xAxisLight.target)

  // 线框显示光照范围
  // const lightHelper = new THREE.DirectionalLightHelper(xAxisLight, 50)
  // scene.add(lightHelper)

  // 配置阴影 - 强化阴影效果
  xAxisLight.castShadow = true
  xAxisLight.shadow.normalBias = 0.05  // 添加法线偏移，减少阴影痤疮

  // 配置阴影贴图 - 减少阴影虚化
  renderer.shadowMap.enabled = true
  renderer.shadowMap.type = THREE.PCFShadowMap  // 使用PCF阴影而非PCFSoft，减少虚化
  renderer.shadowMap.autoUpdate = true
  renderer.shadowMap.needsUpdate = true

  // 平行光阴影相机配置 - 优化阴影质量和范围，减少虚化
  xAxisLight.shadow.mapSize.width = 4096
  xAxisLight.shadow.mapSize.height = 4096
  xAxisLight.shadow.camera.near = 0.1
  xAxisLight.shadow.camera.far = 800  // 缩小far值，提高阴影精度
  xAxisLight.shadow.camera.left = -300
  xAxisLight.shadow.camera.right = 300
  xAxisLight.shadow.camera.top = 300
  xAxisLight.shadow.camera.bottom = -300
  xAxisLight.shadow.camera.updateProjectionMatrix()

  // 减少阴影边缘虚化程度并增强阴影颜色深度
  xAxisLight.shadow.bias = -0.0001  // 负值可以使阴影更明显
  xAxisLight.shadow.normalBias = 0.01

  // 调整阴影贴图的分辨率和质量以增强阴影效果
  xAxisLight.shadow.mapSize.width = 8192
  xAxisLight.shadow.mapSize.height = 8192

  // 添加阴影相机辅助器（调试用）
  // const shadowCameraHelper = new THREE.CameraHelper(xAxisLight.shadow.camera)
  // scene.add(shadowCameraHelper)


  // 添加坐标轴辅助
  const axesHelper = new THREE.AxesHelper(0)
  scene.add(axesHelper)

  // 添加地面网格辅助线
  // const gridHelper = new THREE.GridHelper(500, 0, 0x444444, 0x222222)
  // scene.add(gridHelper)

  // 添加500x500的地面平面以接收阴影
  const groundGeometry = new THREE.PlaneGeometry(500, 500)
  const groundMaterial = new THREE.MeshStandardMaterial({
    color: 0x888888,
    roughness: 0.8,
    metalness: 0.2
  })
  const ground = new THREE.Mesh(groundGeometry, groundMaterial)
  ground.rotation.x = -Math.PI / 2  // 旋转地面使其水平
  ground.position.y = -10  // 设置地面高度
  ground.receiveShadow = true  // 允许地面接收阴影
  // scene.add(ground)

  // 监听窗口大小变化
  window.addEventListener('resize', onWindowResize)

  // 开始渲染循环
  animate()
}



// 加载OBJ模型和MTL材质
function loadModel() {
  try {
    console.log('开始加载模型')
    showLoadingIndicator.value = true
    loadingProgress.value = 0
    console.log('开始加载MTL材质文件: /frtwin/TAO.mtl')
    // 先加载材质文件
    const mtlLoader = new MTLLoader();
    mtlLoader.load(
      '/frtwin/TAO.mtl',
      (materials) => {
        console.log('MTL材质加载成功，开始预加载材质')
        // 设置材质
        materials.preload();
        
        console.log('开始加载OBJ模型: /frtwin/TAO.obj')
        // 然后加载OBJ模型
        const objLoader = new OBJLoader();
        objLoader.setMaterials(materials);
          // 设置加载进度回调
        objLoader.load(
          '/frtwin/TAO.obj',
          (object) => {
            console.log('OBJ模型加载成功，开始处理模型')
            // 处理加载完成的模型
            const model = object
            scene.add(model)
            console.log('模型已添加到场景:', model)
            console.log('模型包含的子对象数量:', model.children.length)

            // 居中模型
            centerModel(model)

            try {
              AddLabels(); //加载标签 
            } catch (error) {
              console.error('加载标签失败:', error)
            }

            // 存储原始材质并设置阴影属性
            model.traverse((child) => {
              if (child.isMesh && child.material) {
                // 设置阴影属性
                child.castShadow = true
                child.receiveShadow = true
                
                // 为了确保模型可见，为所有网格对象设置基本材质属性
                if (!Array.isArray(child.material)) {
                  // 确保材质有基本颜色
                  if (!child.material.color) {
                    child.material.color = new THREE.Color(0xffffff);
                  }
                  // 确保材质有合适的透明度
                  if (child.material.opacity === undefined) {
                    child.material.opacity = 1;
                  }
                  // 确保材质有合适的金属度和粗糙度
                  if (child.material.roughness === undefined) {
                    child.material.roughness = 0.5;
                  }
                  if (child.material.metalness === undefined) {
                    child.material.metalness = 0.5;
                  }
                }

                // 存储原始材质
                if (Array.isArray(child.material)) {
                  child.material.forEach((mat, index) => {
                    originalMaterials.set(`${child.uuid}-${index}`, {
                      color: mat.color ? mat.color.getHexString() : 'ffffff',
                      opacity: mat.opacity || 1,
                      roughness: mat.roughness || 0.5,
                      metalness: mat.metalness || 0.5
                    })
                  })
                } else {
                  originalMaterials.set(child.uuid, {
                    color: child.material.color ? child.material.color.getHexString() : 'ffffff',
                    opacity: child.material.opacity || 1,
                    roughness: child.material.roughness || 0.5,
                    metalness: child.material.metalness || 0.5
                  })
                }

                // 默认为名称为'玻璃'的对象设置默认材质属性
                if (child.name && (child.name.includes('玻璃') || child.name === '立方体011' || child.name === '立方体007' || child.name === '立方体008'  ||  child.name === '立方体009') && !Array.isArray(child.material)) {
                  child.material.color.set(0x55739f)
                  child.material.opacity = 0.6
                  child.material.roughness = 0.5
                  child.material.metalness = 0.5
                  child.material.transparent = true
                }
                
                // 玻璃001 材质 
                if (child.name && (child.name === '玻璃003' || child.name === 'Rectangle468003') && !Array.isArray(child.material)) {
                  child.material.color.set(0x8dacd4)
                  child.material.opacity = 0.6
                  child.material.roughness = 0.5
                  child.material.metalness = 0.5
                  child.material.transparent = true     
                }

                // 白膜材质
                if (child.name && (child.name === '立方体007' || child.name === '立方体031' || child.name === '立方体050') && !Array.isArray(child.material)) {
                  child.material.color.set(0xeeeeee)
                  child.material.opacity = 1
                  child.material.roughness = 0
                  child.material.metalness = 0.5
                  child.material.transparent = false
                }

              }
            })

            // 调试：将相机对准模型中心
            console.log('调整相机位置以确保能看到模型')
            // 完成加载
            modelLoaded.value = true
            showLoadingIndicator.value = false
            loadingProgress.value = 100

            console.log('模型加载完成，已显示在场景中')

            // 添加点击事件监听
            addClickEventListener()
          },
          (xhr) => {
            // 更新加载进度
            const progress = Math.round((xhr.loaded / xhr.total) * 100)
            loadingProgress.value = progress
            console.log(`OBJ模型加载进度: ${progress}%`)
          },
          (error) => {
            console.error('OBJ模型加载错误:', error)
            showLoadingIndicator.value = false
            alert('模型加载失败，请刷新页面重试')
          }
        )


    },
    (xhr) => {
      // 更新材质加载进度
      const progress = Math.round((xhr.loaded / xhr.total) * 50)
      loadingProgress.value = progress
      console.log(`MTL材质加载进度: ${progress}%`)
    },
    (error) => {
      console.error('MTL材质加载错误:', error)
      showLoadingIndicator.value = false
      alert('材质加载失败，请刷新页面重试')
    });

  } catch (error) {
    console.error('加载过程发生错误:', error)
    showLoadingIndicator.value = false
  }
}



// 将模型位置设置在原点
function centerModel(model) {
  // 直接将模型位置设置为原点(0, 0, 0)
  model.position.set(0, 0, 0)
}

// 添加点击事件监听
function addClickEventListener() {
  const raycaster = new THREE.Raycaster()
  const mouse = new THREE.Vector2()

  function onMouseClick(event) {
    // 计算鼠标在标准化设备坐标中的位置
    const rect = renderer.domElement.getBoundingClientRect()
    mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1
    mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1

    // 设置射线投射器
    raycaster.setFromCamera(mouse, camera)

    // 计算与射线相交的对象
    const intersects = raycaster.intersectObjects(scene.children, true)

    if (intersects.length > 0) {
      const object = intersects[0].object
      //检测鼠标点击交点
      const worldSignalPos = intersects[0].point; // 射线与地面的交点（世界坐标）
      console.log('鼠标点击交点坐标:', worldSignalPos)



      // 确保是网格对象且有材质
      if (object.isMesh && object.material) {
        selectedObject.value = object
        console.log('选中的材质对象名称:', object.name)
        selectedObjectName.value = object.name

        // 创建并显示模型名称标签
        // createNameLabel(object)

        // 存储对象的原始位置（如果还没有存储）
        if (!originalPositions.has(object.uuid)) {
          originalPositions.set(object.uuid, { x: object.position.x, y: object.position.y, z: object.position.z })
        }

        // 将对象设置为黄色
        if (Array.isArray(object.material)) {
          object.material.forEach(material => {
            // material.color.set(0xffff00) // 黄色
          })
        } else {
          // object.material.color.set(0xffffff) // 黄色
        }

        // 添加到动画对象列表****
        //添加多个模型对象到动画列表 怎么写？
        // 定义需要添加到动画列表的模型名称数组
        const targetModels = ['立方体076_1', '立方体077', '立方体078', '立方体079', '立方体080']
        if (!animatingObjects.value.includes(object)) {
          // 如果模型名称 为 立方体120_2 才执行动画
          if (object.name === '立方体076_1') {
            animatingObjects.value.push(object)
          }

            // animatingObjects.value.push(object)
            
          
        }


        // 更新材质控制面板的值
        if (Array.isArray(object.material)) {
          // 处理多材质情况，这里简单处理第一个材质
          const material = object.material[0]
          selectedMaterialColor.value = `#${material.color.getHexString()}`
          selectedMaterialOpacity.value = material.opacity
          selectedMaterialRoughness.value = material.roughness || 0.5
          selectedMaterialMetalness.value = material.metalness || 0.5
        } else {
          // 处理单材质情况
          const material = object.material
          selectedMaterialColor.value = `#${material.color.getHexString()}`
          selectedMaterialOpacity.value = material.opacity
          selectedMaterialRoughness.value = material.roughness || 0.5
          selectedMaterialMetalness.value = material.metalness || 0.5
        }
      }
    } else {
      // 点击其他位置，让原来的模型回到原位置
      // 重置所有动画对象到原始位置
      for (let i = animatingObjects.value.length - 1; i >= 0; i--) {
        const object = animatingObjects.value[i]
        const originalPos = originalPositions.get(object.uuid)

        if (originalPos) {
          object.position.x = originalPos.x
          object.position.y = originalPos.y
          object.position.z = originalPos.z

          // 重置当前对象的材质颜色
          resetObjectMaterial(object)

          // 移除名称标签
          removeNameLabel(object)

          // 从动画列表中移除
          animatingObjects.value.splice(i, 1)
        }
      }

      // 清除选中状态
      selectedObject.value = null
      selectedObjectName.value = ''
    }
  }

  renderer.domElement.addEventListener('click', onMouseClick)
}


//加载标签
const AddLabels = () => {
  console.log('加载标签。。。')
  labelList.forEach((label) => {
    const labelElement = new DeviceSpriteDom(label.color, label.value).getElement();
    
    // 为标签添加点击事件处理
    labelElement.style.cursor = 'pointer'; // 显示手型光标
    labelElement.style.pointerEvents = 'auto'; // 允许标签响应鼠标事件
    labelElement.onclick = (event) => {
      event.stopPropagation(); // 阻止事件冒泡
      if (label.route) {
        console.log(`跳转到路由: ${label.route}`);
        // 使用window.location.href进行跳转
        // window.location.href = '/frtwin'+ label.route;
        // 使用vue3 导航式路由跳转
        router.push(label.route)
      }
    };
    
    const box = createLabel({
      name: label.name,
      type: "CSS2DObject",
      element: labelElement,
    });
    box.scale.set(label.scale, label.scale, label.scale);
    box.position.set(label.position.x, label.position.y, label.position.z);
    scene.add(box);
  });
};
//卸载标签
const DelLabels = () => {
  labelList.forEach((label) => {
    const tempLabel = scene.children.find(t => t.name == label.name)
    if (tempLabel != null && tempLabel != 'undefined') {
      scene.remove(tempLabel)
    }
  })

}
 
// 更新选中对象的材质
function updateSelectedMaterial() {
  if (!selectedObject.value || !selectedObject.value.material) return

  if (Array.isArray(selectedObject.value.material)) {
    // 处理多材质情况，这里简单处理第一个材质
    const material = selectedObject.value.material[0]
    material.color.set(selectedMaterialColor.value)
    material.opacity = selectedMaterialOpacity.value
    if (material.roughness !== undefined) {
      material.roughness = selectedMaterialRoughness.value
    }
    if (material.metalness !== undefined) {
      material.metalness = selectedMaterialMetalness.value
    }
  } else {
    // 处理单材质情况
    const material = selectedObject.value.material
    material.color.set(selectedMaterialColor.value)
    material.opacity = selectedMaterialOpacity.value
    if (material.roughness !== undefined) {
      material.roughness = selectedMaterialRoughness.value
    }
    if (material.metalness !== undefined) {
      material.metalness = selectedMaterialMetalness.value
    }
  }
}

// 重置特定对象的材质
function resetObjectMaterial(object) {
  if (!object || !object.material) return

  if (Array.isArray(object.material)) {
    // 处理多材质情况
    object.material.forEach((material, index) => {
      const original = originalMaterials.get(`${object.uuid}-${index}`)
      if (original) {
        material.color.set(original.color)
        material.opacity = original.opacity
        if (material.roughness !== undefined) {
          material.roughness = original.roughness
        }
        if (material.metalness !== undefined) {
          material.metalness = original.metalness
        }
      }
    })
  } else {
    // 处理单材质情况
    const original = originalMaterials.get(object.uuid)
    if (original) {
      const material = object.material
      material.color.set(original.color)
      material.opacity = original.opacity
      if (material.roughness !== undefined) {
        material.roughness = original.roughness
      }
      if (material.metalness !== undefined) {
        material.metalness = original.metalness
      }
    }
  }
}

// 重置选中对象的材质
function resetSelectedMaterial() {
  if (!selectedObject.value || !selectedObject.value.material) return

  if (Array.isArray(selectedObject.value.material)) {
    // 处理多材质情况
    selectedObject.value.material.forEach((material, index) => {
      const original = originalMaterials.get(`${selectedObject.value.uuid}-${index}`)
      if (original) {
        material.color.set(original.color)
        material.opacity = original.opacity
        if (material.roughness !== undefined) {
          material.roughness = original.roughness
        }
        if (material.metalness !== undefined) {
          material.metalness = original.metalness
        }
      }
    })

    // 更新控制面板的值
    const original = originalMaterials.get(`${selectedObject.value.uuid}-0`)
    if (original) {
      selectedMaterialColor.value = original.color
      selectedMaterialOpacity.value = original.opacity
      selectedMaterialRoughness.value = original.roughness
      selectedMaterialMetalness.value = original.metalness
    }
  } else {
    // 处理单材质情况
    const original = originalMaterials.get(selectedObject.value.uuid)
    if (original) {
      const material = selectedObject.value.material
      material.color.set(original.color)
      material.opacity = original.opacity
      if (material.roughness !== undefined) {
        material.roughness = original.roughness
      }
      if (material.metalness !== undefined) {
        material.metalness = original.metalness
      }

      // 更新控制面板的值
      selectedMaterialColor.value = original.color
      selectedMaterialOpacity.value = original.opacity
      selectedMaterialRoughness.value = original.roughness
      selectedMaterialMetalness.value = original.metalness
    }
  }
}

// 窗口大小变化处理
function onWindowResize() {
  if (!camera || !renderer || !modelContainer.value || !labelRenderer) return

  const container = modelContainer.value
  const width = container.clientWidth
  const height = container.clientHeight

  camera.aspect = width / height
  camera.updateProjectionMatrix()

  renderer.setSize(width, height)
  labelRenderer.setSize(width, height);
}

// 动画循环
function animate() {
  requestAnimationFrame(animate)

 // 实时获取相机位置
  const cameraX = camera.position.x;
  const cameraY = camera.position.y;
  const cameraZ = camera.position.z;

  // 打印到控制台（相机位置）
  // console.log(`相机实时位置：x=${cameraX.toFixed(2)}, y=${cameraY.toFixed(2)}, z=${cameraZ.toFixed(2)}`);




  if (controls) {
    controls.update()
  }

  // 处理动画对象 - 沿y轴向上移动
  for (let i = animatingObjects.value.length - 1; i >= 0; i--) {
    const object = animatingObjects.value[i]
    const originalPos = originalPositions.get(object.uuid)

    // 向上移动的距离（可以根据需要调整移动速度和最大距离）
    const moveDistance = 0.2
    const maxMoveDistance = 10

    if (object.position.y - originalPos.y < maxMoveDistance) {
      object.position.y += moveDistance
    } else {
      // 如果达到最大移动距离，可以选择停止动画或执行其他操作
      // 这里我们保留在列表中，保持在移动后的位置
    }
  }

  // 确保阴影贴图持续更新
  if (renderer && renderer.shadowMap) {
    renderer.shadowMap.needsUpdate = true
  }

  if (renderer && scene && camera) {
    renderer.render(scene, camera)
  }
  
  // 渲染CSS2标签
  if (labelRenderer && scene && camera) {
    labelRenderer.render(scene, camera)
  }
}

// 清理资源
function cleanup() {
  window.removeEventListener('resize', onWindowResize)

  if (renderer && renderer.domElement) {
    renderer.dispose()
    if (modelContainer.value && modelContainer.value.contains(renderer.domElement)) {
      modelContainer.value.removeChild(renderer.domElement)
    }
  }

  if (controls) {
    controls.dispose()
  }
}

// 处理请求
async function handleRequest() {
  const posts = await fetchPosts()
  console.log(posts)
}

// 组件挂载时初始化
onMounted(() => {
  initThreeScene()
  loadModel()
})

// 组件卸载时清理
onUnmounted(() => {
  cleanup()
})
</script>

<style scoped>
.digital-twin-container {
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: #f5f5f5;
  overflow: hidden;
}

.header-section {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 24px;
  background-color: #fff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  z-index: 100;
}

.header-section h1 {
  margin: 0;
  color: #1890ff;
  font-size: 24px;
  font-weight: 500;
}

.action-buttons {
  display: flex;
  gap: 12px;
}

.three-container {
  flex: 1;
  position: relative;
  overflow: hidden;
}

#model-container {
  width: 100%;
  height: 100%;
}

.model-info {
  position: absolute;
  top: 20px;
  left: 20px;
  background-color: rgba(0, 0, 0, 0.7);
  color: #fff;
  padding: 16px;
  border-radius: 8px;
  font-size: 12px;
  max-width: 250px;
  z-index: 10;
}

.model-info p {
  margin: 4px 0;
  line-height: 1.4;
}

.material-controls {
  position: absolute;
  top: 20px;
  right: 20px;
  background-color: rgba(0, 0, 0, 0.7);
  color: #fff;
  padding: 16px;
  border-radius: 8px;
  width: 250px;
  z-index: 10;
}

.material-controls h4 {
  margin: 0 0 12px 0;
  text-align: center;
  font-size: 16px;
}

.control-group {
  margin-bottom: 12px;
  display: flex;
  align-items: center;
  gap: 8px;
}

.control-group label {
  width: 80px;
  font-size: 12px;
}

.control-group input[type="range"] {
  flex: 1;
}

.control-group span {
  width: 50px;
  text-align: right;
  font-size: 12px;
}

.control-group input[type="color"] {
  width: 40px;
  height: 30px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.loading-indicator {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: rgba(0, 0, 0, 0.8);
  color: #fff;
  padding: 32px;
  border-radius: 12px;
  text-align: center;
  z-index: 100;
  min-width: 300px;
}

.loading-indicator h3 {
  margin: 0 0 20px 0;
  font-size: 18px;
}

.progress-text {
  margin-top: 16px;
  font-size: 14px;
}

/* 确保Three.js渲染器占满容器 */
:deep(canvas) {
  display: block;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .header-section {
    flex-direction: column;
    gap: 12px;
    padding: 12px;
  }

  .header-section h1 {
    font-size: 20px;
  }

  .model-info,
  .material-controls {
    position: relative;
    top: auto;
    left: auto;
    right: auto;
    max-width: 100%;
    margin: 12px;
  }

  .loading-indicator {
    min-width: 250px;
    padding: 24px;
  }
}
</style>