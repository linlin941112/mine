window.onload=function(){
	var button=document.querySelector("button");
	var qi=document.querySelector(".qi");
	var span=qi.getElementsByTagName("span")[1];
	console.log(span);
		function saolei(x,y,num){
		this.numX=x;
		this.numY=y;
		this.num=num;
		this.sence=document.querySelector(".sence");
	}
	saolei.prototype={

		play:function(){
			this.drawSence(this.numX,this.numY);
			this.drawLei(this.numX,this.numY,this.num);
			this.drawNum();
			this.fan();
			this.qizi();
		},
		drawSence:function(x,y){
			// console.log(this.sence);
			this.sence.style.width=y*30+"px";
			this.sence.style.height=x*30+"px";
			this.sence.classList.add("bian");
			for (var i = 0; i < x; i++) {
				for (var j = 0; j < y; j++) {
					var gezi=document.createElement("div");
					gezi.id=i+"-"+j;
					gezi.classList.add("gezi");
					gezi.classList.add("fugai");
					this.sence.appendChild(gezi);
				}
			}
			
		},

		drawLei:function(x,y,num){
			var arr=[];
			for (var i = 0; i < num; i++) {
				var lx=Math.floor(Math.random()*x);
				var ly=Math.floor(Math.random()*y);
				for (var j = 0; j < arr.length; j++) {
					if(arr[j].x==lx && arr[j].y==ly){
						j=0;
						lx=Math.floor(Math.random()*x);
						ly=Math.floor(Math.random()*y);
					}

				}
				var json={x:lx,y:ly};
				arr.push(json);
			}
			// console.log(document.getElementById(arr[0].x+"-"+arr[0].y));
			arr.forEach(function(v){
				document.getElementById(v.x+"-"+v.y).classList.add("lei");
				document.getElementById(v.x+"-"+v.y).lei=true;
			});
		},

		drawNum:function(){
			var arr=document.querySelectorAll(".gezi");
			that=this;
			arr.forEach(function(v){
				if(!v.classList.contains('lei')){
					v.num=that.jisuan(v);
					// v.innerHTML=v.num;
				}
			})
		},

		jisuan:function(obj){
			var arr=obj.id.split("-");
			var num=0;
			var kX=parseInt(arr[0]);
			var kY=parseInt(arr[1]);
			var top=document.getElementById(`${kX-1}-${kY}`),
				bottom=document.getElementById(`${kX+1}-${kY}`),
				left=document.getElementById(`${kX}-${kY-1}`),
				right=document.getElementById(`${kX}-${kY+1}`),
				leftTop=document.getElementById(`${kX-1}-${kY-1}`),
				leftBottom=document.getElementById(`${kX+1}-${kY-1}`),
				rightTop=document.getElementById(`${kX-1}-${kY+1}`),
				rightBottom=document.getElementById(`${kX+1}-${kY+1}`);
			if(top){
				if(top.classList.contains("lei")){
					num++;
				}
			}
			if(bottom){
				if(bottom.classList.contains("lei")){
					num++;
				}
			}
			if(right){
				if(right.classList.contains("lei")){
					num++;
				}
			}
			if(left){
				if(left.classList.contains("lei")){
					num++;
				}
			}
			if(leftTop){
				if(leftTop.classList.contains("lei")){
					num++;
				}
			}
			if(leftBottom){
				if(leftBottom.classList.contains("lei")){
					num++;
				}
			}
			if(rightTop){
				if(rightTop.classList.contains("lei")){
					num++;
				}
			}
			if(rightBottom){
				if(rightBottom.classList.contains("lei")){
					num++;
				}
			}
			return num;
		},
		fan:function(){
			var arr=document.querySelectorAll(".fugai");
			that=this;
			arr.forEach(function(v){
				v.onclick=function(){
					if(v.classList.contains("fugai")){
						v.classList.remove("fugai");
						if(v.num){
							v.innerHTML=v.num;
						}
						if(v.classList.contains("lei")){
							that.gameOver();
						}
						if(v.num==0){
							// console.log(1);
							that.zero(v);
						}
					}
					var fu=document.querySelectorAll(".fugai")
					var qi=document.querySelectorAll(".qizi")
					if((fu.length+qi.length)==that.num){
						that.cheng();
					}
				}
			})
		},

		gameOver:function(){
			var lei=document.querySelectorAll(".lei");
			lei.forEach(function(v){
				v.classList.remove("fugai");

			});
			button.classList.remove("kaishi");
			button.classList.remove("chenggong");
			button.classList.add("shibai");
		},

		zero:function(obj){
			// console.log(1);
			var arr_kong=[];
			arr_kong.push(obj);
			while(arr_kong.length){
				var arr=arr_kong[0].id.split("-");
				var kX=parseInt(arr[0]);
				var kY=parseInt(arr[1]);
				var top=document.getElementById(`${kX-1}-${kY}`),
					bottom=document.getElementById(`${kX+1}-${kY}`),
					left=document.getElementById(`${kX}-${kY-1}`),
					right=document.getElementById(`${kX}-${kY+1}`),
					leftTop=document.getElementById(`${kX-1}-${kY-1}`),
					leftBottom=document.getElementById(`${kX+1}-${kY-1}`),
					rightTop=document.getElementById(`${kX-1}-${kY+1}`),
					rightBottom=document.getElementById(`${kX+1}-${kY+1}`);
				if(top&&top.classList.contains("fugai")){
					top.classList.remove("fugai");
					if(top.num==0){
						arr_kong.push(top);
					}
					if(top.num){
						top.innerHTML=top.num;
					}
				}
				if(bottom&&bottom.classList.contains("fugai")){
					bottom.classList.remove("fugai");
					if(bottom.num){
						bottom.innerHTML=bottom.num;
					}
					if(bottom.num==0){
						arr_kong.push(bottom);
					}
				}
				if(right&&right.classList.contains("fugai")){
					right.classList.remove("fugai");
					if(right.num){
						right.innerHTML=right.num;
					}
					if(right.num==0){
						arr_kong.push(right);
					}
				}
				if(left&&left.classList.contains("fugai")){
					left.classList.remove("fugai");
					if(left.num){
						left.innerHTML=left.num;
					}
					if(left.num==0){
						arr_kong.push(left);
					}
				}
				if(leftTop&&leftTop.classList.contains("fugai")){
					leftTop.classList.remove("fugai");
					if(leftTop.num){
						leftTop.innerHTML=leftTop.num;
					}
					if(leftTop.num==0){
						arr_kong.push(leftTop);
					}
				}
				if(leftBottom&&leftBottom.classList.contains("fugai")){
					leftBottom.classList.remove("fugai");
					if(leftBottom.num){
						leftBottom.innerHTML=leftBottom.num;
					}
					if(leftBottom.num==0){
						arr_kong.push(leftBottom);
					}
				}
				if(rightTop&&rightTop.classList.contains("fugai")){
					rightTop.classList.remove("fugai");
					if(rightTop.num){
						rightTop.innerHTML=rightTop.num;
					}
					if(rightTop.num==0){
						arr_kong.push(rightTop);
					}
				}
				if(rightBottom&&rightBottom.classList.contains("fugai")){
					rightBottom.classList.remove("fugai");
					if(rightBottom.num){
						rightBottom.innerHTML=rightBottom.num;
					}
					if(rightBottom.num==0){
						arr_kong.push(rightBottom);
					}
				}

				arr_kong.shift();
			}

		},
		qizi:function(){
			var arr=document.querySelectorAll(".fugai");
			var that=this;
			this.sence.oncontextmenu=function(ev){
				ev.preventDefault();
			}
			// console.log(arr);
			arr.forEach(function(v){
				v.oncontextmenu=function(ev){
					// console.log(1);
					ev.preventDefault();
					var qizi=document.querySelectorAll(".qizi");
					if(qizi.length<that.num){
						if(this.classList.contains("fugai")){
							this.classList.remove("fugai");
							this.classList.add("qizi");
						}else if(this.classList.contains("qizi")){
							this.classList.add("fugai");
							this.classList.remove("qizi");
						}
					}else{
						if(this.classList.contains("qizi")){
							this.classList.add("fugai");
							this.classList.remove("qizi");
						}
					}
				
					var qi=document.querySelectorAll(".qizi");
					var qishu=parseInt(that.num-qi.length);
					qishu=qishu>9?qishu:"0"+qishu;
					// console.log(qishu);
					span.innerHTML=qishu;
					that.success();	
				}
			})
		},

		success:function(){
			var lei=document.querySelectorAll(".lei");
			var flag=true;
			lei.forEach(function(v){
				if(!v.classList.contains("qizi")){
					flag=false;
				}
			})
			if(flag){
				this.cheng();
			}
		},

		cheng:function(){
			button.classList.remove("kaishi");
			button.classList.remove("shibai");
			button.classList.add("chenggong");
		}

	};
	button.classList.add("kaishi");
	var x=9,y=9,z=10;
	var xuan=document.getElementById("jibie");
	var sence=document.getElementsByClassName("sence")[0];
	// console.log(sence);
	xuan.onchange=function(){
		if(xuan.value=="初级"){
			x=9;y=9;z=10;
		}
		if(xuan.value=="中级"){
			x=16;y=16;z=20;
		}
		if(xuan.value=="高级"){
			x=16;y=30;z=40;
		}
		if(xuan.value=="自定义"){
			x=Number(prompt("请输入雷区的高度",0));
			y=Number(prompt("请输入雷区的宽度",0));
			z=Number(prompt("请输入雷的数量",0));

		}
		var ge=document.getElementsByClassName("gezi");
		for (var i = ge.length-1; i >=0; i--) {
			sence.removeChild(ge[i]);
			// delete.ge[i];
		}
		
		var sao=new saolei(x,y,z);
		sao.play();
		span.innerHTML=sao.num;
	}
	button.onclick=function(){
		if(xuan.value=="初级"){
			x=9;y=9;z=10;
		}
		if(xuan.value=="中级"){
			x=16;y=16;z=20;
		}
		if(xuan.value=="高级"){
			x=16;y=30;z=40;
		}
		if(xuan.value=="自定义"){
			x=Number(prompt("请输入雷区的高度",0));
			y=Number(prompt("请输入雷区的宽度",0));
			z=Number(prompt("请输入雷的数量",0));

		}
		button.classList.remove("chenggong");
		button.classList.remove("shibai");
		button.classList.add("kaishi");
		var ge=document.getElementsByClassName("gezi");
		for (var i = ge.length-1; i >=0; i--) {
			sence.removeChild(ge[i]);
		}
		var sao=new saolei(x,y,z);
		sao.play();
		span.innerHTML=sao.num;
		
	}
	// button:
	var sao=new saolei(x,y,z);
	sao.play();
	span.innerHTML=sao.num;
	













}