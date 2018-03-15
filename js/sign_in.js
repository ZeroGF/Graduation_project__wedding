require(["/pc/js/config.js"],function(){
	require(["jquery","cookie","load"],function($){
		
		
		
		$(".sign-in").submit(function(){
			console.log("222")
			$.ajax({
				type:"post",
				url:"/pc/php/login.php",
				data : $(this).serialize(),
				dataType : "json",
				success:function(data){
					
					if(data.res_code===0){
						let _phone=$(".phone").val(),
			                _pwd=$(".password").val();
			            console.log(data.res_body.password);
			            if(data.res_body.password !== _pwd){
			                $(".pwd-info").text("密码与账号不匹配");
			                return false;
			            }
			            else
			               $(".pwd-info").text("");
			            
			            $.cookie.json=true;
						$.cookie("user",data.res_body,{expires:7,path:"/"});
						location="/pc/index.html";
					}
					else{
						$(".phone-info").text("用户不存在");
					}
				}
			});
			return false;
		})
		
   });
})