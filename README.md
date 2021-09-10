![EventEmitter11](./poster.jpg)

# EventEmitter11

[![last commit](https://img.shields.io/github/last-commit/Rundik/EventEmitter11.svg)](https://github.com/Rundik/EventEmitter11/commits/master)
[![version](https://img.shields.io/npm/v/tiny-enc.svg)](https://www.npmjs.com/package/eventemitter11)
[![downloads](https://img.shields.io/npm/dm/tiny-enc.svg)](https://www.npmjs.com/package/eventemitter11)
[![license](https://img.shields.io/github/license/Rundik/EventEmitter11)](https://github.com/Rundik/EventEmitter11/blob/master/LICENSE)

Completely original EventEmmitter that isn't based on anything else

**Warning**: at this development stage it only supports node

## Usage

You should install it first

```bash
npm i eventemitter11
```

Then you can use it

```js
const Emitter = require('eventemitter11');
const emitter = new Emitter();

// Init listener
emitter.listen('my-original-event', (args) => {
  // do stuff
}, '10 minutes'); // TTL argument is optional

// Emit the event
emitter('my-original-event', 'hi');
```

## TODO

* Add browser support
* Implement ```once``` listener
* Copy the rest of EventEmitter2