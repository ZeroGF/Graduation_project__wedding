"use strict";require(["/pc/js/config.js"],function(){require(["jquery","template","cookie","load","bootstrap"],function(s,t){s.getJSON("/pc/mock/lists.json",function(e){var n={products:e.res_body.products},i=t("feture",n);s(".inner-slide").prepend(i);s(".inner-slide");var l=s(".inner-slide li").length,r=0;_len=280*l,s(".inner-slide li").css("width","275px"),s(".inner-slide").css("width",_len+"px"),s(".prev").click(function(){console.log("22222"),r<=-(_len-1110)?r=-275:r-=275,s(".inner-slide").animate({"margin-left":r+"px"})}),s(".next").click(function(){console.log("3333333333"),0<=r&&(r=-(_len-1110)),r+=275,s(".inner-slide").animate({"margin-left":r+"px"})})})})});