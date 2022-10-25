// 继承

const { types, getSnapshot, getEnv } = require("mobx-state-tree");

const StoreNode = types
  .model("StoreNode", {
    name: "",
  })
  .actions((self) => {
    function test() {
      return getEnv(self);
    }

    function setName(newName) {
      self.name = newName;
    }

    return {
      setName,
      test,
    };
  });

// 继承并且增加属性
const OtherNode = StoreNode.named("OtherNode").props({
  title: types.optional(types.string, ""),
});

const store = OtherNode.create({});

store.setName("new name");

console.log(getSnapshot(store));

console.log(StoreNode.name);
console.log(store.test());
