var Button = function(draw){
    var group = draw.group();
    
    var rect = group.rect(100,50).fill('pink')
    var stateEvent = null;
    var clickEvent = null;
    var defaultState = "idle";

    rect.mouseover(function(){
        this.fill({ color: 'gray'});
        defaultState = "hover";
        transition();
    })
    rect.mouseout(function(){
        this.fill({ color: 'pink'});
        defaultState = "idle";
        transition();
    })
    rect.mouseup(function(){
        this.fill({ color: 'gray'});
        if (defaultState == "pressed") {
            if (clickEvent != null) {
                clickEvent(event)
            }
        }
        defaultState = "up";
        transition();
    })

    rect.mousedown(function(){
        this.fill({ color: 'purple'});
        defaultState = "pressed";
        transition();
    })


    function transition(){
        if (stateEvent != null) {
            stateEvent(defaultState);
        }
    }
    return {
        /**
         * BUTTON: Sets the place of the Button.
         * @param  {int} x
         * @param  {int} y
         */
        move: function(x, y) {
            rect.move(x, y);
        },
        /**
         * BUTTON: Assigns event handler that will be triggered on Button
         * state change.
         * @param  {callback} eventHandler
         */
        stateChanged: function(eventHandler){
            stateEvent = eventHandler;
        },

        /**
         * BUTTON: Assigns event handler that will be triggered on Button click.
         * @param  {callback} eventHandler
         */
        onclick: function(eventHandler){
            clickEvent = eventHandler
        },
        
        /**
         *BUTTON: Set Button label.
         * @param  {string} label
         */
        setLabel: function(label) {
            var text = group.text(label);
            var x = rect.attr('x');
            var y = rect.attr('y');
            text.move(x+15, y+20).font({family: 'Helvetica'});
        },
        /**
         * BUTTON: Returns button source
         */
        src: function() {
            return rect;
        },
        /**
         * BUTTON: Sets button id
         * @param  {int} id
         */
        setId: function(id) {
            group.attr('id', id);
        }
}
}

export{Button}