require(["/pc/js/config.js"],function(){
   require(["jquery","cookie","load","ui","zoom"],function($){
	//查询保存的数据---cookie
	$.cookie.json=true;
	let _detail=$.cookie("detail");
	//修改页面数据
	console.log(_detail.img);
	let _url = "url('"+_detail.img+"')";
	console.log(_url)
	$("body").css("background-image",_url);
	$(".img").attr("src",_detail.img);
	$(".img").attr("data-zoom-image",_detail.img);
	
	$(".price span").text(_detail.price);
	$(".title").text(_detail.title);
	
	//加入购物车
	$(".add-cart").click(function(){
		let _amount=0;
		//添加尺寸到detail
		let _option=$(".size option:selected")
		
		_detail.size=_option.text();
		
		//先查找
			let _products=$.cookie("products")||[];
			//
			let pid=Number(_detail.pid);
			index=exist(pid,_products);
			if(index === -1){
				_products.push(_detail);
				
				//console.log(_products[index].amount)
			}
			else{
				_products[index].amount++;
				_amount=_products[index].amount
				
				//计算每件商品的小计
			
				let _price=	Number(_detail.price),
				    _sub=_price * _amount ;
				    
				_products[index].sub =_sub.toFixed(2);
			
			}
			
			alert("成功加入购物车");
			//计算商品列表里总金额
			let htotal=0;
			_products.forEach(function(curr){
				htotal=Number(htotal);
				htotal += Number( curr.sub );
			});
			let _total={
				htotal:htotal.toFixed(2),//头部总金额
				ctotal:0,//购物车选中商品的总金额
				post:30//邮费
			};
			$.cookie("products",_products,{expires:7,path:"/"});
			//
			$.cookie("total",_total,{expires:7,path:"/"});
			
			
	});
	
	
	 
	/*
	 * 切换图片
	 */
	$(".bottom").on("click","li",function(){
		console.log("3333333333")
		let _src=$(this).find("img").attr("src");
		console.log(_src);
		$("#img").attr("src",_src);
		$("#img").attr("data-zoom-image",_src);
		
	});	
	
	
	/*
	 * 放大镜特效
	 */	
	
	// function big(){
	// 	$('#img').elevateZoom({
	// 	  zoomType: "lens",//类型：透镜效果 
	// 	    lensShape: "round", //透镜形状：圆形 
	// 	    lensSize: 300 //透镜尺寸：长和宽：200px
 //        });
	// }
    
   /*
    * 轮播
    */
	//获取ul
    let _ul=$(".slide-ul"),
        _lis=$(".slide-ul a"),
        width=60,
        len=_lis.length,
        left=0;
    //动态计算ul的宽度
    _len=len*width;
    //设置ul的宽度
    $(".slide-ul a").css("width",width+"px");
    $(".slide-ul").css("width",_len+"px");
    //点击事件
     $(".prev").click(function(){
    	console.log("22222")
    	if(left<= -(_len-460)){
    	    $(".prev").css("opacity",0);
    	    return;
    	}
    	else{
    		$(".next").css("opacity",1);
    		left-=60;
    	}
        $(".slide-ul").animate({"margin-left":left+"px"},);
    	
    });
    $(".next").click(function(){
    	if(left >= 0){
    		$(".next").css("opacity",0);
    		return;
    	}
    	else{
    		left+=60;
    		$(".prev").css("opacity",1);
    	}
    	$(".slide-ul").animate({"margin-left":left+"px"},);
    });
			  
		$("#img").elevateZoom({gallery:'gallery_01', cursor: 'move', galleryActiveClass: "active"}); 

	
	
	
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
