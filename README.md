### NodeGreenville Meetup Notes - 6/7/2016

# Goal

Demonstrate how to handle asynchronous code in JavaScript/Node.js by using callbacks, async.js and promises. The app is very simple. It is a Node/Express app generated from the [generator-express](https://github.com/petecoop/generator-express) generator and modified to allow posting photos and meta-data to MongoDB. The meta-data is generated from Google Places and Open Weather Map. The photos are saved to Cloudinary. The photos/posts are displayed on the root of the site.

# Branches

The `master` branch uses traditional callbacks to make all of the asynchronous calls. The `async` branch shows how the same code could be refactored to look a little nicer using the awesome library [async.js](https://github.com/caolan/async). The `promise` branch of course uses the same code from the `master` branch to demonstrate how the asynchronous calls could be refactored to use promises and more specifically the [Bluebird](https://github.com/petkaantonov/bluebird) module.

# Callback Function

Callbacks are the standard way to handle asynchronous operations in Node.js and if you are new to using them, they can be hard to manage. A callback function is a function that is passed to another that is to be executed when the previous function is finished executing. The problem usually starts when you need other asynchronous operations to return some values before you can go to the next asynchronous operation.

# Async.js

[Async.js](https://github.com/caolan/async) is collection utility modules that were created to help manage callback functions in Node.js. Since the module is just standard JavaScript, it can be used in the browser or any other platform that can run JavaScript. Some of most useful functions in the async.js library are `.series`, `.parallel`, `.waterfall`, and `.map`. According to their GitHub page "All these functions assume you follow the Node.js convention of providing a single callback as the last argument of your asynchronous function -- a callback which expects an Error as its first argument -- and calling the callback once.".

# Promises

According to [Mozilla Developer docs](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise), "A Promise represents an operation that hasn't completed yet, but is expected in the future.". Promises allow asynchronous methods to return values like synchronous methods (kind of...). Promises were introduced in ES2015 and since this version of JavaScript is still very new, we will be using a promise module called Bluebird. 

# Running

1. `git clone repo`
2. `npm install`
3. `mongod`
4. `npm start`
