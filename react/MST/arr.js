const { types, getSnapshot, onSnapshot } = require("mobx-state-tree");

const StoreNode = types
  .model("StoreNode", {
    childIds: types.array(types.string, []),
  })
  .actions((self) => {
    function addChildId(id) {
      self.childIds.push(id);
    }

    function removeChildId(id) {
      // slice 无法触发 onSnapshot
      // const idx = self.childIds.indexOf(id);
      // if (~idx) return;
      // self.childIds.splice(idx, 1);

      // replace
      const childIds = self.childIds.filter((cid) => cid !== id);

      self.childIds.replace(childIds);
    }

    return {
      addChildId,
      removeChildId,
    };
  });

const store = StoreNode.create();

onSnapshot(store, (snapshot) => {
  console.log(snapshot.childIds);
});

store.addChildId("1");
store.addChildId("2");
store.addChildId("3");
store.removeChildId("3");
store.removeChildId("2");
store.removeChildId("1");
