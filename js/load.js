define(["jquery","cookie"],function($){
   /***********加载tou部*************/
   $.ajax({
   	type:"get",
   	url:"/pc/html/include/header.html",
   	success:function(data){
   		$(".header").html(data);
   		//加载header.js
   		$.getScript("/pc/js/header.js");
   	}
   });
   
   /***********加载尾部*************/
   $.ajax({
   	type:"get",
   	url:"/pc/html/include/footer.html",
   	success:function(data){
   		$("footer").html(data);
   		$.getScript("/pc/js/header.js");
   	}
   });
});

