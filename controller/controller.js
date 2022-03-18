

	let touchStartTime,
		touchStartPos;				//start信息
	let mouseDown = false;			//mousemove事件绑定在window上，mouseDown变量判断当前是否为悬浮菜单被按下，再进行move判断
	let isMoveDot = false;			//悬浮菜单是否为可移动状态
	let isFirstMove = false;		//因为move事件要移动才能触发，start时刷新为true，保证对第一次move的识别
	let startTip;					//提示可移动

	function start(e){
		isMoveDot = false;
		isFirstMove = true;
		touchStartTime = e.timeStamp;
		touchStartPos = [e.changedTouches[0].clientX,e.changedTouches[0].clientY];
		startTip = setTimeout(function(){
			// kk.changeMessage("现在可移动了",2000,'green');
		},1000);	//长按设置的是1000ms后可移动（不移动move不会触发，这里可以提示一下，进入move后可取消这个定时器）
		return false;
	}

	function move(e){
		let touchTime = e.timeStamp-touchStartTime;
		let currentPos = [e.changedTouches[0].clientX,e.changedTouches[0].clientY];
		let offset = [currentPos[0]-touchStartPos[0],currentPos[1]-touchStartPos[1]];
		clearTimeout(startTip);
		if(touchTime > 1000 && isFirstMove){
			isFirstMove = false;
			isMoveDot = true;
		}else if(isFirstMove && offset[1] == 0 && offset[0] == 0){
			// console.log("not move,just auto emit");
			return false;
		}
		isFirstMove = false;

		//移动
		if(isMoveDot){
			document.getElementById('SAO-ctrldot').style.top = `calc(${currentPos[1]*100/document.querySelector('html').clientHeight}% - 30px)`;
			document.getElementById('SAO-ctrldot').style.left = `calc(${currentPos[0]*100/document.querySelector('html').clientHeight}% - 30px)`;
			return false;
		}

		if(offset[0]**2 + offset[1]**2 > 30**2){
			const l = Math.sqrt(offset[0]**2+offset[1]**2);
			offset[0] = 30*offset[0]/l;
			offset[1] = 30*offset[1]/l;
		}

		document.getElementById('SAO-ctrldot').getElementsByClassName('SAO-ctrldot-dot')[0].style.transform = `translate(${offset[0]}px,${offset[1]}px)`;
	}


	function end(e){
		if(isMoveDot){
			isMoveDot = false;
			return false;
		}
		let touchEndTime = e.timeStamp;
		let touchEndPos = [e.changedTouches[0].clientX,e.changedTouches[0].clientY];

		let offset = [touchEndPos[0]-touchStartPos[0],touchEndPos[1]-touchStartPos[1]];
		if(offset[0]**2 + offset[1]**2 > 30**2){
			const l = Math.sqrt(offset[0]**2+offset[1]**2);
			offset[0] = 30*offset[0]/l;
			offset[1] = 30*offset[1]/l;
		}
    // 点按时间，用于判断长按
		let touchTime = touchEndTime-touchStartTime;
		//判定事件
		if(touchTime < 300 && offset[0] == 0 && offset[1] == 0){
      saonotify('update',"糖果屋更新啦",);
			console.log("click");
      // 监测到点按事件
		}else if(offset[0] == 0 && offset[1] == 0){

			console.log("longClick");


			// 监测到长按
		}else if((offset[0]**2+offset[1]**2) < 400){
			console.log("little=>cancel");
		}else if(offset[0] > 0 && (Math.atan(offset[1]/offset[0])/Math.PI*180 < 45) && (Math.atan(offset[1]/offset[0])/Math.PI*180 > -45)){
			console.log("right")
      //监测到向右
		}else if(offset[0] < 0 && (Math.atan(offset[1]/-offset[0])/Math.PI*180 < 45)	&& (Math.atan(offset[1]/-offset[0])/Math.PI*180 > -45)){
			console.log("left")
      //监测到向左
		}else if(offset[1]<0){
			console.log("up");
      // 监测到向上
		}else if(offset[1]>0){
			console.log("down");
      // 检测到向下
		}else{
			console.log("???")
      // 未知事件
		}
      // 按钮复位
		document.getElementById('SAO-ctrldot').getElementsByClassName('SAO-ctrldot-dot')[0].style.transform = `translate(0px,0px)`;

		return false
	}
  // 触摸开始事件监听
	document.getElementById('SAO-ctrldot').getElementsByClassName('SAO-ctrldot-dot')[0].addEventListener("touchstart", start);
  // 触摸开始事件监听
	document.getElementById('SAO-ctrldot').getElementsByClassName('SAO-ctrldot-dot')[0].addEventListener('mousedown',function(e){
		mouseDown=true;
    // console.log("mStart")
		e.changedTouches = [{clientX:e.clientX,clientY:e.clientY}]
		start(e)
		return false;
	});
  // 触摸事件监听
	document.getElementById('SAO-ctrldot').getElementsByClassName('SAO-ctrldot-dot')[0].addEventListener('touchmove',move);
	window.addEventListener('mousemove',function(e){
		if(mouseDown){
			e.changedTouches = [{clientX:e.clientX,clientY:e.clientY}];
			move(e);
			return false;
		}
	});
  // 触摸结束事件监听
	document.getElementById('SAO-ctrldot').getElementsByClassName('SAO-ctrldot-dot')[0].addEventListener('touchend',end);
	window.addEventListener('mouseup',function(e){
		if(mouseDown){
			mouseDown=false;
			e.changedTouches = [{clientX:e.clientX,clientY:e.clientY}]
			end(e,this)
			return false;
		}
	});
  //触摸取消事件监听
	document.getElementById('SAO-ctrldot').addEventListener('touchcancel',function(e){
		console.log("cancel",e)
		document.getElementById('SAO-ctrldot').getElementsByClassName('SAO-ctrldot-dot')[0].style.transform = `translate(0px,0px)`;
	})
