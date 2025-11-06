import * as echarts from "echarts";

  
  var option;
  const sideData1 =  [222, 182, 192, 232, 292,100];
  const name1 = '访客数量';
  var x = ['聚合楼', '陶然楼', '综合楼', '室外', '保宁宛泳池', '运动场'];
  option = {
    tooltip: {
      trigger: 'axis'
    },
    // legend: {
    //   top : 0,
    //   right: 5,
    //   itemHeight:12,
    //   itemWidth:12,
    //   data: [
    //     {
    //       name: name1,
    //       textStyle: {
    //         color: 'white'
    //       }
    //     },
    //     {
    //       name: name2,
    //       textStyle: {
    //         color: 'white'
    //       }
    //     },{
    //       name: name3,
    //       textStyle: {
    //         color: 'white'
    //       }
    //     }
    //   ]
    // },
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
        barWidth: 30,
        showBackground: true,
        backgroundStyle: {
          color: 'rgba(180, 180, 180, 0.2)'
        },
        
        itemStyle: {
          normal: {
            color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [{
              offset: 0,
              color: "rgba(10, 10,10, 0.3)" // 0% 处的颜色
            }, {
              offset: 1,
              color: "#2A9CFF", // 100% 处的颜色
            }], false)
          }
        },
        data: sideData1,
        label: {
          show: true,
          position: 'top',
          textStyle: {
            color: 'white',
            fontSize: 10
          }
        },
        
          
          
        
       },

    
      {
        name: name1,
        tooltip: {
          show: true
        },
        type: 'pictorialBar',
        itemStyle: {
          borderWidth: 1,
          borderColor: '#2A9CFF',
          color: '#2A9CFF' // 控制顶部方形的颜色
          
        },
        symbol: 'path://M 100, 100 m -10, 0a10,10 0 1,0 150,0 a20,20 0 1,0 -150,0',
//         a r,r 0 1,0 (r * 2),0
//         a r,r 0 1,0 -(r * 2),0', //
        symbolSize: ['30', '10'], // 第一个值控制顶部方形大小
        symbolOffset: ['0', '-4'], // 控制顶部放行 左右和上下
        symbolRotate: 0,//角度
        symbolPosition: 'end',
        data: sideData1,
        barGap: 0,
        z: 3,
      },

    ],
    

  };

export { option };

        

 
 