$(document).ready(function(){
	function fn() {
	  return "Hello World";
	};
	
	$(".demo").html(`foo ${fn()} bar`);
	
	console.log(['a', 'b', 'c'].fill(7))
	
	// foo Hello World bar
})

