require(["/pc/js/config.js"],function(){
	require(["jquery","cookie","load"],function($,cookie){
		
		let isregister=true;// 标记邮箱是否被占用，true--占用 false--未被占用
		
		/*
		 * 校验手机号
		 */
		$(".phone").blur(function(){
			let _phone=$(".phone").val(),
		    ret=/^(13[0-9]|14[5|7]|15[0|1|2|3|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9])\d{8}$/;
		    if( _phone!=='' && ret.test(_phone)){   
		    	isregister=true;
		    	$(".phone-info").text("✔").css("color","green");
		    }
		    else{        
		    	isregister=false;
		    	$(".phone-info").text("✘");  
		    
		    }
		});
		/*
		 * 校验密码----密码的强度必须是包含大小写字母和数字的组合，不能使用特殊字符，长度在8-10之间。
		 */
		$(".password").blur(function(){
			let pwd=$(".password").val(),
		    ret=/^[a-z0-9_-]{6,18}$/;
		    if(pwd!=='' && ret.test(pwd)){ 
		    	isregister=true;
		    	$(".password-info").text("✔").css("color","green");  
		    	
		    }
		    else{    
		    	isregister=false;
		    	$(".password-info").text("✘");  
		    
		    }
		});
		$(".pwd").blur(function(){
			let pwd=$(this).val(),
			    _password=$(".password").val();
			if(pwd !== _password){
				isregister=false;
				$(".pwd-info").text("密码不一致");
			}
			if(pwd===""){
				isregister=false;
				$(".pwd-info").text("✘");
			}
			else{
				isregister=true;
				$(".pwd-info").text("✔").css("color","green");
			}
		})
		/*
		 * 校验邮箱
		 */
		$(".email").blur(function(){
			let email=$(".email").val(),
		    ret=/^[a-z\d]+(\.[a-z\d]+)*@([\da-z](-[\da-z])?)+(\.{1,2}[a-z]+)+$/;
		    
			if(email !== "" && ret.test(email)){   
			    	isregister=true;
			    	$(".email-info").text("✔").css("color","green");  
			    	
			}
		    else{        
		    	isregister=false;
		    	$(".email-info").text("✘");  
		    
		    }
		});
		
		/*
		 * 随机生成验证码
		 */
		$(".code").val(validateCode(4));
		$(".code").click(function(){
			$(this).val(validateCode(4));
		});
		$(".check").blur(function(){
			//校验验证码
			let _check=$(".check").val(),
			    _code=$(".code").val();
			if( _check!=='' && _check === _code){
				isregister=true;
				$(".check-info").text(" ");
			}
			else{
				isregister=false;
				$(".check-info").text("输入错误");
			}
		});
		/*
		 * 不能为空
		 */
		
		
		
		/*
		 * 注册提交
		 */
		//验证电话号码是否被占用
		$(".up_form :text[name='phone']").blur(function(){
			$.getJSON("/pc/php/check.php",{phone:$(this).val()},function(data){
				if(data.res_body.status===0){
					 isregister=true;
					$(".phone-info").text("号码可用").css("color","green");
				   	
				}
				else{
					 isregister=false;
					$(".phone-info").text("号码已被注册，请重新填写").css("color","red");
				}
			});
		});
		//注册
		$(".sign-up").submit(function(){
			console.log(isregister);
			if (isregister) { // 号码未被占用，则提交注册信息
				console.log("aaaa");
				$.ajax({
					type : "post",
					url : "/pc/php/register.php",
					data : $(this).serialize(),
					dataType : "json",
					success : function(data){
						if (data.res_code === 0) {
							console.log(data);
							// 保存注册成功的用户信息到 cookie 中
							$.cookie.json = true; // 自动调用JSON.stringify()、JSON.parse()来转换JS值与JSON字符串
							$.cookie("user", data.res_body, {path:"/"});
							location = "/pc/index.html";
						} else {
							alert("用户注册失败，请稍后重试...");
						}
					}
				});
			}
	
			return false;
		});
		
		//生成随机数
		function random(min,max){
			return Math.floor(Math.random()*(max-min))+min;
		}
        // 数字：48~57
		// 大写：65~90
		// 小写：97~122
		function validateCode(len){
			var str="";
			while (str.length<len) {
				var rand=random(48,123);
				if(rand>=48 && rand<=57 || rand>=65 && rand<=90 || rand>=97 && rand<=122){
					rand=String.fromCharCode(rand);
					str+=rand;
				}	
			}
			return str;
		}
	});
});
