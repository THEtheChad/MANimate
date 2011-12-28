/**!
 * @preserve MANimate
 * Copyright 2011 THEtheChad Elliott
 * Released under the MIT and GPL licenses.
 */

var animate = (function(w){
    var frame = w.requestAnimationFrame       || 
                w.webkitRequestAnimationFrame || 
                w.mozRequestAnimationFrame    || 
                w.oRequestAnimationFrame      || 
                w.msRequestAnimationFrame     || 
                function( callback ){
                    window.setTimeout(callback, 1000 / 60);
                },
        queue = [],
        loop = function(){
            var i = queue.length;

            while(i)
                if(queue[--i]() == 0)
                    queue.splice(i, 1);
            
            queue.length && frame(loop);
        };

    return function(func){
        queue.push(func) == 1 && frame(loop);
    };
})(window);