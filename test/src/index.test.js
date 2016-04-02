describe('After Resize Library', function() {

    var DEFAULT_TIMEOUT = 250;

    var dispatchEvent = function(type) {
        window.dispatchEvent(new Event(type));
    };

    var addEvent = function(type, callback, delay) {
        window.addEventListener('afterresize', callback, {delay: delay});
    };

    it('Should not degrade the native event object', function() {
        var callback = sinon.spy();
        addEvent('afterresize', callback, 200);

        expect(document.addEventListener).toBeDefined();
    });

    it('Should allow other events to fire as normal', function() {
        var callback = sinon.spy();
        addEvent('click', callback, 200);
        dispatchEvent('click');

        setTimeout(function() {
            expect(callback.called).toBe(true);
        }, 200);
    });

    it('Should not fire if no event has occurred', function() {
        var callback = sinon.spy();
        addEvent('afterresize', callback, 200);
        expect(callback.called).toBe(false);
    });


    it('Should fire an event if the event is triggered after the correct delay', function(){
        var DELAY = 200;
        var callback = sinon.spy();
        addEvent('afterresize', callback, DELAY);

        dispatchEvent('resize');

        expect(callback.called).toBe(false);

        setTimeout(function() {
            expect(callback.called).toBe(true);
        }, DELAY);
    });

    it('Should fire an event if no timeout is provided', function(){
        var callback = sinon.spy();
        addEvent('afterresize', callback, null);
        dispatchEvent('resize');

        expect(callback.called).toBe(false);

        setTimeout(function() {
            expect(callback.called).toBe(true);
        }, DEFAULT_TIMEOUT);
    });

    it('Should fire number of times its called, not more, not less', function(){
        var count = 0;
        var callback = function() {
            count++;
        };

        addEvent('afterresize', callback, 1);

        for (var i = 0; i < 10; i++) {
            dispatchEvent('resize');
        }

        expect(count).toEqual(0);

        setTimeout(function() {
             expect(count).toEqual(1);
        }, DEFAULT_TIMEOUT);
    });

});
