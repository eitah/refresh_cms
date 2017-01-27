#!/usr/bin/env node
console.log('Now initiating refresh script');
node './src/refresh_cms';

exports.printMsg = function() {
    console.log("This is a message from the demo package");
}

// elijah says https://developer.atlassian.com/blog/2015/11/scripting-with-node/