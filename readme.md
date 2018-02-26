# redux-nano [![Build Status](https://travis-ci.org/ajoslin/redux-nano.svg?branch=master)](https://travis-ci.org/ajoslin/redux-nano)

> Tiny redux abstraction

## Install

```
$ npm install --save redux-nano
```


## Usage

```js
var { createAction, createActions, createReducer } = require('redux-nano')

var ACTION1 = createAction('ACTION1')

ACTION1(123) // => {type: 'ACTION1', payload: 123}
ACTION1.toString() // => ACTION1

var more = createActions('PREFIX', {
  ACTION2: true,
  ACTION3: true
})

more.ACTION2('sup', 'meta value')
// => {type: 'PREFIX/ACTION2', payload: 'sup', meta: 'meta value'}

more.ACTION2.toString() // => 'PREFIX/ACTION2'

var reducer = createReducer(initialState, {
  [more.ACTION2]: (state, action) => {
    state.value = action.payload
    return state
  })
})
```

## API

#### `createAction(type, payloadCreator, metaCreator)` -> `function actionCreator`

Creates a function action creator that is also a string constant.

* `type (string)`: The action's type
* `payloadCreator (function, optional)`: Optionally transform the payload before it's passed to the reducer.
* `metaCreator (any, optional)`): Create `action.meta`. If this is a function, it will be passed the arguments passed to the action creator. Otherwise, it will be treated as a constant value for `action.meta`.

#### `createActions(prefix, actions)` -> `Object<type, actionCreator>`

Creates a set of action creators with the given string prefix.

* `prefix (string)`: The prefix to give all actions. Will be followed by a `/`.
* `actions (object)`: The actions to create. The keys are action name strings, and the values can be booleans (indicates default payloadCreator/metaCreator) or objects. If each action is an object, it can contain value `payload` and `meta`. Example:
  ```js
  createActions('PREFIX', {
    BASIC: true,
    ADVANCED: {
      payload: n => n * 2,
      meta: 'someMeta'
    }
  })
  ```

#### `createReducer(defaultState, definition)` -> `function reducer`

Creates a reducer based upon passed in definition.

* `defaultState (any)`: The default state for this reducer. Must be defined.
* `definition (object)`: An object. Keys are action constants, values are reducer functions.

## License

MIT © [Andrew Joslin](http://ajoslin.com)
