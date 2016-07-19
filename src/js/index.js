$(function(){
	var dance = (function(){
		var _this,index=0;
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
		return {
			init:function(){
			    	_this = this;
					_this.mySwiper();
					_this.play_music();
					_this.getMusic();
					_this.reqired_user();
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
				_this.click_peo();
			},
			play_music:function(){
				$play_btn.click(function(){
					$mp3[0].play();
				});
				$stop.on("click",function(){
					$mp3[0].paused();
				});
			},
			click_peo:function(){
				$peo.on("click",function(){
					index = $(this).index();
					$(this).css("transform","translate(0,-39px)").siblings().css("transform","translate(0,0px)");
					$mp3.attr("src",arr[index].src);
					$mp3[0].load();
					$mp3[0].play();
				});
			},
			prev_music:function(){

			},
			next_music:function(){

			},
			reqired_user:function(){
				$zou.on("click",function(){
					var user_val = $user.val();
					var pass_val = $pass.val();
					alert(user_val+"--"+pass_val);
				});
			},
			get_dbNum:function(num){
				return num>9?num:"0"+num;
			},
		}
	})();
	dance.init();
});