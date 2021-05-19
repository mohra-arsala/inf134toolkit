var ProgressBar = function(draw, width) {
    var progress = draw.group();
    var width = width;
    var scale = width/100;
    var incrementVal = 0;
    var barRect = progress.rect(width, 20).stroke('purple').fill('white');
    var progressRect = progress.rect(incrementVal, 20).stroke('purple').fill('pink');
    var defaultState = 'incomplete';
    var incrementEvent = null;
    var stateEvent = null;

    
    function progressIncremented(value) {
        if (incrementVal + (value*scale) < width) {
            incrementVal += (value*scale);
            progressRect.size(incrementVal, 20);
            incrementNotify();

        }
        else{
            incrementVal += (value*scale);
            progressRect.size(width, 20);
            defaultState = 'complete';
            incrementNotify();
            stateTransition();
        }
        
    }

    function incrementNotify() {
        if (incrementEvent != null) {
            incrementEvent();
        }
    }

    function stateTransition() {
        if (stateEvent != null) {
            stateEvent(defaultState);
        }
    }

    return{
        /**
         * Set progress bar position.
         * @param  {int} x
         * @param  {int} y
         */
        move: function(x,y) {
            progress.move(x,y);
        },
        /**
         * Return progress bar source.
         */
        src: function(){
            return scrollbar;
        },
        /**
         * Assigns a Progress Bar event handler that is triggered on state change.
         * @param  {callback} eventHandler
         */
        stateChanged: function(eventHandler){
            stateEvent = eventHandler;
        },
        /**
         * Assigns a Progress Bar event handler that is triggered when
         * the increment changes.
         * @param  {callback} eventHandler
         */
        incrementChanged: function(eventHandler){
            incrementEvent = eventHandler;
        },
        /**
         * Set the width of the Progress Bar.
         * @param  {int} newWidth
         */
        setWidth: function(newWidth){
            width = newWidth;
        },
        /**
         * Set the increment value of the Progress Bar.
         * @param  {int} value
         */
        setIncrementValue: function(value){
            incrementVal = value;
        },
        /**
         * Return the increment value of the Progress Bar.
         */
        getIncrementValue: function(){
            return incrementVal;
        },
        /**
         * Add value to the progress bar.
         * @param  {int} value: percentage value added to progress bar
         */
        increment: function(value){
            progressIncremented(value);

        }
    }


}

export {ProgressBar};