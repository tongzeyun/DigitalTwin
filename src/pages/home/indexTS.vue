

<script setup>
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { TransformControls } from 'three/examples/jsm/controls/TransformControls.js'
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js'

import { ref, onMounted } from 'vue'
const container = ref(null)
const positionList = ref([
    [0, 3, 0]
])
let transformControlX = ref(0)
let transformControlY= ref(0)
let transformControlZ= ref(0)
// Three.js 相关变量
const scene = new THREE.Scene()
const renderer = new THREE.WebGLRenderer({
    antialias: true,
    alpha: true,
    logarithmicDepthBuffer: true
})
let camera, controls, transformControl

const pointer = new THREE.Vector2()
const point = new THREE.Vector3()
const raycaster = new THREE.Raycaster()
let splineHelperObjects = []
const ARC_SEGMENTS = 20
let splines = []


onMounted(() => {
    init()
    addMarkModel()

    render()
})


function init() {
//     // JavaScript 客户端示例
// var socket = new SockJS('/ws');
// var stompClient = Stomp.over(socket);

// stompClient.connect({}, function(frame) {
//     // 订阅公共主题
//     stompClient.subscribe('/topic/notifications', function(notification) {
//         // 处理收到的通知
//         console.log('Received: ' + notification.body);
//     });
    
//     // 订阅用户专属队列
//     stompClient.subscribe('/user/queue/messages', function(message) {
//         // 处理收到的个人消息
//         console.log('Private message: ' + message.body);
//     });
// });


    initHelper()
    // initLight() //拖动的方块颜色
    initCamera()

    loadGLBModel()
    initRender()


	

	// let chromeX = 116.27588
	// let chromeY = 40.248272  //假设这是谷歌地图对应3d地图的原点
	let chromeX = 116.275982//v116.275982,
	let chromeY = 40.248283//40.248283,
	let Multiples =70000
 

	let chromeArr=[// //谷歌随机选取4个点坐标
		{x:116.276031,y:40.248072},
        {x:116.274627,y:40.248648}, 
        {x:116.274018,y:40.248279},
        {x:116.273771,y:40.249402},
        {x:116.274358,y:40.248094},
        // {x:116.275347,y:40.248134},

		]
// 3d 越向右边,向下(x，z )越大，越向左边，向上（x,z）越小
	let threeArr=[   //3d点击获取对应的点坐标
		{x:7,y:22},                                 //综合楼圆
        {x:-42.65420904149749,y:15.111826473393474},
        {x:-89,y:-31},                              //篮球
        {x:-151,y:98},                              //13公寓
        {x:113.59884503081133,y:20.15886233782613},  //20#公寓与保宁苑聚德楼三岔口
        
	]

// // 谷歌 越向右边,向上(x，y )越大，越向左边，向下（x,y）越小
// 	let chromeArr=[// //谷歌随机选取4个点坐标
// 		{x:116.273624,y:40.249357},
// 		{x:116.274144,y:40.248510},
// 		{x:116.274358,y:40.248529},
// 		{x:116.277680,y:40.247159},
// 		{x:116.275971,y:40.247992},
// 		]
// // 3d 越向右边,向下(x，z )越大，越向左边，向上（x,z）越小
// 	let threeArr=[   //3d点击获取对应的点坐标
// 		{x:-166.08879011497467,y:-99.78890791827405},
// 	  {x:-125.08879011497467,y:-16},
//     {x:-112.08879011497467,y:-21},
//     {x:123.08879011497467,y:97},
//     {x:4,y:24},
// 		]
	let chromeArr2=[]
	let chromeArr3=[]
	// 模型位置与地图符合，所有准备根据范围从新给倍数
	chromeArr.map(item=>{

			chromeArr2.push({x:(item.x-chromeX)*Multiples,y:-(item.y-chromeY)*Multiples})
	
	})
	console.log(chromeArr3)
	console.log(chromeArr2)
	console.log(threeArr)
 
	
    container.value.addEventListener('pointermove', onPointerMove)
}

function initHelper() {
    scene.background = new THREE.Color(0xf0f0f0)

    // const axes = new THREE.AxesHelper(50)
    // scene.add(axes)

    const planeGeometry = new THREE.PlaneGeometry(20, 20)
    planeGeometry.rotateX(-Math.PI / 2)
    const planeMaterial = new THREE.ShadowMaterial({ color: 0x000000, opacity: 0.2 })
    const plane = new THREE.Mesh(planeGeometry, planeMaterial)
    plane.position.y = -20
    plane.receiveShadow = true
    scene.add(plane)

    // const helper = new THREE.GridHelper(2000, 100) //表格辅助识别坐标
    // helper.position.y = -19
    // helper.material.opacity = 0.25
    // helper.material.transparent = true
    // scene.add(helper)
}

