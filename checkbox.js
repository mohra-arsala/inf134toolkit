var CheckBox = function(draw) {
    var group = draw.group();
    
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

    function transition(){
        if (stateEvent != null) {
            stateEvent(defaultState);
            checkEvent(checkedState);
        }
    }
    return {
        /**
         * CHECK BOX: Sets the place of the Check Box.
         * @param  {int} x
         * @param  {int} y
         */
        move: function(x, y) {
            group.move(x, y);
        },
        /**
         *CHECK BOX: Assigns Check Box event handler that will be triggered
         on state change.
         * @param  {callback} eventHandler
         */
        stateChanged: function(eventHandler){
            stateEvent = eventHandler;
        },
        /**
         * CHECK BOX: Assigns Check Box event handler that will be triggered when
         * checked state is changed.
         * @param  {callback} eventHandler
         */
        checkedStateChanged: function(eventHandler){
            checkEvent = eventHandler;
        },

        // /**
        //  * BUTTON: Assigns event handler that will be triggerd on BUTTON click..
        //  * @param  {callback} eventHandler
        //  */
        // onclick: function(eventHandler){
        //     clickEvent = eventHandler
        // },
        
        /**
         * CHECK BOX: Set Check Box label.
         * @param  {string} label
         */
        setLabel: function(label) {
            var text = group.text(label);
            var x = rect.attr('x');
            var y = rect.attr('y');
            text.move(x+60, y+20).font({family: 'Helvetica'});
        },

        
        /**
         * CHECK BOX: Returns Check Box source.
         */
        src: function() {
            return rect;
        },
        /**
         * CHECK BOX: Returns Check Box id.
         * @param  {int} id
         */
        setId: function(id) {
            group.attr('id', id);
        }
}
}

export {CheckBox}