class ParentClass {
  protected getType() {
    return "type";
  }

  protected root() {
    return "root";
  }
}

class ChildClass extends ParentClass {
  public run() {
    this.getType();
  }
}

class GrandSonClass extends ChildClass {
  aaa() {
    console.log(this.root());
  }
}