function initCamera() {
    
    camera = new THREE.PerspectiveCamera(
        45,
        container.value.offsetWidth / container.value.offsetHeight,
        0.001,
        10000
    )
    camera.position.set(200, 200, 200)
}

// function initLight() {
//     const directLight = new THREE.DirectionalLight('#ffffff', 0.5)
//     const directLight1 = new THREE.DirectionalLight('#ffffff', 0.5)
//     const directLight2 = new THREE.PointLight('#ffffff', 0.5)
//     const ambientLight = new THREE.AmbientLight('#ffffff', 0.3)

//     directLight.castShadow = true
//     directLight.position.set(15, 15, 15)
//     directLight1.position.set(-15, -15, 15)
//     ambientLight.position.set(0, 0, -5)
//     directLight2.position.set(-15, 15, -15)
//     directLight2.castShadow = true

//     scene.add(directLight, directLight1, ambientLight, directLight2)
// }

function initRender() {
    renderer.setSize(1902, 935)
    renderer.outputEncoding = THREE.sRGBEncoding
    container.value.appendChild(renderer.domElement)
}
function initControls() {

    controls = new OrbitControls(camera, renderer.domElement)

    transformControl = new TransformControls(camera, renderer.domElement)
    // console.log('111111',camera,renderer.domElement)
    // transformControl.addEventListener('change', (event) => {
	// 		transformControl._positionStart = event.target._positionStart
	// 			transformControlX.value = event.target._positionStart.x
	// 			transformControlY.value = event.target._positionStart.y
	// 			transformControlZ.value = event.target._positionStart.z
    // })
    // transformControl.addEventListener('dragging-changed', function (event) {
	// 		controls.enabled = !event.value
    // })
    // transformControl.addEventListener('objectChange', param => {
    //     // updateSplineOutline()
    // })
    scene.add(transformControl.getHelper())
}
// 鼠标移动
function onPointerMove(event) {
    pointer.x = (event.clientX / window.innerWidth) * 2 - 1
    pointer.y = -(event.clientY / window.innerHeight) * 2 + 1

    raycaster.setFromCamera(pointer, camera)
    //  console.log('sssssssss',splineHelperObjects,model.children)

    const intersects = raycaster.intersectObjects(splineHelperObjects, true)


    if (intersects.length > 0) {
        const object = intersects[0].object
        console.log(object,intersects,transformControl.object,'SSSSSSSSS1111111111111')
        if (object !== transformControl.object) {
            transformControl.attach(object)
            controls.enabled = false
        }
    }
}
// // 更新连线
// function updateSplineOutline() {
//     for (let k = 0; k < splines.length; k++) {
//         const spline = splines[k]
//         const splineMesh = spline.mesh
//         const position = splineMesh.geometry.attributes.position
//         for (let i = 0; i < ARC_SEGMENTS; i++) {
//             const t = i / (ARC_SEGMENTS - 1)
//             spline.getPoint(t, point)
//             position.setXYZ(i, point.x, point.y, point.z)
//         }
//         position.needsUpdate = true
//     }
// }
function render() {
    requestAnimationFrame(render)
    // controls?.update()
    renderer.render(scene, camera)
}

let model = null;
// 加载GLB模型
 function loadGLBModel() {
    // 加载GLB模型
   let loader = new GLTFLoader()
    loader.load('/frtwin/trl-model/b1b2/b1b2.glb',
      (gltf) => {
        // 处理加载完成的模型
        model = gltf.scene
        scene.add(model)
        initControls()
		console.log(scene)
        splineHelperObjects.push(model) ///GUA
		})

}
function addMarkModel() {
    const spherGeometry = new THREE.BoxGeometry(30, 30, 30)
    const spherMaterial = new THREE.MeshPhongMaterial({
        transparent: true,
        opacity: 1,
        color: 'green'
    })
    const sphere = new THREE.Mesh(spherGeometry, spherMaterial)
    splineHelperObjects.push(sphere) // 关键
    scene.add(sphere)

    return sphere
}
</script>
<template>
    <div class="fa_container">
		
		红:x，绿y,红:z =======
		
		{{transformControlX }}==={{transformControlY }}==={{transformControlZ }}
		
        <div class="container" ref="container"></div>
    </div>
</template>
<style>
.container {
    width: 1902px;
    height: 935px;
    overflow: hidden;
    background: black;
    display: inline-block;
}
</style>
