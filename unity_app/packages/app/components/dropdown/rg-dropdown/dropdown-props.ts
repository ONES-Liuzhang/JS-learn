import { Prop, Vue } from 'vue-property-decorator'

export class DropdownProps extends Vue {
  @Prop({ type: Array, default: () => ['hover'] }) public trigger!: []
  @Prop() public overlay!: any
  @Prop() public visible!: boolean
  @Prop() public disabled!: boolean
  @Prop() public align!: object
  @Prop() public getPopupContainer!: Function
  @Prop() public prefixCls!: string
  @Prop() public transitionName!: string

  // 'topLeft',
  // 'topCenter',
  // 'topRight',
  // 'bottomLeft',
  // 'bottomCenter',
  // 'bottomRight',
  @Prop() public placement ? : string
  @Prop() public overlayClassName ? : string
  @Prop() public overlayStyle ? : object
  @Prop() public forceRender ? : boolean
  @Prop() public mouseEnterDelay ? : number
  @Prop() public mouseLeaveDelay ? : number
  @Prop() public openClassName ? : string
  @Prop() public minOverlayWidthMatchTrigger ? : string

}
