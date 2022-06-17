import { Node, Graph } from "@antv/x6";

export const createChildNode = (graph: Graph, { id, width, height = 24, x, y, label }): Node => {
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
    attrs: {
      body: {
        rx: 6,
        stroke: '#3199FF',
        fill: 'none',
        refWidth: 1,
        refHeight: 1,
      },
      label: {
        fontSize: 16,
        fontWeight: 600,
        'text-anchor': 'start',
        refX: 20
      }
    }
  })
}