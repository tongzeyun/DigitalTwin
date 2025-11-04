<!--
 * @Description: 
 * @Author: Zheng He
 * @LastEditors: Zheng He
 * @LastEditTime: 2025-10-25 10:01:12
-->
<template>
  <!-- 告警信息 -->
  <div class="component-container">
    <div class="component-title">
      <img src="@/assets/images/common/component-icon.png" class="component-title-icon" alt="">
      <div class="component-text">
        <span class="component-title-text">告警信息</span>
      </div>
    </div>
    <div class="component-box alarm-info">
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
</template>

<script setup>
</script>

<style lang="scss" scoped>
.component-box.alarm-info {
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
</style>