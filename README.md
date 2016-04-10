# Gamepad API

[![npm version](https://badge.fury.io/js/gamepad-api.svg)](https://badge.fury.io/js/gamepad-api)

> Used `Gamepad API` to setup wrapper for nicer usage.

## Install

```
npm install gamepad-api
```

## API

```js
Gamepad.on('SUPPORTED_EVENT', function () {
  // do something ...
});
```

### Supported events

 - Joysticks
     - `joystick:left` - when user use left joystick
     - `joystick:right` - when user use right joystick
 
 - Arrows
     - `arrow:up`
     - `arrow:right`
     - `arrow:down`
     - `arrow:left`
 
 - Shapes
     - `shape:triangle`
     - `shape:circle`
     - `shape:cross`
     - `shape:square`
 
 - Special
     - `special:select`
     - `special:start`
     - `special:ps`

 - Extras
     - `extra:l1`
     - `extra:l2`
     - `extra:r1`
     - `extra:r2`
     
## Gamepad API

More details in specification: http://www.w3.org/TR/gamepad/

![](https://w3c.github.io/gamepad/standard_gamepad.svg)

## Thanks 

Thanks ben@daisyowl.com for http://html5gamepad.com/.

## License

[The MIT License](http://piecioshka.mit-license.org/)
