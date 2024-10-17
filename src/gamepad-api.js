// # Gamepad
//
// ### _Service to handle Gamepad joysticks_.
//
// Example, how connect to *Gamepad API*.
// ```js
// Gamepad.on('joystick.left', function (params) {
//     console.log('move left joystick', params.direction);
// });
// ```
//
// ### _Connect your gamepad and go!_

'use strict';

// Outer reference to use and observe about emit events.
var Gamepad;

// Instance of interval, which scan about joysticks moves.
var waiting;

// Event management.
var EventEmitter = require('super-event-emitter');

// Check that browser support game pads.
var isSupportGamepad = Object.prototype.hasOwnProperty.call(window, 'GamepadEvent');

/**
 * Return from GamepadList active pad or null.
 *
 * @returns {Gamepad|null}
 */
function getActivePad() {
    var i;
    // Get information from browser, about connected game pads.
    var padlist = window.navigator.getGamepads();

    for (i = 0; i < Gamepad.MAX_PADS; ++i) {
        if (padlist[i] && padlist[i].connected) {
            return padlist[i];
        }
    }

    return null;
}

/**
 * Support arrows: UP, RIGHT, DOWN, LEFT.
 *
 * @param {Gamepad} pad
 */
function handleArrows(pad) {
    if (pad.buttons[4].pressed) {
        Gamepad.emit(Gamepad.EVENTS.ARROW_UP);
    }

    if (pad.buttons[5].pressed) {
        Gamepad.emit(Gamepad.EVENTS.ARROW_RIGHT);
    }

    if (pad.buttons[6].pressed) {
        Gamepad.emit(Gamepad.EVENTS.ARROW_DOWN);
    }

    if (pad.buttons[7].pressed) {
        Gamepad.emit(Gamepad.EVENTS.ARROW_LEFT);
    }
}

/**
 * Handle shapes: Triangle, Circle, Cross, Square.
 *
 * @param {Gamepad} pad
 */
function handleShapes(pad) {
    if (pad.buttons[12].pressed) {
        Gamepad.emit(Gamepad.EVENTS.SHAPE_TRIANGLE);
    }

    if (pad.buttons[13].pressed) {
        Gamepad.emit(Gamepad.EVENTS.SHAPE_CIRCLE);
    }

    if (pad.buttons[14].pressed) {
        Gamepad.emit(Gamepad.EVENTS.SHAPE_CROSS);
    }

    if (pad.buttons[15].pressed) {
        Gamepad.emit(Gamepad.EVENTS.SHAPE_SQUARE);
    }
}

/**
 * Handle special buttons: Select, Start, PS
 *
 * @param {Gamepad} pad
 */
function handleSpecial(pad) {
    if (pad.buttons[0].pressed) {
        Gamepad.emit(Gamepad.EVENTS.SPECIAL_SELECT);
    }

    if (pad.buttons[3].pressed) {
        Gamepad.emit(Gamepad.EVENTS.SPECIAL_START);
    }

    if (pad.buttons[16].pressed) {
        Gamepad.emit(Gamepad.EVENTS.SPECIAL_PS);
    }
}

/**
 * Handle extras buttons: L1, L2, R1, R2
 *
 * @param {Gamepad} pad
 */
function handleExtras(pad) {
    if (pad.buttons[10].pressed) {
        Gamepad.emit(Gamepad.EVENTS.EXTRA_L1);
    }

    if (pad.buttons[8].pressed) {
        Gamepad.emit(Gamepad.EVENTS.EXTRA_L2);
    }

    if (pad.buttons[11].pressed) {
        Gamepad.emit(Gamepad.EVENTS.EXTRA_R1);
    }

    if (pad.buttons[9].pressed) {
        Gamepad.emit(Gamepad.EVENTS.EXTRA_R2);
    }
}

/**
 * Analyze game pad axes, and emit event.
 *
 * @param {Gamepad} pad
 */
function handleJoysticks(pad) {
    var leftStatuses = [];
    var rightStatuses = [];
    var len = pad.axes.length;

    // Warning!
    // Windows 8 (Chrome) - right joystick (up / down) is 6th value in array `pad.axes`
    // Mac OS X (Firefox) - right joystick (up / down) is 4th value.

    var left = {
        right: (pad.axes[0] === 1),
        left: (pad.axes[0] === -1),
        down: (pad.axes[1] === 1),
        up: (pad.axes[1] === -1)
    };
    var right = {
        right: (pad.axes[2] === 1),
        left: (pad.axes[2] === -1),
        down: (pad.axes[len - 1] === 1),
        up: (pad.axes[len - 1] === -1)
    };

    // Check activity of left joystick
    Object.keys(left).forEach(function (dir) {
        leftStatuses.push(left[dir]);
    });

    // If any direction was choose emit event.
    if (leftStatuses.indexOf(true) !== -1) {
        Gamepad.emit(Gamepad.EVENTS.JOYSTICK_LEFT, left);
    }

    // Check activity of right joystick
    Object.keys(right).forEach(function (dir) {
        rightStatuses.push(right[dir]);
    });

    // If any direction was choose emit event.
    if (rightStatuses.indexOf(true) !== -1) {
        Gamepad.emit(Gamepad.EVENTS.JOYSTICK_RIGHT, right);
    }
}

// Handle game pad actions.
function update() {
    // Get active pad.
    var activePad = getActivePad();

    // If any active do nothing.
    if (!activePad) {
        return;
    }

    handleJoysticks(activePad);
    handleArrows(activePad);
    handleShapes(activePad);
    handleSpecial(activePad);
    handleExtras(activePad);

    // Run as quick as browser can.
    // window.requestAnimationFrame(update, document.body);
    // window.requestAnimationFrame(update);
}

// Global API object.
Gamepad = {};

// Maximum number of connected pads.
Gamepad.MAX_PADS = 4;

Gamepad.EVENTS = {
    ARROW_UP: 'arrow:up',
    ARROW_RIGHT: 'arrow:right',
    ARROW_DOWN: 'arrow:down',
    ARROW_LEFT: 'arrow:left',

    SHAPE_TRIANGLE: 'shape:triangle',
    SHAPE_CIRCLE: 'shape:circle',
    SHAPE_CROSS: 'shape:cross',
    SHAPE_SQUARE: 'shape:square',

    SPECIAL_SELECT: 'special:select',
    SPECIAL_START: 'special:start',
    SPECIAL_PS: 'special:ps',

    EXTRA_L1: 'extra:l1',
    EXTRA_L2: 'extra:l2',

    EXTRA_R1: 'extra:r1',
    EXTRA_R2: 'extra:r2',

    JOYSTICK_LEFT: 'joystick:left',
    JOYSTICK_RIGHT: 'joystick:right'
};

// Extend Gamepad of events.
EventEmitter.mixin(Gamepad);

if (isSupportGamepad) {
    window.addEventListener('gamepadconnected', function (evt) {
        // console.info('Gamepad: Connected: ', evt);
        console.info('Gamepad: Connected: ' + evt.gamepad.id);
        // window.requestAnimationFrame(update, document.body);
        waiting = window.setInterval(update, 180);
    });

    window.addEventListener('gamepaddisconnected', function (evt) {
        // console.info('Gamepad: Disconnected: ', evt);
        console.info('Gamepad: Disconnected: ' + evt.gamepad.id);
        // window.cancelRequestAnimationFrame(update);
        window.clearInterval(waiting);
    });
}

// Exports
module.exports = Gamepad;

// Update as quick as browser can.
// window.requestAnimationFrame(update, document.body);
// window.requestAnimationFrame(update);
