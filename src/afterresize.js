/* 
* @Author: ben_cripps
* @Date:   2015-08-30 13:29:35
* @Last Modified by:   ben_cripps
* @Last Modified time: 2015-08-30 14:29:20
*/

(function(){

    /* 
    * we aren't returning any object/functions because our only method
    * is exposed on the EventTarget prototype
    */

    // holding on to the native addEventListener because we'll need it
    var nativeEventListener = EventTarget.prototype.addEventListener,
        AfterResizer,
        afterResizer;

    AfterResizer = function(node, cb, options) {
        this.node = node;
        this.cb = cb;
        this.defaults = { delay: 250 };
        this.extend(options);
        this.init();
    };

    AfterResizer.prototype.debounce = function(cb, delay) {
        var timeout;

        return function(e) {
            clearTimeout(timeout);
            timeout = setTimeout(cb.bind(e, e), delay);
        };
    };

    AfterResizer.prototype.init = function() {
        this.node.addEventListener('resize', this.debounce(this.cb, this.defaults.delay));
    };

    AfterResizer.prototype.extend = function(options) {
        options = options || {};

        Object.keys(options).forEach(function(key){
            this.defaults[key] = options[key];
        }, this);
    };


    // begin magic
    EventTarget.prototype.addEventListener = function(eventName, cb, options) {
        
        // if our event matches, we call our custom event
        if (eventName === 'afterresize') {
            afterResizer = new AfterResizer(this, cb, options);
        }

        // else we just fire the native event
        else {
            nativeEventListener.apply(this, arguments);
        }
    };

})();