var CustomSpinner = function(draw) {
    var spinner = draw.group();
    var btnDown = spinner.rect(40, 40).fill('pink').stroke('purple');
    var btnUp = spinner.rect(40, 40).fill('pink').stroke('purple').move(100, spinner.y());
    var numberSpot = spinner.rect(60, 40).fill('white').stroke('purple').move(40, spinner.y());
    var number = 0;
    var numberText = spinner.text(number.toString()).move(50, 10).font({family: 'Helvetica'});
    var downIcon = spinner.text('▼').move(10, 10);
    var upIcon = spinner.text('▲').move(110, 10);
    var defaultState = 'idle';
    var stateEvent = null;
    var valueChangeEvent = null;
    
    spinner.mouseover(function(){
        defaultState = 'hover';
        stateTransition();
    })

    spinner.mouseout(function(){
        defaultState = 'idle';
        stateTransition();
    })

    btnUp.mousedown(function(){
        defaultState = 'up pressed';
        this.fill({color: 'gray'});
        stateTransition();

    })
    
    btnUp.mouseup(function(){
        defaultState = 'up released';
        number++;
        numberText.text(number.toString());
        valueChangeNotify(number);
        this.fill({color: 'pink'});
        stateTransition();
        

    })

    btnDown.mousedown(function(){
        defaultState = 'down pressed';
        this.fill({color: 'gray'});
        stateTransition();
    })

    btnDown.mouseup(function(){
        defaultState = 'down released';
        number--;
        numberText.text(number.toString());
        valueChangeNotify(number);
        this.fill({color: 'pink'});
        stateTransition();
        
    })

    function stateTransition(){
        if (stateEvent != null) {
            stateEvent(defaultState);
        }
    }

    function valueChangeNotify(value) {
        if (valueChangeEvent != null) {
            valueChangeEvent(value);
        }
    }
    return{
        /**
         * Set the position of the Spinner.
         * @param  {int} x
         * @param  {int} y
         */
        move: function(x,y) {
            spinner.move(x,y);
        },
        /**
         * Return the source of the spinner
         */
        src: function(){
            return spinner;
        },
        /**
         * Assign a Spinner event handler that will be triggered on state change.
         * @param  {callback} eventHandler
         */
        stateChanged: function(eventHandler){
            stateEvent = eventHandler;
        },
        /**
         * Assign a Spinner event handler that will be triggered on value change.
         * @param  {callback} eventHandler
         */
        valueChanged: function(eventHandler){
            valueChangeEvent = eventHandler;
        },
        /**
         * Return the spinner value.
         */
        getValue: function(){
            return number;
        }

 
    }



}

export {CustomSpinner};