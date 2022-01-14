export let changeVal = () => {
  console.log("Es6 changeVal 第一次调用");
  changeVal = () => {
    console.log("Es6 changeVal 第二次调用");
  };
};
