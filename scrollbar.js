var ScrollBar = function(draw, y){
    var scrollbar = draw.group();
    var height = y;
    var rect = scrollbar.rect(20, height+40).fill('white').stroke('purple');
    var upArrow = scrollbar.rect(20, 20).fill('pink').stroke('purple');
    var downArrow = scrollbar.rect(20, 20).fill('pink').move(scrollbar.x(), height+40-20).stroke('purple');
    var bar = scrollbar.rect(20, 30).fill('gray').move(scrollbar.x(), 20).stroke('purple');
    var scrollPos = 0;
    var defaultState = 'idle';
    var stateEvent = null;
    var scrollEvent = null;

    scrollbar.mouseover(function(){
        defaultState = 'hover';
        stateTransition();
    })

    scrollbar.mouseout(function(){
        defaultState = 'idle';
        stateTransition();
    })
    upArrow.mousedown(function(){
        defaultState = 'up pressed';
        this.fill({color: 'purple'});
        stateTransition();


    })
    upArrow.mouseup(function(){
        defaultState = 'up released';
        if (scrollPos > 0) {
            scrollPos--;
            bar.y(bar.y()-1);
            scrollTransition('up');
        }
        this.fill({color: 'pink'});
        stateTransition();
        

    })

    downArrow.mousedown(function(){
        defaultState = 'down pressed';
        this.fill({color: 'purple'});
        stateTransition();
    })
    downArrow.mouseup(function(){
        defaultState = 'down released';
        if (scrollPos < height) {
            scrollPos++;
            bar.y(bar.y()+1);
            scrollTransition('down');
        }
        this.fill({color: 'pink'});
        stateTransition();
        
    })

    function stateTransition(){
        if (stateEvent != null) {
            stateEvent(defaultState);
        }
    }

    function scrollTransition(direction) {
        if (scrollEvent != null) {
            scrollEvent(direction);
        }
    }
    return{
        /**
         * Set the position of the Scroll Bar.
         * @param  {int} x
         * @param  {int} y
         */
        move: function(x,y) {
            scrollbar.move(x,y);
        },

        /**
         * Return the Scroll Bar source.
         */
        src: function(){
            return scrollbar;
        },
        
        /**
         * Assign a Scroll Bar event handler that is triggered
         * on state change.
         * @param  {callback} eventHandler
         */
        stateChanged: function(eventHandler){
            stateEvent = eventHandler;
        },
        /**
         * Assign a Scroll Bar event handler that is triggered
         * when the scroll position changes.
         * @param  {callback} eventHandler
         */
        scrollChanged: function(eventHandler){
            scrollEvent = eventHandler;
        },
        /**
         * Returns the scroll position.
         */
        getScrollPos: function(){
            return scrollPos;
        },
        /**
         * Sets the height of the scrollbar.
         * @param  {int} y: height
         */
        setHeight: function(y){
            height = y;
        }
}



}

export {ScrollBar};