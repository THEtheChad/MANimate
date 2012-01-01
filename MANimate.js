/**!
 * @preserve MANimate
 * Copyright 2011 THEtheChad Elliott
 * Released under the MIT and GPL licenses.
 */
 
(function(w){
    var frame = w.requestAnimationFrame       || 
                w.webkitRequestAnimationFrame || 
                w.mozRequestAnimationFrame    || 
                w.oRequestAnimationFrame      || 
                w.msRequestAnimationFrame     || 
                function(callback){
                    w.setTimeout(callback, 1000 / 60);
                },
        q = [],
        lastFrame,
        loop = function(timeStamp){
            var i = q.length,
                // date instance is a fallback for setTimeout
                thisFrame = timeStamp || +new Date(),
                deltaT = thisFrame - lastFrame;

            // Do not render frames if too much time has ellapsed
            if(deltaT < 160)
                // Loop through all of our animations
                while(i)
                    // If an animation returns falsy, remove it from the queue
                    if(q[--i](deltaT) == 0)
                        q.splice(i,1);
            
            // If there are still animations in the queue, continue to loop
            if(q.length){
                lastFrame = thisFrame;
                frame(loop);
            }
        };
    
    // public API
    // @input function( msBetweenFrames //integer )
    w.MANimate =  function(callback){
        // Add animation to the queue
        // If this is the first animation, kickstart the loop
        if(q.push(callback) == 1){
            lastFrame = +new Date();
            frame(loop);
        }
    };
})(window);