describe('After Resize Library', function() {

    var callback,
        hasFired = false;

    beforeEach(function() {
      
        callback = function() {
            hasFired = true;
            console.log('event fired');
        };

        window.addEventListener('afterresize', callback, {delay: 200});
    });

    it('Should not degrade native events', function() {
        expect(document.addEventListener).toBeDefined();
    });

    it('Should not fire if no event has occurred', function(){
        expect(hasFired).toBe(false);
    });


});
