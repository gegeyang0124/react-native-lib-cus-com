# react-native-smart-timer-enhance

[![npm](https://img.shields.io/npm/v/react-native-smart-timer-enhance.svg)](https://www.npmjs.com/package/react-native-smart-timer-enhance)
[![npm](https://img.shields.io/npm/dm/react-native-smart-timer-enhance.svg)](https://www.npmjs.com/package/react-native-smart-timer-enhance)
[![npm](https://img.shields.io/npm/dt/react-native-smart-timer-enhance.svg)](https://www.npmjs.com/package/react-native-smart-timer-enhance)
[![npm](https://img.shields.io/npm/l/react-native-smart-timer-enhance.svg)](https://github.com/react-native-component/react-native-smart-timer-enhance/blob/master/LICENSE)

A TimerEnhance for React Native app (es6) which replaced TimerMixin (es5) provides timer functions for executing code in the future that are safely cleaned up when the component unmounts

Inspired by [react-timer-mixin][0]

## Installation

```
npm install react-native-smart-timer-enhance --save
```

## Full Demo

see [ReactNativeComponentDemos][1]

## Usage

Install the TimerEnhance from npm with `npm install react-native-smart-timer-enhance --save`.
Then, require it from your app's JavaScript files with `import TimerEnhance from 'react-native-smart-timer-enhance'`.

```js
import React, {
    Component,
} from 'react'

import TimerEnhance from 'react-native-smart-timer-enhance'

class TimerEnhanceDemo extends Component {

    componentDidMount() {
        this.setTimeout(() => {
            console.log('setTimeout do not leak!');
        }, 3000);
        this.setInterval( () => {
            console.log('setInterval do not leak!');
        }, 1000)
        this.requestAnimationFrame(this._raf)
    }

    render() {
        return null
    }

    _raf = (...p) => {
        console.log('requestAnimationFrame do not leak!');
        this.requestAnimationFrame(this._raf)
    }
}

export default TimerEnhance(TimerEnhanceDemo)
```

[0]: https://github.com/reactjs/react-timer-mixin
[1]: https://github.com/cyqresig/ReactNativeComponentDemos
