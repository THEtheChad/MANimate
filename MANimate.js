/**!
 * @preserve MANimate
 * Copyright 2011 THEtheChad Elliott
 * Released under the MIT and GPL licenses.
 */

// animate accepts a callback function that runs
// inside an AnimationFrame loop. Each loop
// walks over all animation callbacks given using
// this function.
//  
// @input function
//
// Example:
//      animate(function(){ return loopsUntilFalsy });
//
var animate = (function(w){

    // vendor specific animation frame identification
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

    // Returns our public API
    return function(func){
        // Add the callback to our queue
        // If the queue was empty before,
        // initiate the loop
        queue.push(func) == 1 && frame(loop);
    };
})(window);