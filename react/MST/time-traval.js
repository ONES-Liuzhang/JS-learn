const { applySnapshot, onSnapshot, types } = require("mobx-state-tree");

// 时间旅行
const states = [];
let currentFrame = -1;

const store = types
  .model({
    id: types.number,
  })
  .create({
    id: 1,
  });

onSnapshot(store, (snapshot) => {
  if (currentFrame === states.length - 1) {
    states.push(snapshot);
    currentFrame++;
  }
});

function prevFrame() {
  if (currentFrame === 0) return;

  applySnapshot(store, states[--currentFrame]);
}

function nextFrame() {
  if (currentFrame === states.length - 1) return;

  applySnapshot(store, states[++currentFrame]);
}
