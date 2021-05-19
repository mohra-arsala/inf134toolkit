import {SVG} from './svg.min.js';

var TextBox = function(draw){
    var textbox = draw.group();
    var rect = textbox.rect(200,30).fill('white').stroke('black');
    var text = textbox.text('').move(2,4);
    var caret = textbox.rect(2, 15).move(10, 10).fill({color: 'white'});
    var runner = caret.animate().width(0);
    var defaultState = 'idle';
    var stateEvent = null;
    var textEvent = null;
    SVG.on(window, 'keyup', (event) => {
        if (defaultState != 'idle') {
            if (event.key == 'Backspace' && text.text().length>=1) {
                text.text(text.text().substring(0, text.text().length-1));
                caret.x(text.length()+textbox.x()+10);

            }
            if (event.key.length==1) {
                text.text(text.text() + event.key);
                caret.x(text.length()+textbox.x()+10);

            }
            textEvent(event.key);
        }
        
    
    
})
    runner.loop(1000, 1, 0);
    textbox.move(10, 10);
    textbox.mouseover(function(event){
        if (defaultState == 'idle') {
            defaultState = 'focus';
            caret.fill({color: 'black'});
        
            
        }
        else{
            defaultState = 'idle';
            caret.fill({color: 'white'});
        }
    transition();
    })

    textbox.mouseout(function(event){
        defaultState = 'idle';
        caret.fill({color: 'white'});
        transition();
    })
    
    function transition(){
        if (stateEvent != null) {
            stateEvent(defaultState)
        }
    }
    return {
        /**
         * Sets the position of the Text Box.
         * @param  {int} x
         * @param  {int} y
         */
        move: function(x,y) {
            textbox.move(x,y);
        },
        
        /**
         * Returns the source of the Text Box.
         */
        src: function(){
            return textbox;
        },
        
        /**
         * Assigns Text Box eventhandler that will be triggered on state change.
         * @param  {callback} eventHandler
         */
        stateChanged: function(eventHandler){
            stateEvent = eventHandler;
        },
        
        /**
         * Assigns Text Box eventhanlder that will be triggered on text change.
         * @param  {callback} eventHandler
         */
        textChanged: function(eventHandler){
            textEvent = eventHandler;
        },
        
        /**
         * Returns current Text Box text.
         */
        getText: function(){
            return text.text();
        }
    }
}

export {TextBox};