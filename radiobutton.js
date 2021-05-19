var RadioButton = function(draw, n){
    var buttons = draw.group();
    var buttonArray = [];
    var stateEvent = null;
    var optionEvent = null;
    var defaultState = "idle";
    var lastButton;
    var selectedButton;

    for (let i = 1; i <= n; i++) {
        var newButton = buttons.circle(30, 30).fill('white').stroke('purple').move(2, 35*i);
        
        newButton.attr('id', i);
        buttonArray.push(newButton);
    }
    buttons.mouseover(function(event){
        lastButton = event.target.id;
        if (lastButton!="") {
            buttonArray[lastButton-1].fill({ color: 'gray'});
            defaultState = `hover${event.target.id}`;
            stateTransition();
        }
        
    });

    buttons.mouseout(function(event){
        if (defaultState.startsWith('hover') ) {
            if (selectedButton == lastButton) {
                buttonArray[lastButton-1].fill({color:'pink'});
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
            buttonArray[lastButton-1].fill({ color: 'pink'});
            if (selectedButton != lastButton) {
                
                if (selectedButton != null) {
                    buttonArray[selectedButton-1].fill({color: 'white'});

                }
                selectedButton = lastButton;

                optionTransition();
                
                }
                defaultState = "up";
                stateTransition();
        }
        
    })

    buttons.mousedown(function(){
        if (lastButton!="") {
            buttonArray[lastButton-1].fill({ color: 'purple'});
            defaultState = "pressed";
            stateTransition(); 
        }
        
    })

    function stateTransition(){
        if (stateEvent != null) {
            stateEvent(defaultState);
        }
    }

    function optionTransition(){
        if (optionEvent != null) {
            optionEvent(selectedButton);
        }
    }
    return {
        /**
         * Sets position of Radio Buttons.
         * @param  {int} x
         * @param  {int} y
         */
        move: function(x,y) {
            buttons.move(x,y);
            console.log(buttons.x(), buttons.y())
        },
        
        /**
         * Returns Radio Button source.
         */
        src: function(){
            return buttons;
        },
        
        /**
         * Assigns Radio Button eventhandler that will be triggered on state change.
         * @param  {callback} eventHandler
         */
        stateChanged: function(eventHandler){
            stateEvent = eventHandler;
        },
        
        /**
         * Assigns Radio Button eventhandler that will be triggered on option change.
         * @param  {callback} eventHandler
         */
        optionChanged: function(eventHandler){
            optionEvent = eventHandler;
        },
        
        /**
         * Sets the label for the appropriate Radio Button based on index (plus one).
         * @param  {int} buttonNumber: starting at 1
         * @param  {string} label: button label
         */
        setLabel: function(buttonNumber, label){
            var text = buttons.text(label);
            var x = buttonArray[buttonNumber-1].x();
            var y = buttonArray[buttonNumber-1].y();
            text.move(x+40, y+8).font({family: 'Helvetica'});
        }
    }
}

export {RadioButton};