window.onload = function() {

	//$(".my-draggable").dragndropnew();

	for (var i = 1; i <= 10; i++) {
		//$("#table-one").find("tbody").append('<tr class="my-draggable-row" data-drop-area="#tbody-two"><td>'+i+'</td><td>Rondy</td><td>email@email.com</td></tr>');
	};

	$(".my-draggable").dragndrop({
		move : true,
		
	});

	$(".my-draggable-row").dragndrop({
		move : false,
	});
	
	$(".my-draggable-row-move").dragndrop({
		move : true,
		remove: true
	});

}


// Working
$.fn.extend({
	dragndrop : function(options) {

		var defaults = {
			move : true, 	//copy or move?
			remove: false, //can remove?
		};

		//Extend those options
		var options = $.extend(defaults, options);

		return this.each(function() {

			$(this).attr("draggable", "true");

			var dragged;
			var copy;

			$(this).each(function() {

				$(this).on("dragstart", function(event) {

					dragged = this;
										
					var dropAreaValues = $(this).attr("data-drop-area");
					var dropAreas = dropAreaValues.split(" ");

					//each dropAreas
					$.each( dropAreas, function( key, value ) {
						
						var dropArea = value;

						if($(dropArea).prop("tagName") == "TBODY"){
							var isTable = true;
						}else{
							var isTable = false;
						}
						
						if(isTable){
							copy = $(dragged).clone();
							$(dragged).parent().append($(copy));
						}

						//highlinthing the drop areas	  
					  	$(dropArea).addClass("drop-area-active");

					  	//calculating the height if dropArea is a table
						if (isTable) {
							var height = parseInt($(dropArea).css("height").replace("px", ""));
							//var lineHeight = parseInt($(dropArea).css("line-height").replace("px", ""));
							
							var lineHeight = 0;
							var finalHeight = (height + lineHeight);
							$(dropArea).css("height", finalHeight);
						}

						//on drag start element
						$(dragged).on("drag", function(event) {
							var x = event.originalEvent.pageX;
							var y = event.originalEvent.pageY;
							if (isTable) {
								$(copy).css({
									"top" : y,
									"left" : x,
								});
								$(copy).addClass("row-dragging");								
							}
						});//end this drag

						//on drag end
					  	$(dragged).on("dragend", function(event) {

							$(dropArea).removeClass("drop-area-active");							
							dragged = null;
						});//end this dragend

						$(dropArea).on("dragover", function(event) {
							if (event.originalEvent.preventDefault) {
								event.originalEvent.preventDefault();
							}
							//event.originalEvent.dataTransfer.dropEffect = 'copy';
							if (dragged != null) {
								if ($(dragged).attr("data-drop-area").replace("#", "") == $(this).attr("id")) {
									$(this).addClass("drop-area-hover");
								}
							}
							return false;
						});//end dropArea dragover


						$(dropArea).on("dragleave", function(event) {
							$(this).removeClass("drop-area-hover");
						});//end dropArea dragleave

						$(dropArea).on("drop", function(event) {
							if (event.originalEvent.preventDefault) {
								event.originalEvent.preventDefault();
							}
							var data = event.originalEvent.dataTransfer.getData('text');

							//remove absolute position
							if (isTable) {
								$(dragged).removeClass("row-dragging");
								$(copy).remove();
							}
							
							if (options.move) {
								$(this).append($(dragged));
								
							} else {
								var c = $(dragged).clone();
								$(this).append($(c));
								
							}
							
							$(dropArea).removeClass("drop-area-hover");
							dragged = null;
							return false;
						});//end dropArea drop

						$(dropArea).on("dragend", function(event) {
							dragged = null;
						});//end dropArea dragend

					});//end each dropAreas

					
				});//end dragstart

			});

		});
		//end each
	}
	//end validate
});
//end extends

function getMousePosition() {
	$(window).mousemove(function() {
		var x = event.pageX;
		var y = event.pageY;
		//    var x = event.pageX - this.offsetLeft;
		// var y = event.pageY - this.offsetTop;

		$("#mousePosition").text("Posição do mouse: " + x + ", " + y);
	});
}

