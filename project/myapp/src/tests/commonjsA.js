let changeValCjs = () => {
  console.log("cjs changeVal 第一次调用");
  changeVal = () => {
    console.log("cjs changeVal 第二次调用");
  };
};

exports.changeValCjs = changeValCjs;
