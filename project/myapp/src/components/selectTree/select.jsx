const SelectTreeProps = {
  value: [String | Number],
  list: Array,
  defaultProps: Object,
  showCheckbox: Boolean,
  nodeKey: String,
  emptyText: String,
  remoteMethod: Function,
  transform: Function,
  placeholder: {
    type: String,
    default: "请选择",
  },
  virtual: Boolean,
};

const SelectTree = {
  props: SelectTreeProps,
  data() {
    return {};
  },
  mounted() {},
  render() {
    return (
      <div class="t-select">
        <div class="t-select__selector">
          <span class="t-select__selector-search">
            <input />
          </span>
          <span class="t-select__selector-placeholder">{this.placeholder}</span>
        </div>
      </div>
    );
  },
};

export default SelectTree;
