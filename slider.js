console.log("ready now");

var Slider = 
{
	init: function()
	{
		var sliderFields = document.getElementsByClassName('slider');
		console.log('sliderFields is equal to: ' + sliderFields);
		
		for (var i = 0; i< sliderFields.length; i++) {
			console.log("sliderFields[i]= " + sliderFields[i]);
			console.log(sliderFields[i].id);
			//.exec(str) looks for regex matches in the provided str
			// regex to splits up each class and finds the number
			var fromMatch = /(^| )from(\d+)( |$)/.exec(sliderFields[i].className);
			console.log(fromMatch);
			console.log(fromMatch[2]);
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
			

			// Stores values that even listeners will need 
			thumb._input = sliderFields[i];
			thumb._from = from;
			thumb._to = to;
			thumb._scale = scale;
			// 
			// // caputures input typed directly into text field
			sliderFields[i]._thumb = thumb;

			// //now add previously created DOM elements to the DOM
			// var container = document.getElementsByClassName('container');
			document.body.appendChild(slider);
			slider.appendChild(track);
			slider.appendChild(thumb);
			sliderFields[i].parentNode.replaceChild(slider, sliderFields[i]);
			slider.appendChild(sliderFields[i]);
			
			// lastly, position the thumb handle by adjusting it's 'left' property
			// var value = parseInt(sliderFields[i].value, 10);
			// console.log(value);
			// thumb.style.left = ((value - from) * scale) + "px";
		} //end for
	} // end function
} // end slider

Slider.init();


