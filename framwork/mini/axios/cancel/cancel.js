export default function Cancel(message) {
  this.message = message;
}

Cancel.prototype.toString = function toString() {
  return "Cancel " + this.message;
};

Cancel.prototype.__CANCEL__ = true;
