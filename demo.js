// File name: demo.js
import {SVG} from './svg.min.js';

import {MyToolkit} from './mytoolkit.js';

var draw = SVG().addTo('body').size(2000,2000);
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
text.move(100, 200);
text.stateChanged(function(e){
	console.log(e);
});
text.textChanged(function(e){
	console.log(e);
});

var scroll = new MyToolkit.ScrollBar(draw, 200);
scroll.move(350, 200);
scroll.stateChanged(function(e){
	console.log(e);
});
scroll.scrollChanged(function(e){
	console.log(e);
});

var progress = new MyToolkit.ProgressBar(draw, 200, 10);
progress.move(450, 300);
progress.stateChanged(function(state){
	console.log(state);
});
progress.incrementChanged(function(){
	console.log('incremented!')
});
progress.increment(75);

var spinner = new MyToolkit.CustomSpinner(draw);
spinner.move(700, 100);
spinner.stateChanged(function(state){
	console.log(state);
});
spinner.valueChanged(function(value){
	console.log('value changed to', value);
})
