$(document).ready(function(){

	var divOffset = $("#zoom-img").offset();

	$("#zoom-img").mousemove(function(event){

		var top = event.pageY - divOffset.top;
		var left = event.pageX - divOffset.left;

		$("#zoom-img .zoomed").css({
			"opacity" : "1",
			"top" : "-"+top+"px",
			"left" : "-"+left+"px"
		});

	}).mouseleave(function(){
		$("#zoom-img .zoomed").css("opacity","0");
	});
});
