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
        <div class="top_header">
          <div style="display: flex;align-items: center;">
            <img src="@/assets/images/device/arrow_r.png" />
            <div class="tit">区域设备统计</div>
          </div>
          <div class="search">
            <img src="@/assets/images/device/search.png" />
            请搜索
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
    </div>
    <div class="device_r"></div>
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

</script>

<style lang="scss" scoped>
.device-monitor {
  color: #fff;
  position: absolute;
  top: 128px;
  background-color: transparent;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  z-index: 999;
}
.device_l{
  width: 580px;
  height: fit-content;
  background: linear-gradient( 90deg, rgba(7,42,101,0.91) 0%, rgba(10,32,43,0) 100%);
  .top{
    width: 100%;
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
      padding: 0 15px;
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
        display: flex;
        align-items: center;
        justify-content: center;
        box-sizing: border-box;
        padding: 15px;
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
}
</style>