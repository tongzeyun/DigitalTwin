<!--
 * @Description: 
 * @Author: Zheng He
 * @LastEditors: Zheng He
 * @LastEditTime: 2025-10-24 09:11:12
-->
<template>
  <div class="layout-container">
    <div class="layout-header">
      <img src="@/assets/images/logo.png" class="menu-logo" alt="">
        <div class="layout-header-title">智慧管理系统</div>
        <div class="layout-setting">
          <div class="header-search">
            <img src="@/assets/images/header/icon-header-search.png" class="pointer" alt="">
          </div>
          <div class="header-setting">
            <img src="@/assets/images/header/icon-header-setting.png" class="pointer" alt="">
          </div>
          <div class="header-fullscreen">
            <img src="@/assets/images/header/icon-header-fullscreen.png" class="pointer" alt="">
          </div>
          <div class="time-box">
            <div class="time-time">{{ dateTime }}</div>
            <div class="time-date-week">
              <div class="time-week">{{ dateWeek }}</div>
              <div class="time-date">{{ dateDay }}</div>
            </div>
          </div>
        </div>
    </div>
    <div class="layout-menu">
      <div class="layout-menu-bg">
        <div class="menu-btn-box active">
          <img src="@/assets/images/common/menu-home.png" class="menu-btn" alt="">
          <div class="menu-btn-text">园区全景监控</div>
        </div>
        <div class="menu-btn-box">
          <img src="@/assets/images/common/menu-person.png" class="menu-btn" alt="">
          <div class="menu-btn-text">人员全景监控</div>
        </div>
        <div class="menu-btn-box">
          <img src="@/assets/images/common/menu-device.png" class="menu-btn" alt="">
          <div class="menu-btn-text">设备全景监控</div>
        </div>
        <div class="menu-btn-box">
          <img src="@/assets/images/common/menu-alarm.png" class="menu-btn" alt="">
          <div class="menu-btn-text">告警监控展示</div>
        </div>
      </div>
    </div>
    <!-- 首页左侧 -->
     <div class="component-left">
      <!-- 告警信息 -->
      <div class="component-container">
        <div class="component-title">
          <img src="@/assets/images/common/component-icon.png" class="component-title-icon" alt="">
          <div class="component-text">
            <span class="component-title-text">采购项目信息</span>
          </div>
        </div>
        <div class="component-box">
          <div class="conponent-box-project">有限公司2025年第三次采购项目信息</div>
          <div class="conponent-box-project">有限公司2025年第三次采购项目信息</div>
          <div class="conponent-box-project">有限公司2025年第三次采购项目信息</div>
        </div>
      </div>
    </div>
    <!-- 首页右侧 -->
    <div class="component-right">
      <!-- 告警信息 -->
      <div class="component-container">
        <div class="component-title">
          <img src="@/assets/images/common/component-icon.png" class="component-title-icon" alt="">
          <div class="component-text">
            <span class="component-title-text">告警信息</span>
          </div>
        </div>
        <div class="component-box">
          <div class="component-box-top">
            <div class="component-box-top-item">
              <img src="@/assets/images/home/icon-yjc.png" class="component-item-img" alt="">
              <div class="component-item-text">已解除<span class="component-item-text-blue">12</span></div>
            </div>
             <div class="component-box-top-item item-red">
              <img src="@/assets/images/home/icon-wjc.png" class="component-item-img" alt="">
              <div class="component-item-text">未解除<span class="component-item-text-red">12</span></div>
            </div>
          </div>
          <div class="component-box-bottom">
            <div class="component-box-bottom-item">
              <div class="component-item-left">
                <div class="item-count">14</div>
                <div class="item-title">未佩戴智能终端</div>
              </div>
              <div class="component-item-right">
                <div class="item-top">
                  <div class="item-top-item">
                    <div class="item-circle-blue"></div>
                    <div class="item-top-text">已解除</div>
                    <div class="item-top-count">10</div>
                  </div>
                  <div class="item-top-item">
                    <div class="item-circle-red"></div>
                    <div class="item-top-text">未解除</div>
                    <div class="item-top-count">4</div>
                  </div>
                </div>
                <div class="item-bottom">
                  <div class="item-circle-green"></div>
                  <div class="item-line-box">
                    <div class="line-blue"></div>
                    <div class="line-red"></div>
                  </div>
                </div>
              </div>
            </div>
            <div class="component-box-bottom-item">
              <div class="component-item-left">
                <div class="item-count">14</div>
                <div class="item-title">越权闯入</div>
              </div>
              <div class="component-item-right">
                <div class="item-top">
                  <div class="item-top-item">
                    <div class="item-circle-blue"></div>
                    <div class="item-top-text">已解除</div>
                    <div class="item-top-count">10</div>
                  </div>
                  <div class="item-top-item">
                    <div class="item-circle-red"></div>
                    <div class="item-top-text">未解除</div>
                    <div class="item-top-count">4</div>
                  </div>
                </div>
                <div class="item-bottom">
                  <div class="item-circle-green"></div>
                  <div class="item-line-box">
                    <div class="line-blue"></div>
                    <div class="line-red"></div>
                  </div>
                </div>
              </div>
            </div>
            <div class="component-box-bottom-item">
              <div class="component-item-left">
                <div class="item-count">14</div>
                <div class="item-title">非园区人员闯入</div>
              </div>
              <div class="component-item-right">
                <div class="item-top">
                  <div class="item-top-item">
                    <div class="item-circle-blue"></div>
                    <div class="item-top-text">已解除</div>
                    <div class="item-top-count">10</div>
                  </div>
                  <div class="item-top-item">
                    <div class="item-circle-red"></div>
                    <div class="item-top-text">未解除</div>
                    <div class="item-top-count">4</div>
                  </div>
                </div>
                <div class="item-bottom">
                  <div class="item-circle-green"></div>
                  <div class="item-line-box">
                    <div class="line-blue"></div>
                    <div class="line-red"></div>
                  </div>
                </div>
              </div>
            </div>
            <div class="component-box-bottom-item">
              <div class="component-item-left">
                <div class="item-count">14</div>
                <div class="item-title">临时访客</div>
              </div>
              <div class="component-item-right">
                <div class="item-top">
                  <div class="item-top-item">
                    <div class="item-circle-blue"></div>
                    <div class="item-top-text">已解除</div>
                    <div class="item-top-count">10</div>
                  </div>
                  <div class="item-top-item">
                    <div class="item-circle-red"></div>
                    <div class="item-top-text">未解除</div>
                    <div class="item-top-count">4</div>
                  </div>
                </div>
                <div class="item-bottom">
                  <div class="item-circle-green"></div>
                  <div class="item-line-box">
                    <div class="line-blue"></div>
                    <div class="line-red"></div>
                  </div>
                </div>
              </div>
            </div>
            <div class="component-box-bottom-item">
              <div class="component-item-left">
                <div class="item-count">14</div>
                <div class="item-title">设备离线</div>
              </div>
              <div class="component-item-right">
                <div class="item-top">
                  <div class="item-top-item">
                    <div class="item-circle-blue"></div>
                    <div class="item-top-text">已解除</div>
                    <div class="item-top-count">10</div>
                  </div>
                  <div class="item-top-item">
                    <div class="item-circle-red"></div>
                    <div class="item-top-text">未解除</div>
                    <div class="item-top-count">4</div>
                  </div>
                </div>
                <div class="item-bottom">
                  <div class="item-circle-green"></div>
                  <div class="item-line-box">
                    <div class="line-blue"></div>
                    <div class="line-red"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 顶部中间 -->
    <div class="top-center">
      <div class="top-center-item">
        <img src="@/assets/images/home/center-icon-zbcg.png" class="top-center-img" alt="">
        <div class="top-center-right">
          <div class="top-center-title">招标采购项目</div>
          <div class="top-center-count"><span>1</span>个</div>
        </div>
      </div>
      <div class="top-center-item">
        <img src="@/assets/images/home/center-icon-pwhgs.png" class="top-center-img" alt="">
        <div class="top-center-right">
          <div class="top-center-title">评委会个数</div>
          <div class="top-center-count"><span>1</span>个</div>
        </div>
      </div>
      <div class="top-center-item">
        <img src="@/assets/images/home/center-icon-pwhrs.png" class="top-center-img" alt="">
        <div class="top-center-right">
          <div class="top-center-title">评委会人员</div>
          <div class="top-center-count"><span>90</span>人</div>
        </div>
      </div>
      <div class="top-center-item">
        <img src="@/assets/images/home/center-icon-gz.png" class="top-center-img" alt="">
        <div class="top-center-right">
          <div class="top-center-title">工作人员数</div>
          <div class="top-center-count"><span>2</span>人</div>
        </div>
      </div>
      <div class="top-center-item">
        <img src="@/assets/images/home/center-icon-jd.png" class="top-center-img" alt="">
        <div class="top-center-right">
          <div class="top-center-title">监督及法律人数</div>
          <div class="top-center-count"><span>10</span>个</div>
        </div>
      </div>
      <div class="top-center-item">
        <img src="@/assets/images/home/center-icon-fw.png" class="top-center-img" alt="">
        <div class="top-center-right">
          <div class="top-center-title">服务保障人数</div>
          <div class="top-center-count"><span>1</span>人</div>
        </div>
      </div>
    </div>
    <!-- 地图按钮 -->
     <div class="map-tools">
      <div class="tools">
        <div class="tools-btn tool-clear">
          <img src="@/assets/images/map/legend-clear.png" class="tool-img"alt="">
        </div>
        <div class="tools-btn tool-layer">
          <img src="@/assets/images/map/legend-layer.png" class="tool-img"alt="">
        </div>
        <div class="tools-btn tool-tools">
          <img src="@/assets/images/map/legend-tools.png" class="tool-img"alt="">
        </div>
      </div>
     </div>
  </div>
