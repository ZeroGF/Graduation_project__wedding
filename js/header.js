require(["/pc/js/config.js"],function(){
	require(["jquery","cookie"],function($){
		/*
		 * cookie
		 */
		$.cookie.json=true;
		let _user=$.cookie("user"),
		    _total=$.cookie("total"),
		    _products=$.cookie("products");
		console.log(_total);
		if(_user){
			let html=`<a href="/pc/index.html" class="col-md-1 col-md-offset-11">${_user.username}</a>`;
			//console.log(_user.username);
			$(".header-top").html(html);
		}
		console.log(_total);
		if(_total){
			let ht=_total.htotal;
			$(".total").text(ht);
		}
		if(_products){
			$(".length").text(_products.length);
		}
		
		//console.log("9999999999999")
		/*
		 * 聊天操作
		 */
		$(".chat-c").click(function(){
			//console.log("888888888")
			$(".chat .b-box").slideDown();
			$(".hidee").css("display","block");
			$(this).find(".left").css("display","none");
		});
		$(".hidee").click(function(){
			console.log("00000")
			$(".b-box").slideUp();
		})
		
		//对话框为空则提示警告信息
		
		    
		 
		   
		$(".chat-name").blur(function(){
			let _name=$(".chat-name").val();
			if(_name===''){
				$(".name-i").text("Please provide your name");
			}
			else
			$(".name-i").hide();
		})
		$(".chat-email").blur(function(){
			let _email=$(".chat-email").val();
			if(_email==='')
			$(".email-i").text("Please provide a vilide email");
			else{
				$(".email-i").hide();
			}
		});
		$(".chat-mes").blur(function(){
			let  _txt=$(".chat-mes").val();
			if(_txt==='')
			$(".message-i").text("Complete this filed");
			else{
				$(".message-i").hide();
			}
		});
		
	})
});
