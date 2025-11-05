//请注意参数_this，后续调用页面数据就通过传入的_this,建议传入的形式为对象
export const useHookOne = (_this) => {
  let louName1 = ''
  // console.log('sssssssssssww',_this)
    const name = _this.all.objectName
    const newStr = _this.all.newStr
    const labelList = _this.all.labelList
    const HookFun1 = () => {

      console.log('sssssssssssww',_this.all)
        if(newStr==="trl"){//陶然楼
          louName1 = labelList[0].name
          if(name.indexOf('taoran_f') !==-1){ //屋顶不能跳转，楼层才行
            _this.all.cameraTween(100,3,60,97,44,71) //indexTS.vue 可用此文件调试坐标
          }
          if(name === 'taoran_f5'){ //第五层
            _this.all.visibleFalse('taoran_f5',louName1)
          }else if(name === 'taoran_f3'){ // 第三层
            _this.all.visibleFalse('taoran_f3',louName1)
          }else if(name === 'taoran_f2'){ //第二层
            _this.all.visibleFalse('taoran_f2',louName1)
          }else if(name === 'taoran_f1'){ //第一层
            _this.all.visibleFalse('taoran_f1',louName1)
          }
        }
      if(newStr==="zhlou"){//综合楼
          louName1 = labelList[1].name
        if(name.indexOf('zonghelou_f') !==-1){ //屋顶不能跳转，楼层才行
          _this.all.cameraTween(16,10,50,12,44,74) //indexTS.vue 可用此文件调试坐标
        }
        if(name.indexOf('zonghelou_f3')!==-1){ // 第三层
          _this.all.visibleFalse('zonghelou_f3',louName1)
        }else if(name.indexOf('zonghelou_f2')!==-1 || name.indexOf('zonghelouf2')!==-1){ //第二层
          _this.all.visibleFalse('zonghelou_f2',louName1)
        }else if(name.indexOf('zonghelou_f1')!==-1){ //第一层
          _this.all.visibleFalse('zonghelou_f1',louName1)
        }
      }
      if(newStr==="YYG"){
          louName1 = labelList[2].name
        if(name.indexOf('youyonguan_f') !==-1){ //屋顶不能跳转，楼层才行
          _this.all.cameraTween(-70,6,40,-66,40,20) 
        }
        
        if(name.indexOf('youyonguan_f2')!==-1){ //第二层//baoningyuan_youyonguan
          _this.all.visibleFalse("youyonguan_f2",louName1)
        }else if(name.indexOf('youyonguan_f1')!==-1){ //第一层
          _this.all.visibleFalse("youyonguan_f1",louName1)
        }
      }
      if(newStr==="djl"){
          louName1 = labelList[3].name
      if(name.indexOf('judelou_f') !==-1){ //屋顶不能跳转，楼层才行
        _this.all.cameraTween(-80,6,0,-50,40,8) 
      }
        if(name.indexOf('judelou_f3')!==-1){ //第3层
		  // _this.all.cameraTween(-80,6,0,-50,40,8) 
          _this.all.visibleFalse("judelou_f3",louName1)
        }else if(name.indexOf('judelou_f2')!==-1){ //第2层
          _this.all.visibleFalse("judelou_f2",louName1)
        }else if(name.indexOf('judelou_f1')!==-1){ //第1层
          _this.all.visibleFalse("judelou_f1",louName1)
        }
      }
    }
    return {
      HookFun1
    }
}
export const useHookTwo = (_this) => {
    let aniType = ''; // 动画类型
    // console.log('sss',_this)
	  switch(_this.objectName){
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
  
  return {
    aniType,
   
  }
}

