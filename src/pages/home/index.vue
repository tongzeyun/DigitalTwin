<!--
 * @Description: 
 * @Author: YiFan Zhang
 * @LastEditors: YiFan Zhang
 * @LastEditTime: 2025-09-23 09:12:59
-->
<template>
  <div class="digital-twin-container">
    <div class="header-section" style="display: none;">
      <!-- <h1>三维数字孪生园区展示</h1> -->
<!-- 	 <el-button @click="toDigital">原点</el-button> -->
	 <!-- 
	  <div class="pos">
	      <div id="A" class="bu">立方体016</div>
	      <div id="B" class="bu" style="margin-left: 10px;">立方体032</div>
	      <div id="car" class="bu" style="margin-left: 10px;">立方体042</div>
	      <div id="all" class="bu" style="margin-left: 10px;">整体</div>
	  </div> -->
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
        <!-- <loadText/> -->
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
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'
import { RGBELoader } from 'three/addons/loaders/RGBELoader.js'
import { CSS2DRenderer, CSS2DObject } from 'three/addons/renderers/CSS2DRenderer.js';// 引入CSS2渲染器CSS2DRenderer和CSS2模型对象CSS2DObject 
import { CSS3DRenderer, CSS3DObject } from 'three/addons/renderers/CSS3DRenderer.js';// 引入CSS3渲染器CSS3DRenderer
import { AnimationMixer, AnimationAction } from 'three';
// import { AnimationMixer, AnimationAction } from 'three/addons/animation/AnimationMixer.js';
import { createLabel } from '@/utils/SpriteThree'; //标签
import DeviceSpriteDom from '@/utils/device'; // 精灵DOM类

// Vue响应式数据
import { ref, onMounted, onUnmounted } from 'vue'
import router from '@/router'
import { log } from 'three/tsl'

import TWEEN from '@tweenjs/tween.js'
import loadText from '../textEchartsAll/loadText.vue'
// import player from "./js/player.js"; //注意路径

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
// let NumObject = 1

// let mixer: AnimationMixer; // 动画混合器（管理模型所有动画）
// let camera: THREE.PerspectiveCamera | THREE.OrthographicCamera; // 模型内置摄像机
// Three.js场景相关变量
let scene, camera, renderer, controls, loader, labelRenderer, mixer // 动画混合器
let clock // 时钟，用于动画更新
let worldSignalPos //坐标
// 动画存储
const animations = new Map() // 存储每个对象的动画动作

// 标签数组
const labelList = [
  // {
  //   color: "#eef0a7",
  //   name: "陶然楼",
  //   value: "陶然楼一层",
  //   position: { x: 140, y: -2, z: 50 },
  //   scale: 1,
  //   route: '/trfirst'  // 添加路由信息
  // },
  // {
  //   color: "#eef0a7",
  //   name: "陶然楼",
  //   value: "陶然楼二层",
  //   position: { x: 140, y: 2, z: 50 },
  //   scale: 1,
  //   route: '/trsecond'  // 添加路由信息
  // },
  // {
  //   color: "#eef0a7",
  //   name: "陶然楼",
  //   value: "陶然楼三层",
  //   position: { x: 140, y: 6, z: 50 },
  //   scale: 1,
  //   route: '/trthird'  // 添加路由信息
  // },
  // {
  //   color: "#eef0a7",
  //   name: "陶然楼",
  //   value: "陶然楼负一层",
  //   position: { x: 140, y: -5, z: 50 },
  //   scale: 1,
  //   route: '/trfourth'  // 添加路由信息
  // },
  // {
  //   color: "#eef0a7",
  //   name: "陶然楼",
  //   value: "陶然楼五层",
  //   position: { x: 140, y: 10, z: 50 },
  //   scale: 1,
  //   route: '/trfifth'  // 添加路由信息
  // },
  {
    color: "#eef0a7",
    name: "陶然楼",
    value: "陶然楼",
    position: { x: 100, y: 10, z: 35 },
	pos: { x:115, y: 6, z: 70 },
	pos2: { x:115, y: 10, z:85},   
    scale: 1,
  },
  {
    color: "#eef0a7",
    name: "综合楼",
    value: "综合楼",
    position: { x: 30, y: 6, z: 40 },
	pos: { x:25, y: 10, z: 50 },
	pos2: { x:28, y: 20, z: 75 },
    scale: 1,
  },
  {
    color: "#eef0a7",
    name: "聚德楼",
    value: "聚德楼",
    position: { x: -80, y: 6, z: 10 },
	pos: { x:-80, y: 6, z: 30 },
	pos2: { x:-40, y: 30, z: 30 },
    scale: 1,
  },{
    color: "#eef0a7",
    name: "保宁苑泳池",
    value: "保宁苑泳池",
    position: { x: -70, y: 6, z: 50 },
	pos: { x:-70, y: 6, z: 70 },
	pos2: { x:-30, y: 30, z: 10 },
    scale: 1,
    // route: '/trfifth'  // 添加路由信息
  },

];
let newStr,num;
let newArr = [];
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

  // 创建场景
  scene = new THREE.Scene()
  scene.background = new THREE.Color(0x87CEEB)  // 天蓝色背景
  //天空盒
  scene.background = new THREE.CubeTextureLoader()
    .setPath('/frtwin/sky/')
    .load(['px.jpg', 'nx.jpg', 'py.jpg', 'ny.jpg', 'pz.jpg', 'nz.jpg']
    );

  //雾化效果 
  scene.fog = new THREE.Fog(0xc1dbfe, 100, 300)

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
  // camera.position.set(20, 50, 150)
  camera.position.set(7.3, 60, 138.7)
  camera.lookAt(0, 60, 0)

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

  // 创建时钟用于动画更新
  clock = new THREE.Clock()
  // controls.dampingFactor = 0.05
  controls.autoRotate = false

  // 限制上下旋转角度
  controls.minPolarAngle = Math.PI / 12// 30度（不允许用户完全向下看）
  controls.maxPolarAngle = 2 * Math.PI / 4 // 90度（不允许用户完全向上看）

  // 添加环境光 - 进一步降低强度使阴影更明显
  const ambientLight = new THREE.AmbientLight(0xffffff, 1.5)  // 降低强度使阴影颜色更深
  scene.add(ambientLight)

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

