function LoginAlert(text) {
  this.content = text;
}

LoginAlert.prototype.show = function () {
  console.log("Alert show ", this.content);
};

function LoginConfirm(text) {
  this.content = text;
}

LoginConfirm.prototype.show = function () {
  console.log("Confirm show ", this.content);
};

function SimpleFactory(type) {
  switch (type) {
    case "alert":
      return LoginAlert;
    case "confirm":
      return LoginConfirm;
    default:
      return null;
  }
}
