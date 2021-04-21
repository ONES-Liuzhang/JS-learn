// Project: https://github.com/vueComponent/ant-design-vue
// Definitions by: akki-jat <https://github.com/akki-jat>
// Definitions: https://github.com/vueComponent/ant-design-vue/types

import { AntdComponent } from '../component';


export declare class CheckboxGroup extends AntdComponent {
  /**
   * Default selected value
   * @type string[]
   */
  defaultValue: string[];

  /**
   * Disable all checkboxes
   * @default false
   * @type boolean
   */
  disabled: boolean;

  /**
   * Specifies options, you can customize `label` with slot = "label" slot-scope = "option"
   * @type Array<string | { label: string, value: string, disabled?: boolean, onChange?: Function }>
   */
  options: Array <
    string | { label: string;value: string;disabled ? : boolean;onChange ? : Function } >
  ;

  /**
   * Used for setting the currently selected value.
   * @type string[]
   */
  value: string[];
}


export default class Checkbox extends AntdComponent {
  static Group: typeof CheckboxGroup;

  /**
   * get focus when component mounted
   * @default false
   * @type boolean
   */
  autoFocus: boolean;

  /**
   * Specifies whether the checkbox is selected.
   * @default false
   * @type boolean
   */
  checked: boolean;

  /**
   * Specifies the initial state: whether or not the checkbox is selected.
   * @default false
   * @type boolean
   */
  defaultChecked: boolean;

  /**
   * Disable checkbox
   * @default false
   * @type boolean
   */
  disabled: boolean;

  /**
   * indeterminate checked state of checkbox
   * @default false
   * @type boolean
   */
  indeterminate: boolean;

  /**
   * remove focus
   */
  blur(): void;

  /**
   * get focus
   */
  focus(): void;
}
