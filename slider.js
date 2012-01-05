console.log("ready now");

var Slider = 
{
	init: function()
	{
		var sliderFields = document.getElementsByClassName('slider');
		
		for (var i = 0; i< sliderFields.length; i++) {
			//.exec(str) looks for regex matches in the provided str
			// regex to splits up each class and finds the number
			var fromMatch = /(^| )from(\d+)( |$)/.exec(sliderFields[i].className);
			var from = parseInt(fromMatch[2], 10);
			
			var toMatch = /(^| )to(\d+)( |$)/.exec(sliderFields[i].className);
			var to = parseInt(toMatch[2], 10);
			
			var scaleMatch =  /(^| )scale(\d+)( |$)/.exec(sliderFields[i].className);
			var scale = parseInt(scaleMatch[2], 10);
			
			// create all the DOM elements to build the slider
			// using js to build it since people w/o js won't be able to use
			// the slider it won't even appear if you don't have js
			var slider = document.createElement('div');
			slider.id = sliderFields[i].id + "-slider";
			slider.className = "slider-control" 
			
			var track = document.createElement('div');
			track.id = sliderFields[i].id + "-track";
			track.className = "slider-track";

			var thumb = document.createElement('div');
			thumb.id = sliderFields[i].id + "-thumb";
			thumb.className = "slider-thumb";
			
			var inputBox = sliderFields[i]
			

			// Stores values that even listeners will need 
			thumb._input = sliderFields[i];
			thumb._from = from;
			thumb._to = to;
			thumb._scale = scale;
      // caputures input typed directly into text field
			sliderFields[i]._thumb = thumb;

			// //now add previously created DOM elements to the DOM
			// var container = document.getElementsByClassName('container');
			document.body.appendChild(slider);
      slider.appendChild(track);
      slider.appendChild(thumb);
      sliderFields[i].parentNode.replaceChild(slider, sliderFields[i]);
      slider.appendChild(inputBox);
			
			// lastly, position the thumb handle by adjusting it's 'left' property
      var value = parseInt(sliderFields[i].value, 10);
      thumb.style.left = ((value - from) * scale) + "px";
      
      inputBox.addEventListener("change", Slider.changeListener);
      thumb.addEventListener("mousedown", Slider.mousedownListener);
		} //end for
	}, // end init
	
	changeListener: function(event) {
	  var thumb = this._thumb;
	  var value = parseInt(this.value, 10);
	  
	  if(value < thumb._from) {
	     value = thumb._from;
	  } else if(value > thumb._to) {
	    value = thumb._to;
	  }
	  
	  thumb.style.left = ((value - thumb._from) * thumb._scale) + "px";
	  this.value = value;
	}, //end changeListener
	
	mousedownListener: function(event) {
	  this._valueorigin = parseInt(this.style.left, 10) / this._scale - this._from;
	  this._dragorigin = event.clientX;
	  document._currentThumb = this;
    
    document.addEventListener("mousemove", Slider.mousemoveListener);
    document.addEventListener("mouseup", Slider.mouseupListener);
    
	}, // end mousedownListener;
	
	mousemoveListener: function(event) {
	 var thumb = document._currentThumb;
	 var value = thumb._valueorigin + (event.clientX - thumb._dragorigin)  / thumb._scale;
	 
	  if(value < thumb._from) {
	     value = thumb._from;
	  } else if(value > thumb._to) {
	    value = thumb._to;
	  }
	 
	 thumb.style.left = ((value - thumb._from) * thumb._scale) + "px";
	 thumb._input.value = value;
	}, // end mousemoveListener
	
	mouseupListener: function(event) {
	  document._currentThumb = null;
	  document.removeEventListener("mousemove", Slider.mousemoveListener);
	  document.removeEventListener("mouseup", Slider.mouseupListener);
	}
} // end slider

Slider.init();


