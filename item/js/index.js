$(function(){
	var dance = (function(){
		var _this,index=5;
		var $play_btn = $(".play");
		var $mp3 = $("#mp3");
		var $peo = $(".peo li");
		var arr = [];
		var $stop = $(".stop");
		var $pre = $(".pre");
		var $next = $(".next");
		var $zou = $("#zou");
		var $user = $("#user");
		var $pass = $("#pass");
		var $vol = $("#vol");
		var $rem = $("#rem");
		var $pro_pic = $(".pro .pic li");
		return {
			init:function(){
			    	_this = this;
					_this.mySwiper();
					_this.play_music();
					_this.getMusic();
					_this.reqired_user();
					_this.getTime();
					_this.prev_music();
					_this.next_music();
					_this.jump_peo(5);
					_this.bar_drag();
					_this.get_user();
			},
			mySwiper:function(){
				new Swiper ('.swiper-container', {
				    loop: true,
				    autoplay:3000,
				    // 如果需要分页器
				    pagination: '.swiper-pagination',
				    autoplayDisableOnInteraction:false
				});
			},
			getMusic:function(){
				$.get("music.json",function(data){
					arr = data;
				});
				$peo.on("click",function(){
					index = $(this).index();
					_this.click_peo(index);
					_this.jump_peo(index);
				});
			},
			jump_peo:function(index){
				$peo.css("transform","translate(0,0px)");
				if(index<6){
					var per = $peo[index];
					$(per).css("transform","translate(0,-39px)");
				}
			},
			play_music:function(){
				$play_btn.click(function(){
					$mp3[0].play();
				});
				$stop.on("click",function(){
					$mp3[0].pause();
				});
			},
			click_peo:function(index){
				$mp3.attr("src",arr[index].src);
				$mp3[0].load();
				$mp3[0].play();
				_this.random_rotate();
			},
			prev_music:function(){
				$pre.on("click",function(){
					index--;
					if(index<0){
						index=9;
					}
					_this.click_peo(index);
					_this.jump_peo(index);
				});
			},
			next_music:function(){
				$next.on("click",function(){
					index++;
					if(index>9){
						index=0;
					}
					_this.click_peo(index);
					_this.jump_peo(index);
				});
			},
			reqired_user:function(){
				$zou.on("click",function(){
					var user_val = $user.val();
					var pass_val = $pass.val();
					var reg = /^\w{10}$/;
					if(reg.test(user_val)&&reg.test(pass_val)){
						localStorage.setItem("user",user_val);
						if($rem[0].checked){
							alert("用户名保存成功，登录成功");
						}else{
							alert("登录成功");
						}
					}else{
						alert("用户名密码需要10位");
					}
				});
			},
			get_user:function(){
				var user = localStorage.getItem("user");
				if(user){
					$user.val(user);
				}
			},
			get_dbNum:function(num){
				return num>9?num:"0"+num;
			},
			getTime:function(){
				$mp3[0].ontimeupdate = function(){
					var r = $mp3[0].duration;
					var t = $mp3[0].currentTime;
					var m = parseInt(r/60);
					var s = parseInt(r%60);
					m = _this.get_dbNum(m);
					s = _this.get_dbNum(s);
					var tm =  parseInt(t/60);
					var ts = parseInt(t%60);
					tm = _this.get_dbNum(tm);
					ts = _this.get_dbNum(ts);
					$("#allTime").html(m+":"+s);
					$("#curTime").html(tm+":"+ts);
					if(r/t==1){
						index++;
						if(index>9){
						index=0;
						}
						_this.click_peo(index);
						_this.jump_peo(index);
					}
				};
			},
			random_rotate:function(){
				var num = parseInt(Math.random()*4);
				$pro_pic.find("div").css("animation","");
				$pro_pic.find("img").css("animation","");
				if(num==0){
					$pro_pic.find("div")[num].style.animation = "myanimte 8s infinite linear";
				}
				if(num==2){
					$pro_pic.find("div")[num-1].style.animation = "myanimte 8s infinite linear";
				}
				if(num==3){
					$pro_pic.find("div")[num-1].style.animation = "myanimte 8s infinite linear";
				}
				$pro_pic.find("img")[num].style.animation = "myanimte 15s infinite linear";
			},
			bar_drag:function(){
				barDrag({
		            wrap: $("#bar"),
		            rate: $("#sp"),
		            btn: $("#ebtn")
		        }, function (l) {
		            l = Math.round(l * 100) / 100;
		            l=l>1?l=1:l;
		            l=l<0.1?l=0:l;
		            $mp3[0].volume = l;
		        });
			},
		}
	})();
	dance.init();
});