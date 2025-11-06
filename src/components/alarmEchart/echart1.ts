import * as echarts from "echarts";


  
  var option;
  const sideData1 =  [222, 182, 192, 232, 292];
  const sideData2 = [100, 110, 120, 130, 190];
  const sideData3 = [101, 111, 121, 131, 191];
  const name1 = '专家';
  const name2 = '监督人员';
  const name3 = '工作人员';
  var x = ['聚合楼', '陶然楼', '综合楼', '室外', '保宁宛泳池'];
  option = {
    tooltip: {
      trigger: 'axis'
    },
    legend: {
      top : 0,
      right: 5,
      itemHeight:12,
      itemWidth:12,
      data: [
        {
          name: name1,
          textStyle: {
            color: 'white'
          }
        },
        {
          name: name2,
          textStyle: {
            color: 'white'
          }
        },{
          name: name3,
          textStyle: {
            color: 'white'
          }
        }
      ]
    },
    grid: {
      top:"30px",
      left:"5px",
      right:"0px",
      bottom:"0px",
      containLabel: true
    },
    toolbox: {
      show: true,
    },
    calculable: true,
    xAxis: [
      {
        type: 'category',
        splitLine: {
          show: false
        },
        data: x,
        axisLabel: {
          // show: true,
          interval:0,//不间隔显示x
          textStyle: {
            color: "#fff" //X轴文字颜色
          },
        },
      }
    ],
    yAxis: [
      {
        // name:'单位：元/吨',
        nameTextStyle: {
          color: "#fff"
        },
        type: 'value',
        splitLine: {
          show: false
        },
        axisLabel: {
          show: true,
          textStyle: {
            color: "#fff" //X轴文字颜色
          },
        },
      }
    ],
    series: [
      {
        name: name1,
        tooltip: {
          show: false
        },
        barGap: 0,
        type: 'bar',
        barWidth: 7,
        showBackground: true,
        backgroundStyle: {
          color: 'rgba(180, 180, 180, 0.1)'
        },
        itemStyle: {
          normal: {
            color: new echarts.graphic.LinearGradient(0, 1, 0, 0, [{
              offset: 0,
              color: "rgba(5, 126, 219, 0)" // 0% 处的颜色
            }, {
              offset: 1,
              color: "#2A9CFF", // 100% 处的颜色
            }], false)
          }
        },
        data: sideData1,
    
       },
      {
        name: name1,
        tooltip: {
          show: false
        },
        type: 'bar',
        barWidth: 7,
        showBackground: true,
        backgroundStyle: {
          color: 'rgba(180, 180, 180, 0.1)'
        },
        itemStyle: {
          normal: {
            color: new echarts.graphic.LinearGradient(0, 1, 0, 0, [{
              offset: 0,
              color: "rgba(5, 126, 219, 0)" // 0% 处的颜色
            }, {
              offset: 1,
              color: "rgba(5, 126, 219, 1)", // 100% 处的颜色
              //opacity:0.5
            }], false)
          }
        },
        barGap: 0,
        data: sideData1,
        label: {
          // show: true,
          position: 'top',
          textStyle: {
            color: 'white',
            fontSize: 10
          }
        }
      }, 
      {
        name: name1,
        type: 'bar',
        barWidth: 7,
        tooltip: {
          show: false
        },
        showBackground: true,
        backgroundStyle: {
          color: 'rgba(180, 180, 180, 0.1)'
        },
        itemStyle: {
          normal: {
            color: new echarts.graphic.LinearGradient(0, 1, 0, 0, [{
              offset: 0,
              color: "rgba(1, 6, 38, 0.1)" // 0% 处的颜色
            }, {
              offset: 1,
              color: "rgba(1, 6, 38,0.1)", // 柱子间的颜色
              //opacity:0.5
            }], false)
          }
        },
        barGap: 0,
        data: sideData1,
        label: {
          show: false,
          position: 'top',
          textStyle: {
            color: 'white',
            fontSize: 10
          }
        }
      },
      {
        name: name1,
        tooltip: {
          show: true
        },
        showBackground: true,
        backgroundStyle: {
          color: 'rgba(180, 180, 180, 0.1)'
        },
        type: 'pictorialBar',
        itemStyle: {
          borderWidth: 1,
          borderColor: '#2A9CFF',
          color: '#2A9CFF' // 控制顶部方形的颜色
        },
        symbol: 'path://M 0,0 l 90,0 l -60,60 l -90,0 z',
        symbolSize: ['13', '5'], // 第一个值控制顶部方形大小
        symbolOffset: ['-3', '-3'], // 控制顶部放行 左右和上下
        symbolRotate: -16,
        symbolPosition: 'end',
        data: sideData1,
        barGap: 0,
        z: 3,
      },
      
      //第一个柱子的立体到此结束

      {
        name: name2,
        tooltip: {
          show: false
        },
        type: 'bar',
        barWidth: 7,
        showBackground: true,
        backgroundStyle: {
          color: 'rgba(180, 180, 180, 0.1)'
        },
        itemStyle: {
          normal: {
            color: new echarts.graphic.LinearGradient(0, 1, 0, 0, [{
              offset: 0,
              color: "rgba(39,232,158,0)" // 0% 处的颜色
            }, {
              offset: 1,
              color: "rgba(39,232,158,1)", // 100% 处的颜色
            }], false)
          }
        },
        data: sideData2,
        barGap: 0,

      },
      {
        name: name2,
        tooltip: {
          show: false
        },
        type: 'bar',
        barWidth: 7,
        showBackground: true,
        backgroundStyle: {
          color: 'rgba(180, 180, 180, 0.1)'
        },
        itemStyle: {
          normal: {
            color: new echarts.graphic.LinearGradient(0, 1, 0, 0, [{
              offset: 0,
              color: "rgba(39,232,158,0)" // 0% 处的颜色
            }, {
              offset: 1,
              color: "rgba(39,232,158,0.9)", // 100% 处的颜色
            }], false)
          }
        },
        barGap: 0,
        data: sideData2,
        label: {
          // show: true,
          position: 'top',
          textStyle: {
            color: 'white',
            fontSize: 10
          }
        }
      },
      {
        name: name2,
        type: 'bar',
        barWidth: 7,
        tooltip: {
          show: false
        },
        showBackground: true,
        backgroundStyle: {
          color: 'rgba(180, 180, 180, 0.1)'
        },
        itemStyle: {
          normal: {
            color: new echarts.graphic.LinearGradient(0, 1, 0, 0, [{
              offset: 0,
              color: "rgba(1, 6, 38, 0.1)" // 0% 处的颜色
            }, {
              offset: 1,
              color: "rgba(1, 6, 38,0.1)", // 柱子间的颜色
              //opacity:0.5
            }], false)
          }
        },
        barGap: 0,
        data: sideData2,
        label: {
          show: false,
          position: 'top',
          textStyle: {
            color: 'white',
            fontSize: 10
          }
        }
      },
      {
        name: name2,
        tooltip: {
          show: true
        },
        showBackground: true,
        backgroundStyle: {
          color: 'rgba(180, 180, 180, 0.1)'
        },
        type: 'pictorialBar',
        itemStyle: {
          borderWidth: 1,
          borderColor: '27E89E',
          color: '#27E89E' // 顶部方块的颜色
        },
        symbol: 'path://M 0,0 l 90,0 l -60,60 l -90,0 z',
        symbolSize: ['13', '7'], // 第一个值控制顶部方形大小
        symbolOffset: ['0', '-3'], // 控制顶部放行 左右和上下
        symbolRotate: -16,
        symbolPosition: 'end',
        barGap: 0,
        data: sideData2,
        z: 3,

      },//第2个柱子的立体到此结束



      {
        name: name3,
        tooltip: {
          show: false
        },
        type: 'bar',
        barWidth: 7,
        showBackground: true,
        backgroundStyle: {
          color: 'rgba(180, 180, 180, 0.1)'
        },
        itemStyle: {
          normal: {
            color: new echarts.graphic.LinearGradient(0, 1, 0, 0, [{
              offset: 0,
              color: "rgba(26,102,255,0)" // 0% 处的颜色
            }, {
              offset: 1,
              color: "rgba(26,102,255,0.9)", // 100% 处的颜色
            }], false)
          }
        },
        data: sideData3,
        barGap: 0,

      },
      {
        name: name3,
        type: 'bar',
        tooltip: {
          show: false
        },
        barWidth: 7,
        barGap: '15%',
        showBackground: true,
        backgroundStyle: {
          color: 'rgba(180, 180, 180, 0.1)'
        },
        itemStyle: {
          normal: {
            color: new echarts.graphic.LinearGradient(0, 1, 0, 0, [{
              offset: 0,
              color: "rgba(51,153,255,0)" // 0% 处的颜色
            }, {
              offset: 1,
              color: "rgba(26,102,255,1)", // 100% 处的颜色
            }], false)
          }
        },
        barGap: 0,
        data: sideData3,
        label: {
          // show: true,
          position: 'top',
          textStyle: {
            color: 'white',
            fontSize: 10
          }
        }
      }, 
      {
        name: name3,
        tooltip: {
          show: true
        },
        barGap: '15%',
        type: 'pictorialBar',
        showBackground: true,
        backgroundStyle: {
          color: 'rgba(180, 180, 180, 0.1)'
        },
        itemStyle: {
          borderWidth: 1,
          borderColor: '#15D0F5',
          color:'rgba(26,102,255,1)'// '#15D0F5' // 顶部方块的颜色
        },
        symbol: 'path://M 0,0 l 90,0 l -60,60 l -90,0 z',
        symbolSize: ['13', '7'], // 第一个值控制顶部方形大小
        symbolOffset: ['1.4', '-3'], // 控制顶部放行 左右和上下
        symbolRotate: -16,
        symbolPosition: 'end',
        barGap: '0',
        data: sideData3,
        z: 3,

      }


      
    ]
  };

export { option };
