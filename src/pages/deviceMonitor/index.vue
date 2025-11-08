<!--
 * @Description: 
 * @Author: Zheng He
 * @LastEditors: Zheng He
 * @LastEditTime: 2025-11-04 10:05:12
-->
<template>
  <!-- 设备全景监控 -->
  <div class="device-monitor">
    <div class="device_l">
      <div class="top">
        <div class="top_header component-container">
          <div class="component-title">
            <img src="@/assets/images/common/component-icon.png" class="component-title-icon" alt="">
            <div class="component-text" style="display: flex;align-items: center;justify-content:space-between;">
              <span class="component-title-text">区域设备统计</span>
              <div class="search">
                <img src="@/assets/images/device/search.png" />
                请搜索
              </div>
            </div>
            
          </div>
          
        </div>
        <div class="top_info">
          <div class="top_item" v-for="ele in statList">
            
            <img :src="ele.imgUrl"></img>
            <div>
              <div style="display: flex;align-items: center;">
                <div class="normal">{{ ele.normal }}</div>
                <div class="damage" v-if="ele.damage.length">({{ ele.damage }})</div>
              </div>
              <div class="tit">{{ ele.tit }}</div>
            </div>
          </div>
        </div>
      </div>
      <div class="btm">
        <div class="btm_header component-container">
          <div class="component-title">
            <img src="@/assets/images/common/component-icon.png" class="component-title-icon" alt="">
            <div class="component-text" style="display: flex;align-items: center;justify-content:space-between;">
              <span class="component-title-text">设备告警统计</span>
              <div class="search">
                <img src="@/assets/images/device/search.png" />
                请搜索
              </div>
            </div>
          </div>
        </div>
        <div class="btm_info">
          <div class="btm_item" v-for="ele in warnList"> 
            <div class="name">
              {{ ele.tit }}
            </div>
            <div class="warn_img" >
              <img :style="{width:`${ele.num / warnMax * 100}%`}" src="@/assets/images/device/warn_len.png"></img>
            </div>
            <div class="num">{{ ele.num }}</div>
          </div>
        </div>
      </div>
    </div>
    <div class="device_r">
      <div class="top">
        <div class="top_header component-container">
          <div class="component-title">
            <img src="@/assets/images/common/component-icon.png" class="component-title-icon" alt="">
            <div class="component-text" style="display: flex;align-items: center;justify-content:space-between;">
              <span class="component-title-text">区域设备统计</span>
              <div class="left" style="display: flex; align-items: center;">
                <div class="kanban" style="margin-right: 10px;width: 25px;height: 25px;">
                  <img style="width: 100%;height: 100%;display: block;" src="@/assets/images/device/device_kanban.png"> </img>
                </div>
                <div class="search">
                  <img src="@/assets/images/device/search.png" />
                  请搜索
                </div>
              </div>
              
            </div>
          </div>
          
        </div>
        <div class="device_info">
          <div class="device_item" v-for="ele in deviceList">
            <img :src="ele.imgUrl" class="device_icon"></img>
            <div class="text">
              <div class="id"><span>型号</span>{{ ele.id }}</div>
              <div class="name"><span>名称</span>{{ ele.name }}</div>
              <div class="pos"><span>位置</span>{{ ele.pos }}</div>
            </div>
            <div class="right">
              <div class="type">{{ ele.type }}</div>
              <div class="btn_box">
                <div class="btn">编辑</div>
                <div class="state" :class="ele.state == '0' ? 'offline' : 'online'">{{ ele.state == '0' ? '离线' : '在线' }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const statList = ref([
  {imgUrl:'/frtwin/src/assets/images/device/stat_1.png',normal:'370',damage:'8',tit:'AI摄像头'},
  {imgUrl:'/frtwin/src/assets/images/device/stat_2.png',normal:'380',damage:'3',tit:'移动智能终端'},
  {imgUrl:'/frtwin/src/assets/images/device/stat_3.png',normal:'32',damage:'0',tit:'人脸识别门禁'},
  {imgUrl:'/frtwin/src/assets/images/device/stat_4.png',normal:'6',damage:'0',tit:'人脸识别闸机'},
  {imgUrl:'/frtwin/src/assets/images/device/stat_5.png',normal:'3',damage:'0',tit:'人证报到一体机'},
  {imgUrl:'/frtwin/src/assets/images/device/stat_6.png',normal:'1',damage:'0',tit:'访客机'},
  {imgUrl:'/frtwin/src/assets/images/device/stat_7.png',normal:'3',damage:'',tit:'人脸识别录音电话'},
  {imgUrl:'/frtwin/src/assets/images/device/stat_8.png',normal:'350',damage:'',tit:'智能储物柜'},
])
const warnList = ref([
  {tit:'AI摄像头', num:'12' },
  {tit:'移动智能终端', num:'5' },
  {tit:'普通摄像头', num:'5' },
  {tit:'人脸识别录音电话', num:'1' },
])

let warnMax = ref(Math.max(...warnList.value.map(item => item.num)))

const deviceList = ref([
  {id:'MJJ0001',imgUrl:'/frtwin/src/assets/images/device/stat_8.png', type:'人脸室别闸机',state:'0',name:'聚德楼入口闸机',pos:'聚德楼1楼入口'},
  {id:'MJJ0001',imgUrl:'/frtwin/src/assets/images/device/stat_8.png', type:'人脸室别闸机',state:'1',name:'聚德楼入口闸机',pos:'聚德楼1楼入口'},
  {id:'MJJ0001',imgUrl:'/frtwin/src/assets/images/device/stat_8.png', type:'人脸室别闸机',state:'0',name:'聚德楼入口闸机',pos:'聚德楼1楼入口'},
  {id:'MJJ0001',imgUrl:'/frtwin/src/assets/images/device/stat_8.png', type:'人脸室别闸机',state:'1',name:'聚德楼入口闸机',pos:'聚德楼1楼入口'},
])

</script>

<style lang="scss" scoped>
.device-monitor {
  width: 100%;
  color: #fff;
  position: absolute;
  top: 128px;
  background-color: transparent;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  z-index: 999;
  box-sizing: border-box;
  padding: 15px;

}
.device_l{
  width: 580px;
  height: fit-content;
  background: linear-gradient( 90deg, rgba(7,42,101,0.91) 0%, rgba(10,32,43,0) 100%);
  .top{
    width: 420px;
    .top_header{
      width: 100%;
      height: 45px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-family: YouSheBiaoTiHei;
      font-size: 26px;
      color: #FFFFFF;
      line-height: 34px;
      text-align: left;
      background: radial-gradient( 15% 103% at 7% 83%, #004FB7 0%, rgba(47,67,135,0) 100%), linear-gradient( 181deg, rgba(0,57,135,0) 0%, #39BDFF 100%);
      backdrop-filter: blur(9px);
      box-sizing: border-box;
      // padding: 0 15px;
      .search{
        width: 70px;
        height: 24px;
        font-family: PingFangSC, PingFang SC;
        font-weight: 500;
        font-size: 12px;
        color: #FFFFFF;
        line-height: 17px;
        background: url('@/assets/images/device/search_bg.png') no-repeat center;
        display: flex;
        align-items: center;
        justify-content: space-around;
        cursor: pointer;
        margin-right: 15px;
        img{
          width: 14px;
          height: 14px;
        }
      }
    }
    .top_info{
      width: 100%;
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      align-items: center;
      .top_item{
        width: 50%;
        height: 100px;
        display: flex;
        align-items: center;
        justify-content: flex-start;
        box-sizing: border-box;
        padding: 15px;
        margin-bottom: 10px;
        img{
          width: 93px;
          height: 70px;
        }
        .normal{
          font-size: 30px;
          font-family: PingFangSC, PingFang SC;
        }
        .damage{
          background-image: linear-gradient(132.64593036269758deg, #FFFFFF 0%, #FF1D1D 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          font-family: PingFangSC, PingFang SC;
          font-weight: 600;
          font-size: 16px;
          line-height: 22px;
          text-align: left;
          font-style: normal;
          // background: linear-gradient(132.64593036269758deg, #FFFFFF 0%, #FF1D1D 100%);
        }
        .tit{
          font-family: PingFangSC, PingFang SC;
          font-size: 14px;
          line-height: 16px;
          text-align: left;
          font-style: bold;

        }
      }
    }
  }
  .btm{
    width: 420px;
    margin-top: 20px;
    .btm_header{
      width: 100%;
      height: 45px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-family: YouSheBiaoTiHei;
      font-size: 26px;
      color: #FFFFFF;
      line-height: 34px;
      text-align: left;
      background: radial-gradient( 15% 103% at 7% 83%, #004FB7 0%, rgba(47,67,135,0) 100%), linear-gradient( 181deg, rgba(0,57,135,0) 0%, #39BDFF 100%);
      backdrop-filter: blur(9px);
      box-sizing: border-box;
      // padding: 0 15px;
      .search{
        width: 70px;
        height: 24px;
        font-family: PingFangSC, PingFang SC;
        font-weight: 500;
        font-size: 12px;
        color: #FFFFFF;
        line-height: 17px;
        background: url('@/assets/images/device/search_bg.png') no-repeat center;
        display: flex;
        align-items: center;
        justify-content: space-around;
        cursor: pointer;
        margin-right: 15px;
        img{
          width: 14px;
          height: 14px;
        }
      }
    }
    .btm_info{
      width: 100%;
      .btm_item{
        width: 100%;
        height: 44px;
        background: url('@/assets/images/device/warn_bg.png') no-repeat center;
        background-size: cover;
        display: flex;
        align-items: center;
        justify-content: flex-start;
        margin-top: 15px;
        .name{
          width: 130px;
          font-size: 14px;
          font-family: PingFangSC, PingFang SC;
          line-height: 20px;
          text-align: left;
          margin-left: 28px;
        }
        .warn_img{
          height: 22px;
          display: flex;
          justify-content: flex-start;
          img{
            // width: 100%;
            height: 100%;
            // object-fit: contain;
          }
        }
        .num{
          margin-left: 20px;
          font-family: PingFangSC, PingFang SC;
          font-weight: 600;
          font-size: 18px;
          color: #FFFFFF;
          line-height: 25px;
          text-align: right;
        }
      }
    }
  }
}
.device_r{
  width: 420px;
  height: fit-content;
  .top{
    width: 420px;
    .top_header{
      width: 100%;
      height: 45px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-family: YouSheBiaoTiHei;
      font-size: 26px;
      color: #FFFFFF;
      line-height: 34px;
      text-align: left;
      background: radial-gradient( 15% 103% at 7% 83%, #004FB7 0%, rgba(47,67,135,0) 100%), linear-gradient( 181deg, rgba(0,57,135,0) 0%, #39BDFF 100%);
      backdrop-filter: blur(9px);
      box-sizing: border-box;
      // padding: 0 15px;
      .search{
        width: 70px;
        height: 24px;
        font-family: PingFangSC, PingFang SC;
        font-weight: 500;
        font-size: 12px;
        color: #FFFFFF;
        line-height: 17px;
        background: url('@/assets/images/device/search_bg.png') no-repeat center;
        display: flex;
        align-items: center;
        justify-content: space-around;
        cursor: pointer;
        margin-right: 15px;
        img{
          width: 14px;
          height: 14px;
        }
      }
    }
    .device_info{
      width: 100%;
      .device_item{
        height: 76px;
        background: url('@/assets/images/device/device_item_bg.png') no-repeat center;
        background-size: 100% 100%;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0 10px;
        margin-top: 10px;
        .device_icon{
          width: 65px;
          height: 65px;
          border-radius: 5px;
        }
        .text{
          color: white;
          font-size: 12px;
          text-align: left;
          span{
            opacity: 0.72;
          }
        }
        .right{
          .type{
            width: 104px;
            height: 28px;
            background: url('@/assets/images/device/device_type_bg.png') no-repeat center;
            background-size: 100% 100%;
            font-family: PingFangSC, PingFang SC;
            font-weight: 600;
            font-size: 14px;
            color: #FFFFFF;
            line-height: 20px;
            text-shadow: 0px 2px 12px rgba(198,245,255,0.56);
            text-align: center;
          }
          .btn_box{
            margin-top: 10px;
            display: flex;
            align-items: center;
            
            .btn{
              margin-right: 20px;
              cursor: pointer;
            }
            .state{
              width: 50px;
              height: 28px;
              background-position: center;
              background-size: 100% 100%;
              background-repeat: no-repeat;
              font-family: PingFangSC, PingFang SC;
              font-weight: 600;
              font-size: 16px;
              color: #FFFFFF;
            }
            .offline{
              background-image: url('@/assets/images/device/device_state_off.png');
            }
            .online{
              background-image: url('@/assets/images/device/device_state_on.png');
            }
          }
        }
      }
    }
  }
}
</style>