import Dropdown from './dropdown'
import DropdownButton from './dropdown-button'

// const Dropdown = import( /* webpackChunkName: "antdv/dropdown" */ './dropdown')
// const DropdownButton = import( /* webpackChunkName: "antdv/dropdown-button" */ './dropdown-button')

Dropdown.Button = DropdownButton

Dropdown.install = function(Vue) {
  Vue.component(Dropdown.name, Dropdown)
  Vue.component(DropdownButton.name, DropdownButton)
}

export default Dropdown
