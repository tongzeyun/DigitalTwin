<script setup>

import { ref,reactive, onMounted } from 'vue'
// 模型位置与地图符合，x根据中心，倍数扩大直到符合3d值,,（其中3d 2个选中点x值一致，，对应的地图2个点x值一致，证明地图方向一致）
    let chromeX = 116.275982//v116.275982,
	let chromeY = 40.248283//40.248283, ///然后找到3d与对应地图的中心点
	let Multiples =68000   
    let Multiples2 =92000   //3d对应的z被压缩了,比例不能按x的给
const formInline = reactive(
    {x:-89,y:-31}       
)
const formInline2 = reactive({
  x: 116.274627,y:40.248648,
})
let zb3dzbx = ref(0)
let zb3dzby = ref(0)
let sjzby = ref(0)
let sjzbx = ref(0)


onMounted(() => {
    // initHelper()
})
const onSubmit2 = () => {
    
	sjzbx.value=(formInline2.x-chromeX)*Multiples+2
    sjzby.value=-(formInline2.y-chromeY)*Multiples2+2  //加2是感觉中心点偏移了
    console.log('3D坐标',sjzbx,sjzby)
}
const onSubmit1 = () => {
	zb3dzbx.value=(formInline.x-2)/Multiples+chromeX
    zb3dzby.value=-(formInline.y-2)/Multiples2+chromeY
    console.log('世界坐标',zb3dzbx,zb3dzby)
}
// function initHelper() {

   
// 	let chromeArr=[// //谷歌随机选取4个点坐标
// 		{x:116.276031,y:40.248072},  //综合楼圆
//         {x:116.274627,y:40.248648}, //篮球
//         {x:116.274018,y:40.248279}, //18
//         {x:116.273771,y:40.249402},//13公寓              116.273774,40.249364     116.27986,40.250625        116.286248,40.256977
//         {x:116.274358,y:40.248094}, //20#公寓与保宁苑聚德楼三岔口
//         {x:116.275347,y:40.248134}, 
//         //116.277690,40.247169       116.283781,40.248434   116.290173,40.254780
//         //116.275354,40.249145       116.281442,40.250408   116.287831,40.256759
//         //116.275360,40.248793       116.281448,40.250056   116.287837,40.256407
// 		]
// // 3d 越向右边,向下(x，z )越大，越向左边，向上（x,z）越小
// 	let threeArr=[   //3d点击获取对应的点坐标
// 		{x:7,y:22},                                 //综合楼圆
//         {x:-89,y:-31},                              //篮球
//         {x:-133,y:3},                                ////18
//         {x:-151,y:-98},                              //13公寓
//         {x:-113.59884503081133,y:20.15886233782613},  //20#公寓与保宁苑聚德楼三岔口
//         {x:-42.65420904149749,y:15.111826473393474},
// 	]
// 	let chromeArr2=[]
// 	let chromeArr3=[]
// 	chromeArr.map(item=>{
// 			chromeArr2.push({x:(item.x-chromeX)*Multiples+2,y:-(item.y-chromeY)*Multiples2+2})//加2是感觉中心点偏移了
// 	})
//     // 
// 	threeArr.map(item=>{
// 			chromeArr3.push({x:(item.x-2)/Multiples+chromeX,y:-(item.y-2)/Multiples2+chromeY})//加2是感觉中心点偏移了
// 	})
//     console.log('世界坐标',chromeArr)
//     console.log('3d坐标',threeArr)
// 	console.log('3d坐标转世界坐标',chromeArr3)
// 	console.log('世界坐标转3d坐标',chromeArr2)
// }

</script>
<template>
    <div class="fa_container" style="margin-top: 500px;">

		
        <div class="container" ref="container">


                  3d坐标：x：{{zb3dzbx}}  y:{{zb3dzby}}  <br/>
                  世界坐标：x：{{sjzbx}}      y:{{sjzby}}
                
                    <el-form :inline="true" :model="formInline" class="demo-form-inline">
                      <el-form-item label="x">
                        <el-input v-model="formInline.x" placeholder="x" clearable />
                      </el-form-item>
                      <el-form-item label="z">
                        <el-input v-model="formInline.y" placeholder="z" clearable />
                      </el-form-item>
                      <el-form-item>
                        <el-button type="primary" @click="onSubmit1">3d坐标转世界坐标</el-button>
                      </el-form-item>
                    </el-form>
                    <br/>
                    <el-form :inline="true" :model="formInline2" class="demo-form-inline">
                      <el-form-item label="x">
                        <el-input v-model="formInline2.x" placeholder="x" clearable />
                      </el-form-item>
                      <el-form-item label="y">
                        <el-input v-model="formInline2.y" placeholder="y" clearable />
                      </el-form-item>
                      <el-form-item>
                        <el-button type="primary" @click="onSubmit2">世界坐标转3d坐标</el-button>
                      </el-form-item>
                    </el-form>
                  
        </div>
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
