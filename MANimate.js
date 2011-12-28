/**!
 * @preserve MANimate
 * Copyright 2011 THEtheChad Elliott
 * Released under the MIT and GPL licenses.
 */

// MANimate accepts a callback function that runs
// inside an AnimationFrame loop. Each loop
// walks over all MANimate callbacks.
//  
// @input function
//
// Example:
//      animate(function(){ return loopsUntilFalsy });
//
;(function(w){

    // Expose the public API
    w.MANimate = function(cb){
        // Add the callback to our queue
        // If the queue was empty before,
        // initiate the loop
        queue.push(cb) == 1 && frame(loop);
    };

    // vendor specific AnimationFrame identification
    // with setimeout fallback - Paul Irish
    var frame = w.requestAnimationFrame       || 
                w.webkitRequestAnimationFrame || 
                w.mozRequestAnimationFrame    || 
                w.oRequestAnimationFrame      || 
                w.msRequestAnimationFrame     || 
                function( callback ){
                    window.setTimeout(callback, 1000 / 60);
                },
        queue = [],
        loop = function(timestamp){
            var i = queue.length;

            // While there are callbacks to be performed
            while(i)
                // Execute callback and remove the callback
                // if there is a falsy response
                if(queue[--i](timestamp) == 0)
                    queue.splice(i, 1);
            
            // Continue the loop as long as there are callbacks
            // in the queue
            queue.length && frame(loop);
        };
        
})(window);