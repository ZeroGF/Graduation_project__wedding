require(["/pc/js/config.js"],function(){
   require(["jquery","cookie","load"],function($){
	//查找缓存的数据
	$.cookie.json=true;
	let _products=$.cookie("products"),
	    _total=$.cookie("total");
	console.log(_products);
	if(_products.length!==0){
		$(".empty").hide();
	}
	//加载加入到购物车的商品信息
	let html="";
	_products.forEach(function(curr){
		html=`
		     <div class="row cart-item">
		            <span class="pid" style="display:none;">${curr.pid}</span>
					<div class="col-md-1">
						<input type="checkbox" class="select" id="check"/><label for="check"></label>
					</div>
					<div class="col-md-2 img-box">
						<a href="#"><img class="img" src="${curr.img}"/></a>
					</div>
					<div class="col-md-1 col-md-offset-">
						<h2 class="name">${curr.title}</h2>
						<p class="size">SIZE: <span>${curr.size}</span></p>
					</div>
					<div class="col-md-2 price-box">
						<p>$ <span class="price">${curr.price}</span></p>
					</div>
					<div class="col-md-2 amount-box">
						<h3>Quantity</h3>
						<p><span class="reduce">-</span><input type="text" name="" class="count" value="${curr.amount}" /><span class="add">+</span></p>
					</div>
					<div class="col-md-2 price-box">
						<p>$ <span class="sum">${(curr.price*curr.amount).toFixed(2)}</span></p>
					</div>
					<div class="col-md-1">
						<p class="del">X</p>
					</div>
				</div>
		`;
		$(".prod-title").after(html);
	});
	
	// 将_products中每个元素缓存到行中
	$(".cart_wrap > .cart-item").each(function(index, element){
		// 在当前遍历到的行中缓存与之对应的商品对象数据
		$(this).data("item", _products[index]);
	});
	/********************购物车操作**********************/
	/*
	 * 全选
	 */
	$(".select_all").click(function(){
		//用prop获取全选框的状态
		let status=$(this).prop("checked");
		//设置各商品的复选选框的状态
		$(".select").prop("checked",status);
		calcTotal();
	});
	
	/*
	 * 取消全选:单独点击复选框
	 */
	let _pay=[];//保存选中的商品信息
	$(".cart-item").on("click",".select",function(){
		let _selects=$(".select:checked");
		if(_selects.length !== _products.length){
			$(".select_all").prop("checked",false);
		}
		else{
			$(".select_all").prop("checked",true);
		}
		//把选中的商品重新加到 ——pay---数组进行页面渲染
		if($(this).prop("checked")){
			
			let _pid=Number($(this).parents(".cart-item").find(".pid").text()),
			    index=exist(_pid,_products),
			    _ipay=exist(_pid,_pay);
			let _sub=$(this).parents(".cart-item").find(".sum").text();
			//console.log(_sub)
			    _products[index].sub=Number(_sub);
			    if(index !== -1){
			    	if(_ipay === -1)
			    	    _pay.push(_products[index]);
			    }
			   // console.log(_products[index]);
			   // console.log(_pay)
			//保存
			$.cookie("pay",_pay,{expires:7,path:"/"});
		}
		
		calcTotal();
	});
	
	/*
	 * 数量的加减
	 */
	$(".amount-box").on("click",".add,.reduce",function(){
		let _pid=Number($(this).parents(".cart-item").find(".pid").text()),
		    index=exist(_pid,_products);
		     if($(this).is(".add"))
			    _products[index].amount++;
			else{
				if(_products[index].amount<=1)
				return;
				_products[index].amount--;
			}
		$(this).siblings(".count").val(_products[index].amount);
		//小计金额的变化
		$(this).parents(".cart-item").find(".sum").text((_products[index].price * _products[index].amount).toFixed(2));
		$.cookie("products",_products,{expires:7,path:"/"});
		calcTotal();
	});
	
	/*
	 * 数量的修改
	 */
	$(".cart_wrap").on("blur",".count",function(){
		console.log("4444")
		// 获取当前选择行中的商品对象
		let _prod=$(this).parents(".cart-item").data("item");
		
		//数量的变化
		_prod.amount=$(this).val();
		
		//小计金额的变化
		$(this).parents(".cart-item").find(".sum").text((_prod.amount * _prod.price).toFixed(2));
		$.cookie("products",_products,{expires:7,path:"/"});
		calcTotal();
		
	});
	
	/*
	 * 删除
	 */
	$(".cart_wrap").on("click",".del",function(){
		// 获取当前选择行中的商品对象
		let _prod=$(this).parents(".cart-item").data("item");
		// 查找其在_products数组中的索引
		let index=$.inArray(_prod,_products);
		//在数组中删除该商品
		_products.splice(index,1);
		//保存修改后的信息
		$.cookie("products",_products,{expires:7,path:"/"});
		//从DOM中移除该商品
		
		$(this).parents(".cart-item").remove();
		calcTotal();
	});
	
	/*
	 * 计算总金额
	 */
	calcTotal();
	function calcTotal(){
		let total=0;
		$(".select:checked").each(function(){
			let _sum=Number($(this).parents(".cart-item").find(".sum").text());
			console.log(_sum);
			total+=_sum;
		});
		console.log(total);
		$(".total").text((total).toFixed(2));
		//加上邮费后的总额
	   let  _post=$(".otherr").text(),
	    _end=total + Number(_post);
	    console.log(_post);
	    console.log(_end);
	   $(".total-add").text(_end);
	   _total.htotal=total;
	   _total.ctotal=_end;
	   _total.post=_post;//保存邮费
	   //保存计算出的总金额
	   $.cookie.json=true;
	   $.cookie("total",_total,{expires:7,path:"/"});
	}
	
	
	
	
	/*
   	 * 页面操作
   	 */
   	$(".down").click(function(){
   		
   		$(".info").slideDown();
   		loadProvince();
   	});
   	$(".up").click(function(){
   		$(".info").slideUp();
   	});
   	//页面跳转的判断
   	$(".checkout a").click(function(){
   		
   		//获取被选择商品的个数
   		let _select=$(".select:checked");
   		if(_select.length===0)
   		   alert("你还没选择需要购买的商品");
   		else
   		  location="/pc/html/pay.html";
   		  
   		return false;
   		
   	})
	// 加载省份
		function loadProvince() {
			let _url = "http://route.showapi.com/1149-1?showapi_appid=29550&showapi_sign=08402fce064a484baad949d9a18f75e7&level=1";
			$.ajax({
				type : "get",
				url : _url,
				dataType : "json",
				success : function(data){
					let html = "<option value='-1'>请选择省份</option>";
					data.showapi_res_body.data.forEach(function(province){
						html += `<option value="${province.id}">${province.areaName}</option>`;
					});
					_url = "http://route.showapi.com/1149-1?showapi_appid=29550&showapi_sign=08402fce064a484baad949d9a18f75e7&level=1&page=2";
					$.ajax({
						type : "get",
						url : _url,
						dataType : "json",
						success : function(data){
							data.showapi_res_body.data.forEach(function(province){
								html += `<option value="${province.id}">${province.areaName}</option>`;
							});
							$("#province").html(html);
							loadCity();
						}
					});
				}
			});
		}

	
		// 加载城市
		function loadCity() {
	let _parentId = $("#province").val();
			console.log(_parentId)
			if (_parentId == -1)
				return;
			let _url = "http://route.showapi.com/1149-2?showapi_appid=29550&showapi_sign=08402fce064a484baad949d9a18f75e7&parentId=" + _parentId;
			$.ajax({
				url : _url,
				dataType : "json",
				success : function(data){
					let html = "<option value='-1'>请选择城市</option>";
					data.showapi_res_body.data.forEach(function(city){
						html += `<option value="${city.id}">${city.areaName}</option>`;
					});
					$("#city").html(html);
				}
			});
		}

		
		// 省份选择发生改变时，加载城市
		$("#province").change(function(){
			loadCity();
		})
	
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
