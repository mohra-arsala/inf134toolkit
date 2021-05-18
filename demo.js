// File name: demo.js
import {SVG} from './svg.min.js';

import {MyToolkit} from './mytoolkit.js';

var draw = SVG().addTo('body').size(1000,1000);
// Implement a MyToolkit Button
var btn = new MyToolkit.Button(draw);
btn.move(100,100);
btn.setId('hi');
btn.setLabel('button');
btn.onclick(function(e){
	console.log(e);
});
btn.stateChanged(function(e){
	console.log(e);
})

var check = new MyToolkit.CheckBox(draw);
check.move(300, 100);
check.onclick(function(e){
	console.log(e);
	console.log(e.target)
});
check.stateChanged(function(e){
	console.log(e);
});

check.checkedStateChanged(function(e){
	console.log(e);
})
check.setLabel('hello checkbox');

var radio = new MyToolkit.RadioButton(draw, 3);
radio.move(500, 100);
radio.setLabel(1, 'radio 1');
radio.setLabel(2, 'radio 2');
radio.setLabel(3, 'radio 3');
radio.stateChanged(function(e){
	console.log(e);
});
radio.optionChanged(function(option){
	console.log(option);
})

var text = new MyToolkit.TextBox(draw);
text.move(700, 100);