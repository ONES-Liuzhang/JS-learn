/* eslint-disable object-curly-newline */
import { Component, Vue, Emit, Watch } from 'vue-property-decorator'
import style from './index.module.less'
import go from 'gojs'
@Component
export default class Abc extends Vue {
  private mounted() {
    const $ = go.GraphObject.make // for conciseness in defining templates
    console.log($)
    const myDiagram = $(
      go.Diagram,
      'abc', // create a Diagram for the DIV HTML element
      {
        'undoManager.isEnabled': true, // enable Ctrl-Z to undo and Ctrl-Y to redo
      }
    )
    // define a simple Node template
    myDiagram.nodeTemplate = $(
      go.Node,
      'Auto', // the Shape will go around the TextBlock
      $(
        go.Shape,
        'RoundedRectangle',
        { strokeWidth: 0, fill: 'white' },
        // Shape.fill is bound to Node.data.color
        new go.Binding('fill', 'color')
      ),
      $(
        go.TextBlock,
        { margin: 8, font: 'bold 14px sans-serif', stroke: '#333' }, // Specify a margin to add some room around the text
        // TextBlock.text is bound to Node.data.key
        new go.Binding('text', 'key')
      )
    )
    myDiagram.model = new go.GraphLinksModel(
      [
        { key: 'Alpha', color: 'lightblue' },
        { key: 'Beta', color: 'orange' },
        { key: 'Gamma', color: 'lightgreen' },
        { key: 'Delta', color: 'pink' },
      ],
      [
        { from: 'Alpha', to: 'Beta' },
        { from: 'Alpha', to: 'Gamma' },
        { from: 'Beta', to: 'Beta' },
        { from: 'Gamma', to: 'Delta' },
        { from: 'Delta', to: 'Alpha' },
      ]
    )
  }
  private render() {
    return (
      <div class={style.box}>
        <div class={style.item} id="abc"></div>
      </div>
    )
  }
}
