import Button from './button';
import ButtonGroup from './button-group';
// const Button = () => import( /* webpackChunkName: "button" */ './button')
// const ButtonGroup = () => import( /* webpackChunkName: "button-group" */ './button-group')
Button.Group = ButtonGroup;

Button.install = (Vue) => {
  Vue.component(Button.name, Button)
  Vue.component(ButtonGroup.name, ButtonGroup)
}

export default Button
