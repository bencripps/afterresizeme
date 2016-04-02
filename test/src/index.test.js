describe('After Resize Library', function() {

    var DEFAULT_TIMEOUT = 250;

    var dispatchEvent = function() {
        window.dispatchEvent(new Event('resize'));
    };

    var addEvent = function(callback, delay) {
        window.addEventListener('afterresize', callback, {delay: delay});
    };

    it('Should not degrade native events', function() {
        var callback = sinon.spy();
        addEvent(callback, 200);

        expect(document.addEventListener).toBeDefined();
    });

    it('Should not fire if no event has occurred', function() {
        var callback = sinon.spy();
        addEvent(callback, 200);
        expect(callback.called).toBe(false);
    });


    it('Should fire an event if the event is triggered after the correct delay', function(){
        var DELAY = 200;
        var callback = sinon.spy();
        addEvent(callback, DELAY);

        dispatchEvent();

        expect(callback.called).toBe(false);

        setTimeout(function() {
            expect(callback.called).toBe(true);
        }, DELAY)
    });

    it('Should fire an event if no timeout is provided', function(){
        var callback = sinon.spy();
        addEvent(callback, null);
        dispatchEvent();

        expect(callback.called).toBe(false);

        setTimeout(function() {
            expect(callback.called).toBe(true);
        }, DEFAULT_TIMEOUT)
    });

    it('Should fire number of times its called, not more, not less', function(){
        var count = 0;
        var callback = function() {
            count++;
        };

        addEvent(callback, 1);

        for (var i = 0; i < 10; i++) {
            dispatchEvent();
        }

        expect(count).toEqual(0);

        setTimeout(function() {
             expect(count).toEqual(1);
        }, DEFAULT_TIMEOUT)
    });

});
