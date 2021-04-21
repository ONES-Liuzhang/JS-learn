// Project: https://github.com/vueComponent/ant-design-vue
// Definitions by: akki-jat <https://github.com/akki-jat>
// Definitions: https://github.com/vueComponent/ant-design-vue/types

type MessageInstance = Promise < any > | (() => void)


export interface MessageOptions {
  /**
   * content of the message
   * @type any (string | VNode | (h) => VNode)
   */
  content: any;

  /**
   * time(seconds) before auto-dismiss, don't dismiss if set to 0
   * @default 3
   * @type number
   */
  duration ? : number;

  /**
   * type of message
   * @type string
   */
  type ? : 'success' | 'info' | 'warning' | 'error' | 'loading';

  /**
   * Customized Icon
   * @type any  (string | VNode | (h) => VNode)
   */
  icon ? : any;

  /**
   * Specify a function that will be called when the message is closed
   * @type Function
   */
  onClose ? : () => void;
}

export interface MessageConfigOptions {
  /**
   * time before auto-dismiss, in seconds
   * @default 1.5
   * @type number
   */
  duration ? : number;

  /**
   * Return the mount node for Message
   * @default () => document.body
   * @type Function
   */
  getContainer ? : () => HTMLElement;

  /**
   * max message show, drop oldest if exceed limit
   * @type number
   */
  maxCount ? : number;

  /**
   * distance from top
   * @default '24px'
   * @type string
   */
  top ? : string;
}

export default class Message {
  success(content: any, duration ? : number, onClose ? : () => void): MessageInstance;
  warning(content: any, duration ? : number, onClose ? : () => void): MessageInstance;
  warn(content: any, duration ? : number, onClose ? : () => void): MessageInstance;
  info(content: any, duration ? : number, onClose ? : () => void): MessageInstance;
  error(content: any, duration ? : number, onClose ? : () => void): MessageInstance;
  loading(content: any, duration ? : number, onClose ? : () => void): MessageInstance;
  open: (config: MessageOptions) => MessageInstance;
  config: (options: MessageConfigOptions) => void;
  destroy: () => void;
}

declare module 'vue/types/vue' {
  interface Vue {
    $message: Message;
  }
}
