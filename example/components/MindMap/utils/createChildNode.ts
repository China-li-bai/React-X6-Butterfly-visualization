import { Node, Graph } from "@antv/x6";
import { nodeConfig } from "../config";

interface N {
  id: string,
  width: number,
  height: number,
  x,
  y,
  label,
  tColor?: string,
  hStroke?: string,
  isShowHLine?: boolean
}

export const createChildNode = (graph: Graph, node: N): Node => {
  const { id,
    width,
    height = nodeConfig.height,
    x,
    y,
    label,
    tColor,
    hStroke = '#f1f1f1',
    isShowHLine = false } = node
  return graph.createNode({
    id: id,
    x: x,
    y: y,
    width: width,
    height: height,
    label: label,
    zIndex: 10,
    data: {
      disableMove: false,
    },
    markup: [
      { tagName: 'rect', selector: 'body' },
      { tagName: 'text', selector: 'label' },
      { tagName: 'path', selector: 'hLine' },
    ],
    attrs: {
      body: {
        // // rx: 0,\
        stroke: 'none',
        fill: 'none',

        // // refWidth: 0.1,
        // // refHeight: 0.1,
      },
      label: {
        fontSize: 16,
        // fontWeight: 600,
        'text-anchor': 'start',
        refX: 3,
        fill: tColor
      },
      hLine: {
        refY: 1,
        d: `M 0 0 ${isShowHLine ? 0 : width - 4} 0`,
        stroke: hStroke,
        // strokeDasharray: '5 5',
      },
    }
  })
}