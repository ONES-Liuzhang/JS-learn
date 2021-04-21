import { Component, Vue, Emit, Watch } from 'vue-property-decorator'
import style from './icon.module.less'
import Arrow from '@/app/components/shape/arrow'
import TableSort from '@/app/components/shape/table-sort'
import RightTriangle from '@/app/components/shape/right-triangle'
import StageTag from '@/app/components/icon/state-tag'

@Component({})
class IconDemo extends Vue {
  private render() {
    return (
      <div class={style.box}>

        <div class="block">
          <h5 class="title">封装的svg</h5>
          <div>
            <div class={style.item}>
              <a-icon type="caret-down" />
              <a-icon type="caret-up" />
              <a-icon type="caret-left" />
              <a-icon type="caret-right" />
            </div>
            <div class={style.item}>
              <a-icon type="down" />
              <a-icon type="up" />
              <a-icon type="left" />
              <a-icon type="right" />
            </div>
            <div class={style.item}>
              <a-icon type="info" />
              <a-icon type="warning" />
              <a-icon type="error" />
              <a-icon type="success" />
            </div>
            <div class={style.item}>
              <a-icon type="dLeft" />
              <a-icon type="dRight" />
            </div>
            <a-icon type="loading" />
            <a-icon type="search" />
            <a-icon type="close" />


            <a-icon type="org" />
            <a-icon type="closelight" />
            <a-icon type="business" />
            <a-icon type="calendar1" />
            <a-icon type="clear" />
          </div>
        </div>

        <div class="block">
          <h5 class="title">自定义svg</h5>
          <div>

            {/* <a-icon component={require('svg/common/user.svg').default} />
            <a-icon component={require('svg/common/lock.svg').default} />
            <a-icon component={require('svg/mymenu/diversification.svg').default} />
            <a-icon component={require('svg/mymenu/money.svg').default} />
            <a-icon component={require('svg/mymenu/more2.svg').default} />
            <a-icon style={{ 'font-size': '60px' }} component={require('svg/mymenu/norepay.svg').default} />
            <a-icon component={require('svg/mymenu/nostandard.svg').default} />
            <a-icon component={require('svg/mymenu/option.svg').default} />
            <a-icon component={require('svg/mymenu/orginfo.svg').default} />
            <a-icon component={require('svg/mymenu/orgManage.svg').default} />
            <a-icon component={require('svg/mymenu/orgplan.svg').default} />
            <a-icon component={require('svg/mymenu/orgplanbak.svg').default} />
            <a-icon component={require('svg/mymenu/recipient .svg').default} />
            <a-icon component={require('svg/mymenu/recommend.svg').default} />
            <a-icon style={{ 'font-size': '45px' }} component={require('svg/mymenu/red_button.svg').default} />
            <a-icon component={require('svg/mymenu/risk.svg').default} />
            <a-icon component={require('svg/mymenu/riskasses.svg').default} />
            <a-icon component={require('svg/mymenu/subscribe2.svg').default} />
            <a-icon component={require('svg/mymenu/usermanage.svg').default} />
            <a-icon component={require('svg/mymenu/whitelist.svg').default} />
            <a-icon component={require('svg/mymenu/zhuanshuyanbao.svg').default} />
            <a-icon component={require('svg/mymenu/ziguan.svg').default} />
            <a-icon component={require('svg/het/shopcar.svg').default} />
            <a-icon component={require('svg/het/userhead.svg').default} />
            <a-icon component={require('svg/het/interest.svg').default} />
            <a-icon component={require('svg/het/closeeye.svg').default} />
            <a-icon component={require('svg/het/openeye.svg').default} /> */}
          </div>
        </div>
        <div class='block'>
          <StageTag title="待复核" color="#fc9"></StageTag>
          <StageTag title="通过" ></StageTag>
          <StageTag title="不通过" color='#FAB4B4'></StageTag>
          <StageTag title="自定义" w={100}></StageTag>
          <StageTag title="正常" ></StageTag>
          <StageTag title="已停用" color='#FAB4B4'></StageTag>
        </div>
        <div class="block">
          <h5 class="title">css 画的图标</h5>
          <div>
            {/* 表格的筛选图标 */}
            <TableSort></TableSort>
            <div class={style.pad}></div>
            {/*  card 的标签图标 */}
            <RightTriangle quadrant={1} bgc='#f03' class={style.pad} ></RightTriangle>
            <RightTriangle quadrant={2} style={{ marginRight: '10px' }}></RightTriangle>
            <RightTriangle quadrant={3} width={40} height={30} style={{ marginRight: '10px' }}></RightTriangle>
            <RightTriangle quadrant={4} style={{ marginRight: '10px' }}></RightTriangle>
          </div>
        </div>

        <div class="block clearfix">
          <div class={style.itemBox}>
            <Arrow></Arrow>
          </div>
          <div class={style.itemBox}>
            <Arrow direction="right"></Arrow>
          </div>
          <div class={style.itemBox}>
            <Arrow direction='up'></Arrow>
          </div>
          <div class={style.itemBox}>
            <Arrow direction="down"></Arrow>
          </div>
        </div>

      </div >
    )
  }
}

export default IconDemo
