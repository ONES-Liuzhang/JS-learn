import Vue from 'vue'

const antdv = {
  // General
  // Base: require('./components/base').default,
  Icon: require('./components/icon').default,
  Button: require('./components/button').default,

  // Navigation
  Affix: require('./components/affix').default,
  Menu: require('./components/menu').default,
  Dropdown: require('./components/dropdown').default,
  Pagination: require('./components/pagination').default,

  // Data Entry
  Input: require('./components/input').default,
  InputNumber: require('./components/input-number').default,

  AutoComplete: require('./components/auto-complete').default,
  Checkbox: require('./components/checkbox').default,
  Tabs: require('./components/tabs').default,
  Switch: require('./components/switch').default,
  Select: require('./components/select').default,
  DatePicker: require('./components/date-picker').default,
  Form: require('./components/form').default,
  Radio: require('./components/radio').default,
  Upload: require('./components/upload').default,
  Transfer: require('./components/transfer').default,

  // Data Display
  // Carousel: require('./components/carousel').default,
  Tooltip: require('./components/tooltip').default,
  Table: require('./components/table').default,
  Badge: require('./components/badge').default,
  Card: require('./components/card').default,
  // Feedback
  message: require('./components/message').default,
  Modal: require('./components/modal').default,
  Spin: require('./components/spin').default,
  Tree: require('./components/tree').default,
  // Popover: require('./components/popover').default,
  // Navigation
  Steps: require('./components/steps').default,

  // Other
  Divider: require('./components/divider').default,
  ConfigProvider: require('./components/config-provider').default,

  Col: require('./components/col').default,
  Row: require('./components/row').default,
  // Grid: require('./components/grid').default,
  // Calendar: require('./components/calendar').default,

}

Object.values(antdv).forEach(component => {
  Vue.use(component)
})


export default antdv
