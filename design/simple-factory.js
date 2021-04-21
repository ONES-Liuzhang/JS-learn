// 简单工厂模式
function simpleFactory(type) {
  switch (type) {
    case "alert":
      return new LoginAlert();
      break;
    case "confirm":
      return new LoginConfirm();
      break;
  }
}

function LoginAlert() {}
loginAlert.prototype.show = function (msg) {};

function LoginConfirm() {}
loginConfirm.prototype.show = function (msg) {};
