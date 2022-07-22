const light = {
  state: "on",
  click() {
    if (this.state === 'on') {
      console.log('开关关闭')
      this.state = 'off'
    } else {
      console.log('开关打开')
      this.state = 'on'
    }
  }
}

class OffState {
  constructor(light) {
    this.light = light
  }

  click() {
    this.light.setState(this.light.onState)
  }
}

class OnState {
  constructor(light) {
    this.light = light
  }

  click() {
    this.light.setState(this.light.offState)
  }
}

class Light {
  constructor() {
    this.offState = new OffState(this)
    this.onState = new OnState(this)
  }

  setState(state) {
    this.currentState = state
  }

  click() {

  }
}
