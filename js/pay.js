require(["/pc/js/config.js"],function(){
	require(["jquery","cookie","load"],function($){
		$(".card-radio").click(function(){
			$(".slide2").slideDown();
			$(".slide1").slideUp();
		});
		$(".pal-radio").click(function(){
			console.log("777")
			$(".slide1").slideDown();
			$(".slide2").slideUp();
		});
		
		/*
		 * 查询商品数据、总金额
		 */
		$.cookie.json=true;
		let _pay=$.cookie("pay"),
		    _total=$.cookie("total");
		console.log(_pay)
		let html="";
		_pay.forEach(function(curr){
			html=`
			    <div class="box clearfix">
			    			<p>
			    			   <span class="title">${curr.title} 2.0 </span>X<span class="amount">${curr.amount}</span><br />
	                           <span>SIZE :</span><span class="size"> ${curr.size}</span>
			    			</p>
			    			<p>$ <span class="price">${curr.sub}</span></p>
			    </div>
			`;
			
			$(".order-title").after(html);
		})
		//修改页面数据
		$(".other").text(_total.post);
		$(".not-other").text(_total.htotal);
		$(".price").val(_total.ctotal);
		/*
		 * 判断不能为空
		 */
		let  isregister=true,flag=1;
		$(".pay-form").on("blur","input",function(){
		     if(!$(this).val()){
		        isregister=false;
		     	$(this).next().next().text("不能为空");
		     	empty();
		     }
		     else{
		         $(this).next().next().text("");
		         isregister=true;
		         empty();
		     }
		})
		empty();
		function empty(){
		   let _input=$(".pay-form input:not('#letter')");
			console.log(_input);
			_input.each(function(curr){
			    let _ele=_input[curr];
			     console.log(_ele)
			     if($(this).val()===''){
			         isregister=false;
			     }
			     else{
			         isregister=true;
			     }
			     
			})
		}
		
		
		/*
		 * 用户信息提交到数据
		 */
		$(".main").submit(function(){
		if(isregister){
		   $.ajax({
				type:"post",
				url:"/pc/php/order.php",
				dataType:"json",
				data : $(this).serialize(),
				success:function(data){
					if (data.res_code==0) {
					alert("提交信息成功。")
							console.log(data);
							
						} 
						else {
							
							alert("用户注册失败，请稍后重试...");
						}
				}
				
			});
		}
		else{
		   alert("输入框不能为空")
		}
			
			return false;
		});
//		$(".btnn").click(function(){
//			$(".success").css("display","block");
//		})
//		$(".sure").click(function(){
//			$(".success").css("display","none");
//		})
		
	})
})
