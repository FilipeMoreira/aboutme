$(document).ready(function(){
	/*$("#hue").click(function(){
		console.log("oi");
		$("#footer").css({"background": "-webkit-linear-gradient(-45deg, rgba(73,199,0,1) 0%, rgba(24,143,0,1) 26%, rgba(255,242,0,1) 41%, rgba(255,242,0,1) 62%, rgba(31,139,255,1) 78%, rgba(0,115,255,1) 100%)"});
	});*/

	console.log($(document).height()-($("#footer").offset().top+256));
	if($(document).height()-($("#footer").offset().top+256)>0){
		$("#footer").css("height",($(document).height()-($("#footer").offset().top))+"px");
	}
});




/*

,
						"background": "-moz-linear-gradient(-45deg, rgba(73,199,0,1) 0%, rgba(24,143,0,1) 26%, rgba(255,242,0,1) 41%, rgba(255,242,0,1) 62%, rgba(31,139,255,1) 78%, rgba(0,115,255,1) 100%)",
						"background": "-webkit-gradient(left top, right bottom, color-stop(0%, rgba(73,199,0,1)), color-stop(26%, rgba(24,143,0,1)), color-stop(41%, rgba(255,242,0,1)), color-stop(62%, rgba(255,242,0,1)), color-stop(78%, rgba(31,139,255,1)), color-stop(100%, rgba(0,115,255,1)))",
						"background": "-webkit-linear-gradient(-45deg, rgba(73,199,0,1) 0%, rgba(24,143,0,1) 26%, rgba(255,242,0,1) 41%, rgba(255,242,0,1) 62%, rgba(31,139,255,1) 78%, rgba(0,115,255,1) 100%)",
						"background": "-o-linear-gradient(-45deg, rgba(73,199,0,1) 0%, rgba(24,143,0,1) 26%, rgba(255,242,0,1) 41%, rgba(255,242,0,1) 62%, rgba(31,139,255,1) 78%, rgba(0,115,255,1) 100%)",
						"background": "-ms-linear-gradient(-45deg, rgba(73,199,0,1) 0%, rgba(24,143,0,1) 26%, rgba(255,242,0,1) 41%, rgba(255,242,0,1) 62%, rgba(31,139,255,1) 78%, rgba(0,115,255,1) 100%)"

						*/