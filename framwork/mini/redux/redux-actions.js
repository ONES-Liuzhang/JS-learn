const { createStore } = require('./redux')

/**
 * type -> payloadCreator
 * 
 * createActions({
 *  INCREMENT: (amount = 1) => ({ amount }),
 *  DECREMENT: (amount = 1) => ({ amount: -amount })
 * })
 *
 * 会生成下面的 actionCreators 👇👇👇
 *
 * actionCreators: {
 *   increment: (amount) => ({
 *      type: "INCREMENT",
 *      payload: { amount }
 *   }),
 *   decrement: () => ({
 *      type: "DECREMENT",
 *      payload: { amount: -amount }
 *   })
 * }
 *
 * 可以通过 dispatch 来触发：
 * dispatch(actionCreators.increment(3))
 * dispatch(actionCreators.decrement(3))
 *
 * 极简化版 createActions
 */
// ------------ redux-actions 核心原理 ----------------
function createActions(actionMap) {
  return arrayToObject(Object.keys(actionMap), (patialObject, type) => ({
    ...patialObject,
    [type.toLowerCase()]: createAction(type, actionMap[type])
  }));
}

function createAction(type, payloadCreator) {
  function actionCreator(...args) {
    return {
      type,
      payload: payloadCreator(...args),
    };
  }

  actionCreator.toString = () => type.toString()

  return actionCreator
}

/**
 * handleActions({
 *    [increment]: (state, { payload }) => ({ ...state, count: state.count + payload.count }),
 *    [decrement]: (state, { payload }) => ({ ...state, count: state.count + payload.count }),
 * }, {})
 */
function handleActions(handlers, defaultState) {
  // 把 reducerMap 转化为数组，通过闭包保存 reducer
  const reducers = Object.keys(handlers).map(type => {
    const types = type.toString().split("||")
    const reducer = handlers[type.toString()]

    return (state, action) => {
      if(~types.indexOf(action.type)) {
        // 🌰 'INCREMENT' 会命中 'INCREMENT || DECREMENT' 对应的 reducer
        return reducer(state, action)
      } else {
        return state
      }
    }
  })
  
  return (state = defaultState, action) => 
    reducers.reduce((prevState, reducer) => reducer(prevState, action), state)
}

function arrayToObject(array, callback) {
  return array.reduce((patialObject, curr) => callback(patialObject, curr), {});
}


// --------- TEST 代码测试 ----------
const { increment, decrement } = createActions({
  INCREMENT: (amount = 1) => ({ amount }),
  DECREMENT: (amount = 1) => ({ amount: -amount })
})

const reducer = handleActions({
  [increment]: (state, { payload: { amount } }) => ({...state, count: state.count += amount}),
  [decrement]: (state, { payload: { amount } }) => ({...state, count: state.count += amount}),
}, { count: 0 })

const store = createStore(reducer)
store.subscribe((state) => {
  console.log(`state change:`, state)
})

store.dispatch({
  type: "INCREMENT",
  payload: { amount: 3 }
})

store.dispatch({
  type: "DECREMENT",
  payload: { amount: 2 }
})

