# gamepad-api

[![node version](https://img.shields.io/node/v/gamepad-api.svg)](https://www.npmjs.com/package/gamepad-api)
[![npm version](https://badge.fury.io/js/gamepad-api.svg)](https://badge.fury.io/js/gamepad-api)
[![downloads count](https://img.shields.io/npm/dt/gamepad-api.svg)](https://www.npmjs.com/package/gamepad-api)
[![size](https://packagephobia.com/badge?p=gamepad-api)](https://packagephobia.com/result?p=gamepad-api)
[![license](https://img.shields.io/npm/l/gamepad-api.svg)](https://piecioshka.mit-license.org)

🔨 Used `Gamepad API` to setup wrapper for nicer usage.

## Preview 🎉

<https://piecioshka.github.io/gamepad-api/demo/>

## Install

```bash
npm install gamepad-api
```

## API

```javascript
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

More details in specification: https://www.w3.org/TR/gamepad/

![](https://w3c.github.io/gamepad/standard_gamepad.svg)

## Thanks

Thanks ben@daisyowl.com for https://html5gamepad.com/.

## License

[The MIT License](https://piecioshka.mit-license.org/)