// 加载HDR环境贴图
function loadHDRTexture() {
  return new Promise((resolve, reject) => {
    const hdrLoader = new RGBELoader()
    hdrLoader.load('/frtwin/hdr/sky.hdr', (texture) => {
      texture.mapping = THREE.EquirectangularReflectionMapping
      scene.environment = texture
      scene.background = texture
      resolve()
    }, undefined, reject)
  })
}
let gltfs = null;
let model = null;
let isDO = true;
// 加载GLB模型
async function loadGLBModel() {
  try {
    showLoadingIndicator.value = true
    loadingProgress.value = 0

    // 尝试加载HDR贴图（如果有）
    try {
      // await loadHDRTexture()
    } catch (error) {
      // console.warn('HDR贴图加载失败，使用默认环境', error)
    }


    // 加载GLB模型
    loader = new GLTFLoader()
// '/frtwin/area-test.glb',/frtwin/trl-model/b1b2/b1b2.glb
    // 设置加载进度回调
	  loader.load('/frtwin/area-test.glb',
    //loader.load('/frtwin/trl-model/b1b2/b1b2.glb',
      (gltf) => {
        // 处理加载完成的模型
        model = gltf.scene
        scene.add(model)
		console.log(scene)
        gltfs = gltf;
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
			
		
				// 从新给材质命名=》为了分层 =》取名：当没有楼层名，取parent,有的动画存在userData里，要改指定类型名，不然动画会失效
			  	if(child.name.indexOf('_t') === -1 ||child.name.indexOf('_f') === -1 ){ //未查到，楼层，楼顶名称
			  		// if(child.parent.name.indexOf('_t') !== -1 || child.parent.name.indexOf('_f') !== -1){ //父类名称找到并包含楼层楼顶,有的嵌套3层，不用加这判断
			  			child.name = child.parent.name
						// if(child.userData.name=='judelou f2 windows'){
						// 	// child.name="judelou_f2_windows"
						// 	let name = child.userData.name
						// 	child.name = name.replace(/ /g,'_')
						// } 
						if(child.userData.name){ //有些材质被命名在userData 里面，材质动画和名字有关联
							if(child.userData.name.indexOf(' f') !== -1){
								let name = child.userData.name
								let nameOne = name.replace(/ /g,'_') //judelou f2 windows==>judelou_f2_windows
								let nameTwo = nameOne.replace('.','')//zonghelou_f2.009 ==>zonghelou_f2009
								child.name = nameTwo
							}
							 if(child.userData.name.indexOf('u ') !== -1){ //聚德楼背面3楼玻璃没动画
							 	let name = child.userData.name
							 	let nameOne = name.replace(/ /g,'_') //judelou windows==>judelou_windows
							 	let nameTwo = nameOne.replace('.','')
							 	child.name = nameTwo
							 } 
						}
			  		// }
			  	}
	
				// child.traverse((item) => {
				//    if (item.isMesh && item.material) {
				
				// 	  	if(item.name.indexOf('_t') === -1 ||item.name.indexOf('_f') === -1 ){ //未查到，楼层，楼顶名称
				// 	  		if(item.parent.name.indexOf('_t') !== -1 || item.parent.name.indexOf('_f') !== -1){ //父类名称找到并包含楼层楼顶
				// 	  			item.name = item.parent.name
				// 	  		}
				// 	  	}
				// 	}
				// })
				
			// console.log('模型加载完成child',child)
			// let a = child.name
			// if(a.indexOf('donghua') !== -1){//查找摄像机donghua
			// 	console.log('donghua',child)
			// }
			child.renderOrder=0
            // 设置阴影属性
            child.castShadow = true
            child.receiveShadow = true

            // 存储原始材质
            if (Array.isArray(child.material)) {
              child.material.forEach((mat, index) => {
                originalMaterials.set(`${child.uuid}-${index}`, {
                  color: mat.color.getHexString(),
                  opacity: mat.opacity,
                  roughness: mat.roughness || 0.5,
                  metalness: mat.metalness || 0.5
                })
              })
            } else {
              originalMaterials.set(child.uuid, {
                color: child.material.color.getHexString(),
                opacity: child.material.opacity,
                roughness: child.material.roughness || 0.5,
                metalness: child.material.metalness || 0.5
              })
            }
			
			
   //          // 默认为名称为'玻璃'的对象设置默认材质属性****
   //          if (child.name === '玻璃001' || child.name === '玻璃002' || child.name === '玻璃004' && !Array.isArray(child.material)) {
   //            child.material.color.set(0x55739f)
   //            child.material.opacity = 0.8
   //            child.material.roughness = 0.5
   //            child.material.metalness = 0.5
   //            child.material.transparent = true
   //          }
   //          // 玻璃001 材质 
   //          if (child.name === '玻璃003' || child.name === 'Rectangle468003' && !Array.isArray(child.material)) {
   //            // child.material.color.set(0x2d8b7b)

   //            child.material.color.set(0x8dacd4)
   //            child.material.opacity = 0.8
   //            child.material.roughness = 0.5
   //            child.material.metalness = 0.5

   //            child.material.transparent = true     //  // 确保材质支持透明度
   //          }




            // 白膜材质 立方体007_2
            // if (child.name === '立方体007' || child.name === '立方体031' || child.name === '立方体050' && !Array.isArray(child.material)) {
            //   child.material.color.set(0xeeeeee)
            //   child.material.opacity = 1
            //   child.material.roughness = 0
            //   child.material.metalness = 0.5
            //   // 确保材质支持透明度
            //   child.material.transparent = false
            // }



          }
		
        })
		// console.log('模型加载完成model1',model,model.length)
        // 完成加载
        modelLoaded.value = true
        showLoadingIndicator.value = false
        loadingProgress.value = 100


        // 添加点击事件监听
        addClickEventListener()
      },
      (xhr) => {
        // 更新加载进度
        const progress = Math.round((xhr.loaded / xhr.total) * 100)
        loadingProgress.value = progress
      },
      (error) => {
        console.error('模型加载错误', error)
        showLoadingIndicator.value = false
        // 显示错误提示
        alert('模型加载失败，请刷新页面重试')
      }
    )
  } catch (error) {
    console.error('加载过程发生错误', error)
    showLoadingIndicator.value = false
  }
}

