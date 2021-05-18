// File name: mytoolkit.js

import {SVG} from './svg.min.js';

var MyToolkit = (function() {
    var Button = function(draw){
        var state = "idle";
        // var draw = SVG().addTo('body').size('100%','100%');
        var group = draw.group();
        
        var rect = group.rect(100,50).fill('red')
        var stateEvent = null;
        var clickEvent = null;
        var defaultState = "idle";

        rect.mouseover(function(){
            this.fill({ color: 'blue'});
            defaultState = "hover";
            transition();
        })
        rect.mouseout(function(){
            this.fill({ color: 'red'});
            defaultState = "idle";
            transition();
        })
        rect.mouseup(function(){
            this.fill({ color: 'red'});
            if (defaultState == "pressed") {
                if (clickEvent != null) {
                    clickEvent(event)
                }
            }
            defaultState = "up";
            transition();
        })

        rect.mousedown(function(){
            this.fill({ color: 'orange'});
            defaultState = "pressed";
            transition();
        })

        rect.mousemove(function(event) {
            
        })
        // rect.click(function(event){
        //     if (defaultState == 'unchecked') {
                
        //     }
        //     this.fill({ color: 'pink'})
        //     if(clickEvent != null)
        //         clickEvent(event)
        // })

        function transition(){
            if (stateEvent != null) {
                stateEvent(defaultState);
            }
        }
        return {
            /**
             * Sets the place of the Button.
             * @param  {int} x
             * @param  {int} y
             */
            move: function(x, y) {
                rect.move(x, y);
            },

            stateChanged: function(eventHandler){
                stateEvent = eventHandler;
            },

            /**
             * Executes callback event on Button click.
             * @param  {callback} eventHandler
             */
            onclick: function(eventHandler){
                clickEvent = eventHandler
            },
            
            /**
             * Set Button label.
             * @param  {string} label
             */
            setLabel: function(label) {
                var text = group.text(label);
                var x = rect.attr('x');
                var y = rect.attr('y');
                text.move(x+15, y+20).font({family: 'Helvetica'});
            },

            src: function() {
                return rect;
            },

            setId: function(id) {
                group.attr('id', id);
            }
    }
    }

    var CheckBox = function(draw) {
        // var draw = SVG().addTo('body').size('100%', '100%');
        var group = draw.group();
        
        // var rect = group.rect(100,50).fill('red')
        var rect = group.rect(50, 50).fill('purple');
        var check = group.rect(30, 30).fill('purple');
        check.move(rect.attr('x')+10, rect.attr('y')+10);
        var stateEvent = null;
        var checkEvent = null;
        var clickEvent = null;
        var checkedState = "unchecked";
        var defaultState = "idle";

        group.mouseover(function(){
            rect.fill({ color: 'blue'});
            defaultState = "hover";
            transition();
        })
        group.mouseout(function(){
            rect.fill({ color: 'purple'});
            defaultState = "idle";
            transition();
        })
        group.mouseup(function(){
            // this.fill({ color: 'pink'});
            if (defaultState == "pressed") {
                if (checkedState != 'checked') {
                    check.fill({color: 'pink'});
                    checkedState = 'checked';
                }
                else {
                    check.fill({color: 'purple'});
                    checkedState = 'unchecked';
                }
                if (clickEvent != null) {
                    clickEvent(event)
                }
            }
            defaultState = "up";
            transition();
        })

        group.mousedown(function(){
            check.fill({ color: 'pink'});
            defaultState = "pressed";
            transition();
        })

        rect.mousemove(function(event) {
            
        })
        // group.click(function(event){
        //     if (checkedState != 'checked') {
        //         check.fill({color: 'pink'});
        //         if (clickEvent != null) {
        //             clickEvent(event);
        //         }
        //         checkedState = 'checked';
        //     }
        //     else{
        //         check.fill({color: 'purple'});
        //         checkedState = 'unchecked';
        //     }
        //     transition();
        
        //     // this.fill({ color: 'pink'})
        //     // if(clickEvent != null)
        //     //     clickEvent(event)
        // })

        function transition(){
            if (stateEvent != null) {
                stateEvent(defaultState);
                checkEvent(checkedState);
            }
        }
        return {
            /**
             * Sets the place of the Button.
             * @param  {int} x
             * @param  {int} y
             */
            move: function(x, y) {
                group.move(x, y);
            },

            stateChanged: function(eventHandler){
                stateEvent = eventHandler;
            },

            checkedStateChanged: function(eventHandler){
                checkEvent = eventHandler;
            },

            /**
             * Executes callback event on Button click.
             * @param  {callback} eventHandler
             */
            onclick: function(eventHandler){
                clickEvent = eventHandler
            },
            
            /**
             * Set Button label.
             * @param  {string} label
             */
            setLabel: function(label) {
                var text = group.text(label);
                var x = rect.attr('x');
                var y = rect.attr('y');
                text.move(x+60, y+20).font({family: 'Helvetica'});
            },

            src: function() {
                return rect;
            },

            setId: function(id) {
                group.attr('id', id);
            }
    }
}

    var RadioButton = function(draw, n){
        // var draw = SVG().addTo('body').size('100%','100%');
        var buttons = draw.group();
        var buttonArray = [];
        var stateEvent = null;
        var clickEvent = null;
        var optionEvent = null;
        var defaultState = "idle";
        var lastButton;
        var selectedButton;

        for (let i = 1; i <= n; i++) {
            var newButton = buttons.circle(30, 30).fill('white').stroke('blue').move(2, 35*i);
            
            newButton.attr('id', i);
            buttonArray.push(newButton);
        }
        buttons.mouseover(function(event){
            // console.log(event.target.id);
            // defaultState = 'hover'+event.target.id;
            lastButton = event.target.id;
            if (lastButton!="") {
                buttonArray[lastButton-1].fill({ color: 'blue'});
                defaultState = `hover${event.target.id}`;
                stateTransition();
            }
            
        });

        buttons.mouseout(function(event){
            if (defaultState.startsWith('hover') ) {
                if (selectedButton == lastButton) {
                    buttonArray[lastButton-1].fill({color:'gray'});
                }
                else{
                    buttonArray[lastButton-1].fill({color:'white'});
                }
            }
            defaultState = 'idle';
                stateTransition();
        });

        buttons.mouseup(function(){
            
            if (lastButton!="" ) {
                buttonArray[lastButton-1].fill({ color: 'gray'});
                if (selectedButton != lastButton) {
                    
                    if (selectedButton != null) {
                        buttonArray[selectedButton-1].fill({color: 'white'});

                    }
                    selectedButton = lastButton;
                    // if (defaultState == "pressed") {
                    //     if (clickEvent != null) {
                    //         clickEvent(event)
                    //     }
                    // }
                    optionTransition();
                    
                    }
                    defaultState = "up";
                    stateTransition();
            }
            
        })

        buttons.mousedown(function(){
            if (lastButton!="") {
                buttonArray[lastButton-1].fill({ color: 'pink'});
                defaultState = "pressed";
                stateTransition(); 
            }
            
        })

        function stateTransition(){
            if (stateEvent != null) {
                stateEvent(defaultState);
                // optionEvent(selectedButton);
            }
        }

        function optionTransition(){
            if (optionEvent != null) {
                optionEvent(selectedButton);
            }
        }
        return {
            move: function(x,y) {
                buttons.move(x,y);
                console.log(buttons.x(), buttons.y())
            },
            src: function(){
                return buttons;
            },
            stateChanged: function(eventHandler){
                stateEvent = eventHandler;
            },
            optionChanged: function(eventHandler){
                optionEvent = eventHandler;
            },
            
            setLabel: function(buttonNumber, label){
                // var text = buttons.text(label).move(100, 200);
                // // var text = group.text(label);
                // console.log(buttonArray[buttonNumber-1]);
                // var x = buttonArray[buttonNumber-1].attr('x');
                // console.log(x);
                // var y = buttonArray[buttonNumber-1].attr('y');
                // text.move(x+60, y+20).font({family: 'Helvetica'});
                console.log(buttons);
                var text = buttons.text(label);
                var x = buttonArray[buttonNumber-1].x();
                var y = buttonArray[buttonNumber-1].y();
                console.log(x,y);
                text.move(x+40, y+8).font({family: 'Helvetica'});
            }
        }
    }

    var TextBox = function(draw){
        // var draw = SVG().addTo('body').size('100%','100%');
        var textbox = draw.group();
        var rect = textbox.rect(200,30).fill('white').stroke('black');
        var text = textbox.text('hello').move(2,4);
        var caret = textbox.line(45, 2.5, 45, 25).stroke({width:1, color:'black'});
        return {
            move: function(x,y) {
                textbox.move(x,y);
            },
            src: function(){
                return textbox;
            }
        }
    }
return {Button, CheckBox, RadioButton, TextBox}
}());

export{MyToolkit}