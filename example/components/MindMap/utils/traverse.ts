import { Cell } from "@antv/x6"
import { nodeConfig } from "../config"
import { HierarchyResult } from "../interface"
import { createChildNode } from "./createChildNode"
import { renderText } from "./helpers"

const traverse = (graph, hierarchyItem: HierarchyResult) => {

  const cells: Cell[] = []
  if (hierarchyItem) {
    const { data, children } = hierarchyItem

    const node = graph.createNode({
      id: data.id,
      shape: data.type === 'topic-child' ? 'topic-child' : 'topic',
      // shape: 'topic',
      x: hierarchyItem.x,
      y: hierarchyItem.y,
      width: data.width,
      height: data.height,
      label: typeof data.label == 'string' ? renderText(data.label) : null,
      type: data.type,
      zIndex: 1,
    })
    cells.push(node)
    if (typeof data.label === 'object') {
      console.log("🚀 - file: index.tsx - line 143 - data.label", data.label)
      Object.entries(data.label).forEach((x, i) => {
        const offsetX = x?.[0].length * 9
        const theColonW = 3
        const keyBox = createChildNode(graph, {
          id: data.id + '-key-' + x?.[0] + i,
          width: offsetX,
          x: hierarchyItem.x,
          y: hierarchyItem.y + nodeConfig.height * i,
          height: nodeConfig.height,
          label: x?.[0],
          isShowHLine: i == 0,
          tColor: '#2490f1',
          hStroke: '#404040'
        })
        const theColon = graph.createNode({
          x: hierarchyItem.x + offsetX + 3,
          y: hierarchyItem.y + nodeConfig.height * i,
          width: theColonW,
          height: nodeConfig.height,
          label: ` : `,
          attrs: {
            body: {
              fill: 'none',
              stroke: 'none',
            },
            label: {
              fill: '#fff'
            }
          }
        })
        const valBox = createChildNode(graph, {
          id: data.id + '-val-' + x?.[0] + i,
          width: data.width - offsetX,
          x: hierarchyItem.x + offsetX + theColonW + 3,
          y: hierarchyItem.y + nodeConfig.height * i,
          height: nodeConfig.height,
          label: x?.[1],
          isShowHLine: i == 0,
          tColor: '#23d18b',
          hStroke: '#404040'
        })

        // node.setChildren([keyBox])
        // node.setChildren([valBox])
        keyBox.setParent(node)
        keyBox.setParent(node)
        theColon.setParent(node)
        cells.push(keyBox)
        cells.push(valBox)
        cells.push(theColon)
      })
    }

    // const childNode = createChildNode(graph, {
    //   id: 'child' + data.id,
    //   width: data.width,
    //   x: hierarchyItem.x,
    //   y: hierarchyItem.y,
    //   height: nodeConfig.height,
    //   label: data.label + 'child',
    // })
    // cells.push(childNode)

    // node.addChild(childNode)
    if (children) {
      children.forEach((item: HierarchyResult) => {
        const { id, data } = item
        cells.push(
          graph.createEdge({
            shape: 'mindmap-edge',
            source: {
              cell: hierarchyItem.id,
              anchor:
                data.type === 'topic-child'
                  ? {
                    name: 'right',
                    args: {
                      dx: -16,
                    },
                  }
                  : {
                    name: 'center',
                    args: {
                      dx: '25%',
                    },
                  },
            },
            target: {
              cell: id,
              anchor: {
                name: 'left',
              },
            },
          }),
        )
        traverse(graph, item)
      })
    }
    return cells
  }
}
export { traverse }