require(["/pc/js/config.js"],function(){
   require(["jquery","template","cookie","load","bootstrap"],function($,template){
	//渲染数据
	//利用模板渲染页面内容
	$.getJSON("/pc/mock/lists.json",function(data){
		// 渲染模板
		let rendData={
			products:data.res_body.products
		}
		let html = template('feture', rendData);
        $(".inner-slide").prepend(html);
        
        /*******************************/
         //	点击轮播
    //获取ul
    let _ul=$(".inner-slide"),
        _lis=$(".inner-slide li"),
        width=275,
        len=_lis.length,
        left=0;
    //动态计算ul的宽度
    _len=len*(width+5);
    //设置ul的宽度
    $(".inner-slide li").css("width",width+"px");
    $(".inner-slide").css("width",_len+"px");
    //点击事件
    
    $(".prev").click(function(){
    	console.log("22222")
    	if(left<= -(_len-1110)){
    		left=-275;
    	}
    	else{
    		left-=275;
    	}
        $(".inner-slide").animate({"margin-left":left+"px"},);
    	
    });
    $(".next").click(function(){
    	console.log("3333333333")
    	if(left >= 0){
    		left=-(_len-1110);
    		left+=275;
    	}
    	else{
    		left+=275;
    	}
    	$(".inner-slide").animate({"margin-left":left+"px"},);
    });
  
	});
	
   
        
  });   
})
