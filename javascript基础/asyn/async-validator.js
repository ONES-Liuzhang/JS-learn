const noop = () => {};
const Schema = (function () {
  return function (descriptor) {
    this.descriptor = descriptor;
  };
})();

Schema.prototype = {
  validate(source, callback) {
    let keys = Object.keys(source);
    let series = {};
    let rules = this.descriptor;

    // 合并多个相同的field
    keys.forEach((key) => {
      let arr = rules[key];
      arr.forEach((rule) => {
        series[key] = series[key] || [];
        series.push({
          rule,
          validator: getValidator(rule),
          field: key,
          value: source[key],
        });
      });
    });

    return asyncMap(
      series,
      (data, onFulfilled) => {
        let rule = data.rule;
        rule.validator = data.validator;
        rule.field = data.field;
        let res;

        // 收集errors
        function cb(e = []) {
          if (!Array.isArray(e)) e = [e];
          onFulfilled(e);
        }

        if (rule.asyncValidator) {
          res = rule.asyncValidator(rule, data.value, cb);
        } else if (rule.validator) {
          res = rule.validator(rule, data.value, cb);
          cb();
        }
        if (res && res.then) {
          res.then(
            () => cb(),
            (e) => cb(e)
          );
        }
      },
      callback
    );
  },
};

// 考虑验证默认为异步并行
function asyncMap(objArr, func, callback) {
  let objArrKeys = Object.keys(objArr);
  let objArrLength = objArrKeys.length;
  let total = 0;
  let results = [];
  return new Promise((resolve, reject) => {
    function next(errors) {
      results.push.apply(results, errors);
      total++;
      if (objArrLength === total) {
        callback(errors);
        errors.length > 0 ? reject(errors) : resolve();
        console.log("validate验证完毕！");
      }
    }

    // 进行外层执行判断
    objArrKeys.forEach((field) => {
      asyncParallelArray(objArr[field], func, next);
    });
  });
}

function asyncParallelArray(arr, func, next) {
  let results = [];
  let total = 0;
  function count(errors) {
    results.push.apply(results, errors);
    total++;
    if (total === arr.length) {
      next(results);
    }
  }
  arr.forEach((a) => {
    func(a, count);
  });
}

function getValidator(rule) {
  // 伪代码，解析内置validator
  return rule.validator || noop;
}