</template>

<script setup>
import { onMounted, onUnmounted, ref } from 'vue'
import { getDayTimeWeek } from '@/utils/utils'; //标签
const dateDay = ref();
const dateTime = ref();
const dateWeek = ref();
const getDayTimeFunc = () => { // 获取时间日期
  let arrDate = getDayTimeWeek();
  dateDay.value = arrDate[0];
  dateTime.value = arrDate[1];
  dateWeek.value = arrDate[2];
  arrDate = null;
}
  
  // 组件挂载后执行
  let timer = null;

  onMounted(() => {
    // 启动定时器
    timer = setInterval(() => {
      getDayTimeFunc();
    }, 1000)
  })

  // 组件已卸载
  onUnmounted(() => {
    // 清除定时器
    if (timer != null) {
      clearInterval(timer);
      timer = null;
    }
  })

</script>

<style lang="scss" scoped>
.layout-container {
  width: 100%;
  position: absolute;
  left: 0;
  top: 0;
  z-index: 3;
  .layout-header {
      width: 100%;
      height: 363px;
      background: url("@/assets/images/header/header-title.png") no-repeat top center / auto 100%;
      .layout-header-title {
          font-family: YouSheBiaoTiHei;
          font-size: 40px;
          // color: #44CAFF;
          letter-spacing: 4px;
          // text-shadow: inset 0px 0px 0px rgba(255,255,255,0.6);
          text-align: center;
          font-style: normal;
          background: linear-gradient(to bottom, #FFFFFF 0%, #FFFFFF 20%, #6AC1FF 100%);
          // background: linear-gradient(90deg, #FFFFFF 0%, #6AC1FF 100%);
          -webkit-background-clip: text; /* 兼容 Safari/Chrome */
          background-clip: text;
          color: transparent;
          position: absolute;
          top: 20px;
          left: 50%;
          transform: translateX(-50%);
      }
  }
  .menu-logo {
    position: absolute;
    left: 57px;
    top: 27px;
    width: 170px;
  }
  .layout-setting {
    position: absolute;
    right: 38px;
    top: 38px;
    display: flex;
    align-items: center;
    .header-search {
      margin-right: 12px;
      display: flex;
      align-items: center;
    }
    .header-setting {
      margin-right: 12px;
      display: flex;
      align-items: center;
    }
    .header-fullscreen {
      margin-right: 19px;
      display: flex;
      align-items: center;
    }
    .time-box {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 7px 0 9px;
      width: 181px;
      height: 50px;
      background: url("@/assets/images/header/time-bg.png") no-repeat top center / auto 100%;
      .time-time {
        font-weight: 500;
        font-size: 24px;
        color: #FFFFFF;
        line-height: 28px;
        text-align: left;
        font-style: normal;
        padding-right: 10px;
        background: url("@/assets/images/header/time-line.png") no-repeat center right / 2px 25px;
      }
      .time-date-week {
        font-weight: 400;
        font-size: 12px;
        color: rgba(255,255,255,0.8);
        line-height: 12px;
        text-align: left;
        font-style: normal;
        margin-left: 8px;
        .time-week {
          margin-bottom: 3px;
        }
        .time-date {

        }
      }
    }
  }
  .layout-menu {
    width: 100%;
    height: 215px;
    background: url("@/assets/images/header/layer-bottom.png") no-repeat top center / 100% 100%;
    position: fixed;
    left: 0;
    bottom: -9px;
    pointer-events: none;
    display: flex;
    align-items: flex-end;
    .layout-menu-bg {
      width: 100%;
      height: 90px;
      background: url("@/assets/images/common/menu-bottom-bg.png") no-repeat top center / 100% 100%;
      display: flex;
      justify-content: center;
      padding-left: 10px;
    }
    .menu-btn-box {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      position: relative;
      top: -68px;
      margin-right: 12px;
      transform-origin: center bottom;
      transition: all 0.2s;
      cursor: pointer;
      pointer-events: all;
      &:hover,
      &.active {
        transform: scale(1.2);
        .menu-btn-text {
          color: #fff;
          font-weight: bold;
        }
      }
      .menu-btn {
        width: 58px;
        height: 57px;
      }
      .menu-btn-text {
        font-size: 12px;
        color: #B9D3E6;
        text-align: center;
        text-shadow: 0 0 12px #9b9ba6;
      }
    }
  }
  .component-right {
    width: 400px;
    height: 900px;
    position: absolute;
    right: 19px;
    top: 119px;
  }
  .component-container {
    
    .component-title {
      display: flex;
      .component-title-icon {
        width: 40px;
      }
      .component-text {
        width: 359px;
        height: 40px;
        text-align: left;
        line-height: 45px;
        padding-left: 19px;
        background: url("@/assets/images/common/component-title-bg.png") no-repeat top left / auto 100%;
      }
    }
    .component-box {
      .component-box-top {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin: 6px 0 5px 0;
        .component-box-top-item {
          width: 186px;
          height: 53px;
          text-align: left;
          line-height: 53px;
          padding-left: 19px;
          background: url("@/assets/images/home/alarm-blue.png") no-repeat top left / 100% 100%;
          &.item-red {
            background: url("@/assets/images/home/alarm-red.png") no-repeat top left / 100% 100%;
          }
        }
        .component-item-img {
          float: left;
        }
        .component-item-text {
          float: left;
          font-weight: 400;
          font-size: 12px;
          color: #FFFFFF;
          line-height: 17px;
          text-align: center;
          font-style: normal;
          height: 53px;
          line-height: 50px;
          padding-left: 6px;
          span {
            padding-left: 6px;
          }
          .component-item-text-blue {
            font-size: 22px;
            color: #FFFFFF;
            line-height: 34px;
            text-align: left;
            font-style: normal;
            background: linear-gradient(to bottom, #FFFFFF 0%, #FFFFFF 20%, #00A9F3 100%);
            // background: linear-gradient(90deg, #FFFFFF 0%, #6AC1FF 100%);
            -webkit-background-clip: text; /* 兼容 Safari/Chrome */
            background-clip: text;
            color: transparent;
          }
          .component-item-text-red {
            font-size: 22px;
            color: #FFFFFF;
            line-height: 34px;
            text-align: left;
            font-style: normal;
            background: linear-gradient(to bottom, #FFFFFF 0%, #FFFFFF 20%, #F35000 100%);
            // background: linear-gradient(90deg, #FFFFFF 0%, #6AC1FF 100%);
            -webkit-background-clip: text; /* 兼容 Safari/Chrome */
            background-clip: text;
            color: transparent;
          }
        }
      }
      .component-box-bottom {

      }
      .component-box-bottom-item {
        height: 58px;
        margin-bottom: 6px;
        position: relative;
        z-index: 2;
        .component-item-left {
          width: 66px;
          height: 58px;
          text-align: center;
          line-height: 45px;
          padding: 0 6px 0 4px;
          background: url("@/assets/images/home/alarm-name.png") no-repeat top left / 100% 100%;
          .item-count {
            font-size: 18px;
            color: #FFFFFF;
            line-height: 34px;
            font-style: normal;
            font-weight: bold;
            background: linear-gradient(to bottom, #FFFFFF 0%, #FFFFFF 20%, #F4F9FE 100%);
            -webkit-background-clip: text; /* 兼容 Safari/Chrome */
            background-clip: text;
            color: transparent;
          }
          .item-title {
            font-size: 10px;
            color: #FFFFFF;
            line-height: 12px;
            font-style: normal;
            position: relative;
            top: -5px;
          }
        }
        .component-item-right {
          position: absolute;
          top: 0;
          right: 0;
          z-index: 1;
          width: 339px;
          height: 58px;
          background: url("@/assets/images/home/alarm-item-bg.png") no-repeat top left / 100% 100%;
          .item-top {
            display: flex;
            padding: 5px 10px;
          }
          .item-top-item {
            display: flex;
            align-items: center;
            margin-right: 10px;
            .item-circle-blue {
              width: 6px;
              height: 6px;
              border-radius: 3px;
              background: linear-gradient( to bottom, #0990DD 0%, #0990DD 0%, #D9F0FF 100%);
              box-shadow: 0px 2px 10px 0px rgba(255,255,255,0.8);
            }
            .item-circle-red {
              width: 6px;
              height: 6px;
              border-radius: 3px;
              background: linear-gradient( 223deg, #FFFFFF 0%, #FF1D1D 100%);
              box-shadow: 0px 2px 10px 0px rgba(255,255,255,0.8);
            }
            .item-top-text {
              font-weight: 400;
              font-size: 10px;
              color: #FFFFFF;
              line-height: 14px;
              text-align: center;
              font-style: normal;
              margin: 0 5px 0 3px;
            }
            .item-top-count {
              font-weight: 400;
              font-size: 10px;
              color: #FFFFFF;
              line-height: 14px;
              text-align: center;
              font-style: normal;
            }
          }
          .item-bottom {
            display: flex;
            align-items: center;
            padding: 5px 10px;
            .item-circle-green {
              width: 6px;
              height: 6px;
              border-radius: 3px;
              background: linear-gradient( 223deg, #FFFFFF 0%, #00D5D7 100%);
              box-shadow: 0px 2px 10px 0px rgba(255,255,255,0.8);
            }
            .item-line-box {
              position: relative;
              height: 22px;
            }
            .line-blue {
              position: absolute;
              top: 0;
              left: 0;
              z-index: 1;
              width: 178px;
              height: 22px;
              background: url("@/assets/images/home/line-blue.png") no-repeat top left / 100% 100%;
            }
            .line-red {
              position: absolute;
              top: 0;
              left: 171px;
              z-index: 2;
              width: 134px;
              height: 22px;
              background: url("@/assets/images/home/line-red.png") no-repeat top left / 100% 100%;
            }
          }
        }
      }
    }
  }
  .top-center {
    width: 735px;
    position: absolute;
    top: 118px;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    user-select: none;
    .top-center-item {
      width: 213px;
      height: 87px;
      margin-bottom: 20px;
      text-align: left;
      padding-left: 110px;
      position: relative;
      background: url("@/assets/images/home/center-item-bg.png") no-repeat top left / 100% 100%;
      .top-center-img {
        position: absolute;
        left: 5px;
      }
      .top-center-right {
        position: relative;
        top: 11px;
      }
      .top-center-title {
        font-size: 16px;
        color: #fff;
        white-space: nowrap;
      }
      .top-center-count {
        font-weight: 600;
        font-size: 16px;
        color: #9CE3FF;
        line-height: 16px;
        text-align: left;
        font-style: normal;
        background: linear-gradient(to bottom, #FFFFFF 0%, rgba(255,255,255,0.4) 100%);
        // background: linear-gradient(90deg, #FFFFFF 0%, #6AC1FF 100%);
        -webkit-background-clip: text; /* 兼容 Safari/Chrome */
        background-clip: text;
        color: transparent;
        span {
          font-size: 36px;
          color: #FFFFFF;
          line-height: 34px;
          text-align: left;
          font-style: normal;
          background: linear-gradient(to bottom, rgba(255,255,255,0.4) 0%, rgba(255,255,255,0.4) 100%);
          // background: linear-gradient(90deg, #FFFFFF 0%, #6AC1FF 100%);
          -webkit-background-clip: text; /* 兼容 Safari/Chrome */
          background-clip: text;
          color: transparent;
        }
      }
    }
  }
  .component-left {
    width: 400px;
    height: 900px;
    position: absolute;
    left: 19px;
    top: 119px;
    .component-box {
      padding-top: 16px;
      .conponent-box-project {
        font-weight: 500;
        font-size: 16px;
        color: #FFFFFF;
        line-height: 22px;
        text-align: left;
        font-style: normal;
        width: 398px;
        height: 36px;
        text-align: left;
        line-height: 36px;
        padding-left: 26px;
        margin-bottom: 17px;
        background: url("@/assets/images/home/project-bg.png") no-repeat top left / auto 100%;
      }
    }
  }
  .map-tools {
    position: fixed;
    right: 51px;
    bottom: 81px;
    z-index: 2;
    .tools {
      width: 43px;
      height: 124px;
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      padding: 8px 0 5px;
      background: url("@/assets/images/map/legend-bg.png") no-repeat top left / 100% 100%;
    }
    .tools-btn {
      cursor: pointer;
    }
  }
}
</style>