//动画函数 
function loadAnimation(type) {
  if (gltfs.animations && gltfs.animations.length > 0) {
    
    console.log('模型包含动画数:', gltfs.animations.length)
    console.log('模型包含动画:', gltfs)
    let anis = [];  //存储 动画
	mixer = new THREE.AnimationMixer(model)
	switch(type){

			case "trl"://console.log('播放陶然楼模型的动画');
				anis = gltfs.animations.slice(0, 8);
			break;//第8是门卫屋
			case "zhlou"://console.log('播放综合楼的动画');
				anis = gltfs.animations.slice(9, 35);
				break;
			case "djl":
				anis = gltfs.animations.slice(35,66);
				break;
			case "YYG"://console.log('网格的动画，所有');
				anis = gltfs.animations.slice(55,65);
				break;
			case "all"://console.log('播放门岗模型的动画，所有');
				anis = gltfs.animations.slice(0,66);
				break;
			
			// default:
	}
	
	let playStatic
	
	

	newArr = ['trl','zhlou','djl','YYG','all']
	if (newStr && newStr !== type && newArr.indexOf(type) !== -1) { //存在并且不相等，先关闭其他模型,并且房顶才能关闭
		 	let anis2 = gltfs.animations.slice(0,);
		 	num=-1	
			playAnimation(anis2,num)
			newStr = type
			num=1
			playAnimation(anis,num)
			newStr = type
	}else if (!newStr) {
		 	num=1	
		 	playAnimation(anis,num)
			newStr = type
	}else if (newStr == type && newArr.indexOf(type) !== -1) { 
				if(num==1){  //重复点击同一个
					let anis2 = gltfs.animations.slice(0,);
					num=-1	
					playAnimation(anis2,num)
				}else{
					num=1
					playAnimation(anis,num)
				}
				newStr = type 
	}
	
	
			
		// if (newArr.indexOf(type) === -1) {
		// 	 	newArr.push(type);
		// 		// playStatic=true
		// 		  num=1
		// }else{
		// 		newArr=newArr.filter(item=>item != type)
		// 		// playStatic=false
		// 		   num=-1
		// } 
		
  }
}

