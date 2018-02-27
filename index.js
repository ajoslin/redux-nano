exports.createAction = createAction
exports.createActions = createActions
exports.createReducer = createReducer

function createAction (type, payloadCreator, metaCreator) {
  function actionCreator (arg1, arg2) {
    var payload = payloadCreator ? payloadCreator.apply(null, arguments) : arg1
    var action = {
      type: type
    }
    if (payload !== undefined) action.payload = payload

    var meta
    if (metaCreator !== undefined) {
      meta = typeof metaCreator === 'function'
        ? metaCreator.apply(null, arguments)
        : metaCreator
    }
    if (meta !== undefined) action.meta = meta

    return action
  }

  actionCreator.toString = function () { return type }

  return actionCreator
}

function createActions (prefix, definition) {
  if (typeof prefix !== 'string') throw new Error('createActions: prefix must be string')
  if (typeof definition !== 'object') throw new Error('createActions: definition must be object with action name keys')

  return Object.keys(definition).reduce(function (acc, name) {
    var type = (prefix ? (prefix + '/') : '') + name
    var actionCreator = definition[name] || {}
    if (typeof actionCreator === 'function') {
      acc[name] = createAction(type, actionCreator)
    } else {
      acc[name] = createAction(type, actionCreator.payload, actionCreator.meta)
    }
    return acc
  }, {})
}

function createReducer (initialState, handlers) {
  if (typeof handlers !== 'object') throw new Error('createReducer: (initialState, handlers) must be passed in')
  return function reduce (state, action) {
    if (state === undefined) state = initialState
    var handler = handlers[action.type]
    return handler ? handler(state, action) : state
  }
}
