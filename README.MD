# AfterResizeMe

### A Native JavaScript Event Library

Ever wanted to fire an event after a resize event has completed? Well now you can.

### How?

    window.addEventListener('afterresize', callback);

### That's it?

Yes.

### Optional Parameters

You can pass a delay to determine how quickly the callback should be fired after the resize event is completed. 

    window.addEventListener('afterresize', callback, {delay: 1000});


### Installation

    <script src='path/to/afterresize.min.js'></script>

### Test 

    npm run test