function playAnimation(anis,num){
   anis.forEach((animation, index) => {
	    const activeAction = mixer.clipAction(animation)
	// activeAction.paused=false;
	 activeAction.timeScale=num;
	  // 设置动画只播放一次
	  activeAction.setLoop(THREE.LoopOnce);
	  
	  // 动画结束后保持最后一帧状态
	  
	// console.log('sssss1',newArr,playStatic); // 结果：
	  activeAction.clampWhenFinished = true;//playStatic;
	  
	  // 存储动画动作
	 
	  activeAction.play();
	})
}
// function toDigital(){

// 	const pos =new THREE.Vector3(0,59,100);//140.5.60// new THREE.Vector3(7,59,138);
// 	// console.log(pos)
// 	// // 相机飞行到的位置和观察目标拉开一定的距离,0正面，30则偏移30度
// 	// const pos2 =new THREE.Vector3(95,5,70);//140.5.60// new THREE.Vector3(7,59,138);
// 	const pos2 = pos.clone().addScalar(1)//.addScalar(0);//multiplyScalar(2)

// 	createCameraTween(pos2, pos)
	
// 	// camera.position.set(7,59,138);

// 	// NumObject = 1
// 	// this.camera
// }
function render() { 
	// const pos = new THREE.Vector3();
	// console.log(Object.getWorldPosition(pos))
	// const pos = new THREE.Vector3();
	// //获取三维场景中某个对象世界坐标
	// model.getObjectByName(chooseObj.name+'标注').getWorldPosition(pos); 
	
	
    TWEEN.update(); //循环已有 animate 放到 animate
}



function cameraTween(x,y,z,ax,ay,az) {
	// 		  	y高度视角（ty>y 俯视角度）
	// 		  	 z前后距离视角（tz>z 正面角度，反之背面）
	// 		  	 x左右偏移视角（tx>x 右侧角度，反之左侧）  tx与tz配合可实现侧面视角
	// 			  假设：屏幕整体下移，其他不变，需要tz与z减少相同的数字，上移则同时增加相同数字
	
		  const pos =new THREE.Vector3(x,y,z);//140.5.60// new THREE.Vector3(7,59,138);
		  const pos2 =new THREE.Vector3(ax,ay,az);//140.5.60// new THREE.Vector3(7,59,138);
		  createCameraTween(pos2, pos)
}
// 相机动画函数，从A点飞行到B点，A点表示相机当前所处状态
// pos: 三维向量Vector3，表示动画结束相机位置
// target: 三维向量Vector3，表示相机动画结束lookAt指向的目标观察点
function createCameraTween(endPos,endTarget){
    new TWEEN.Tween({
        // 不管相机此刻处于什么状态，直接读取当前的位置和目标观察点
        x: camera.position.x,
        y: camera.position.y,
        z: camera.position.z,
        tx: controls.target.x,
        ty: controls.target.y,
        tz: controls.target.z,
    })
    .to({
        // 动画结束相机位置坐标
        x: endPos.x,
        y: endPos.y,
        z: endPos.z,
        // 动画结束相机指向的目标观察点
        tx: endTarget.x,
        ty: endTarget.y,
        tz: endTarget.z,
    }, 1000)
    .onUpdate(function (obj) {
        // 动态改变相机位置
        camera.position.set(obj.x, obj.y, obj.z);
        // 动态计算相机视线 //视线值完全相当，将无法旋转
        controls.target.set(obj.tx, obj.ty, obj.tz);
		// console.log(obj)
		// controls.target.set(95,5,56);
        controls.update();//内部会执行.lookAt()
    })
    .start();
}

