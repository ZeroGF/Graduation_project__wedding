require(["/pc/js/config.js"],function(){
   require(["jquery","template","cookie","load"],function($,template){
	//利用模板渲染页面内容
	
	console.log(template);
	$.getJSON("/pc/mock/lists.json",function(data){
		// 渲染模板
		let rendData={
			products:data.res_body.products
		}
		let html = template('wedding', rendData);
        $(".prod-list").prepend(html);
        //图片转换
        $(".item").hover(function(){
			$(this).find(".img2").show();
			$(this).find(".img1").hide();
		},function(){
			$(this).find(".img1").show();
			$(this).find(".img2").hide();
		});
		
		
		//保存每件的商品数据    加入购物车
		$(".prod-list").on("click",".item",function(){
			let product={
				pid:$(this).find(".pid").text(),
				img:$(this).find(".img1").attr("src"),
				title:$(this).find(".title").text(),
				price:$(this).find(".price").text(),
				amount:1,
				size:"xs",
				sub:0
			}
			//cookie保存数据
			$.cookie.json=true;
			
			$.cookie("detail",product,{expires:1,path:"/"});
			
			location="/pc/html/detail.html";
		});
		
		
		
	});
	
	function exist(id,products){
			for(let i=0;i<products.length;i++){
				let pid=Number(products[i].pid);
				if(pid===id){
					return i;
				}
			}
			return -1;
	}
	
});
});


