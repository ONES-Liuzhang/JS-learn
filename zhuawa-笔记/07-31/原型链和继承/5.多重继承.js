function Game(name) {
  this.name = name;
}

Game.prototype.getName = function () {
  return this.name;
};

function Store() {
  this.shop = "steam";
}
Store.prototype.update = function () {
  console.log("store update");
};

function LoL() {
  Game.apply(this);
}