function keyUp(event) { 
	keys[event.keyCode] = false; 
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
	// model.visible=false
    // 计算与射线相交的对象
    const intersects = raycaster.intersectObjects(scene.children, true)

    if (intersects.length > 0) {
      const object = intersects[0].object
      //检测鼠标点击交点
       worldSignalPos = intersects[0].point; // 射线与地面的交点（世界坐标）
		console.log('鼠标点击交点坐标:',intersects,object.name,worldSignalPos,newStr,num)
		
		if(num==1){ //陶打开才能运行
				if(newStr==="trl"){//陶然楼
					// cameraTween(120,3,40,120,44,40) //indexTS.vue 可用此文件调试坐标
				   if(object.name === 'taoran_f5'){ //第五层
								visibleFalse('taoran_f5')
				   }else if(object.name === 'taoran_f3'){ // 第三层
								visibleFalse('taoran_f3')
				   }else if(object.name === 'taoran_f2'){ //第二层
								visibleFalse('taoran_f2')
				   }else if(object.name === 'taoran_f1'){ //第一层
								visibleFalse('taoran_f1')
				   }
				}
			if(newStr==="zhlou"){//综合楼
					// cameraTween(22,10,37,22,55,37) //indexTS.vue 可用此文件调试坐标
			  if(object.name.indexOf('zonghelou_f3')!==-1){ // 第三层
			  					visibleFalse('zonghelou_f3')
			  }else if(object.name.indexOf('zonghelou_f2')!==-1 || object.name.indexOf('zonghelouf2')!==-1){ //第二层
								visibleFalse('zonghelouf2')
			  }else if(object.name.indexOf('zonghelou_f1')!==-1){ //第一层
			  					visibleFalse('zonghelou_f1')
			  }
			}
			if(newStr==="YYG"){//
					// cameraTween(-60,3,45,-60,40,43) //indexTS.vue 可用此文件调试坐标
			  if(object.name.indexOf('youyonguan_f2')!==-1){ //第二层//baoningyuan_youyonguan
					visibleFalse("youyonguan_f2")
			  }else if(object.name.indexOf('youyonguan_f1')!==-1){ //第一层
			  		visibleFalse("youyonguan_f1")
			  }
			}
			if(newStr==="djl"){//
			  if(object.name.indexOf('judelou_f3')!==-1){ //第3层
					visibleFalse("judelou_f3")
			  }else if(object.name.indexOf('judelou_f2')!==-1){ //第2层
			  		visibleFalse("judelou_f2")
			  }else if(object.name.indexOf('judelou_f1')!==-1){ //第1层
			  		visibleFalse("judelou_f1")
			  }
			}
		
		}
      // 地面
      if(object.name === 'Scene' || object.name.indexOf('ground')!==-1){
		  // console.log('11111111111',object.name )
		visibleReply()
      }

      ///888888888888888  控制动画//
      let aniType = ''; // 动画类型
      
	  switch(object.name){
		    
	  		case "taoran__top"://console.log('播放陶然楼模型的动画');
	  			aniType = 'trl';
	  		break;
	  		case "zonghelou_top006"://console.log('播放综合楼的动画');
	  			aniType = 'zhlou';
	  			break;
	  		case "zonghelou_top007"://console.log('播放综合楼的动画');
	  			aniType = 'zhlou';
	  			break;
	  		case "judelou_f3_top":
	  			aniType = 'djl';
	  			break;
	  		case  "judelou_f2_top001":
	  			aniType = 'djl';
	  			break;
	  		case "baoningyuan_youyonguan_f3_top001":
	  			aniType = 'YYG';
	  			break;
	  		case "youyonguan_top":
	  			aniType = 'YYG';
	  			break;
	  		case "menwei002"://console.log('播放门岗模型的动画，所有');
	  			aniType = 'all';
	  			break;
	  		// default:
	  	 }
	 loadAnimation(aniType);
	  
      //888888888888888//

      // 确保是网格对象且有材质
      if (object.isMesh && object.material) {
        selectedObject.value = object
		// 
        console.log('选中的材质对象名称:',object, object.name)
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

        // 添加到动画对象列表***

        // if (!animatingObjects.value.includes(object)) {
        //   // 如果模型名称为立方体076_1，播放其动画
        //   if (object.name === '立方体076_1') {

        //     // 播放整个动画
        //      actions.play();
        //      console.log('播放整个模型的动画',actions);

        //   }

        //   // 添加到动画对象列表
        //   // animatingObjects.value.push(object)
        // }


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
      }else{
		  console.log(`1111: ${label}`,label);
		  
		  cameraTween(label.pos.x,label.pos.y,label.pos.z,label.pos2.x,label.pos2.y,label.pos2.z)
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
function visibleFalse(name){
		model.traverse((child) => {
		    if (child.isMesh && child.material) {
				 if(child.name.indexOf(name)!==-1 && child.name.indexOf('_top')===-1){ //模糊匹配xx_fx(楼层名)，并且楼层名里不包含_top(屋顶)
				 		child.material.visible=true
				 		child.visible=true
				 }else{
				 		child.material.visible=false
				 		child.visible=false
				 }
				 child.material.visible=true 
			}
		})
}
function visibleReply(){
		model.traverse((child) => {
		    if (child.isMesh && child.material) {
				child.material.visible=true
				child.visible=true
			}
		})
	
}
// 动画循环
function animate() {
	// TWEEN.update
	render();
	
  const deltaTime = clock.getDelta()
  requestAnimationFrame(animate)

   
  
        // if (keyStates.W) {
        //     //先假设W键对应运动方向为z
        //     const front = new THREE.Vector3(0,0,1);
        //     // W键按下时候，速度随着时间增加
        //     v.add(front.multiplyScalar(a * deltaTime));
        //     // 在间隔deltaTime时间内，玩家角色位移变化计算(速度*时间)
        //     const deltaPos = v.clone().multiplyScalar(deltaTime);
        //     player.position.add(deltaPos);//更新玩家角色的位置
        // }
    

  // 更新动画混合器
  // 不要循环播放
  if (mixer) {
    mixer.update(deltaTime)
  }

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
  // update2()
}
// function update2() {
//       keyboard.update2();
//       let moveDistance = 50;
//       const position = camera.position;
//       const rotation = camera.rotation.y;
//       if (keyboard.pressed("left") || keyboard.pressed("A")) {
//         // this.camera.rotation.set(0,this.camera.rotation.y+100,0)
//         camera.position.set(100, 200, 100);
//         // position.x-=moveDistance;
//         // this.camera.translateX(5);
//         // position.x+=moveDistance*Math.cos(rotation+Math.PI/2);
//         // position.z+=moveDistance*Math.sin(-rotation-Math.PI/2);
//       }
//       if (keyboard.pressed("right") || keyboard.pressed("D")) {
//         // position.x+=moveDistance;
//         camera.translateX(-5);
//         // position.x+=moveDistance*Math.cos(rotation-Math.PI/2);
//         // position.z+=moveDistance*Math.sin(-rotation+Math.PI/2);
//       }
//       if (keyboard.pressed("up") || keyboard.pressed("W")) {
//         camera.translateZ(-5);
//         // position.z-=moveDistance;
//         // position.x+=moveDistance*Math.cos(rotation);
//         // position.z+=moveDistance*Math.sin(-rotation);
//       }

//       if (keyboard.pressed("down") || keyboard.pressed("S")) {
//         camera.translateZ(5);
//         // position.z+=moveDistance;
//         // position.x-=moveDistance*Math.cos(rotation);
//         // position.z-=moveDistance*Math.sin(-rotation);
//       }
//       // console.log("x",position.x,"y",position.y,"z",position.z,"rotation",rotation)
//       // console.log("rotation",this.camera.rotation.y)
//       if (keyboard.pressed("R")) camera.translateZ(-5);
//       if (keyboard.pressed("F")) camera.translateZ(5);
//       // this.camera.rotateX(Math.PI/4);
//       //          if ( this.keyboard.pressed("Q") )
//       //          if ( this.keyboard.pressed("E") )
//       // this.controls.pan( new THREE.Vector3(0, -10, 0 ) );
//       // console.log('this.controls ',this.controls )
//       controls.update2();
//       // this.stats.update();
//     }
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
  loadGLBModel()

})

// 组件卸载时清理
onUnmounted(() => {
  cleanup()
})
</script>

<style lang="scss" scoped>

	    #close:hover {
	        cursor: pointer;
	    }

	
	
.digital-twin-container {
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: #f5f5f5;
  overflow: hidden;
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