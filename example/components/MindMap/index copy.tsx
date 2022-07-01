import { Cell, Graph, Path, Node } from "@antv/x6";
import React from 'react';
import Hierarchy from '@antv/hierarchy'
import insertCss from 'insert-css'
import { HierarchyResult, MindMapData } from "./interface";
import { data, objData } from "./mock/data";
import { topicOption } from "./nodes/topicOption";
import { topicChildOption } from "./nodes/topicChildOption";
import { MapEdgeOption } from "./nodes/MapEdgeOption";
import { createChildNode } from "./utils/createChildNode";
import disposalInterfaceData from "./utils/disposalInterfaceData";
import { parser } from "./utils/jsonEditorParse";
import { getEdgeNodes, Obj2Str, renderText, toString } from "./utils/helpers";
import hierarchyLayout from "./utils/HierarchyLayout";
import { nodeConfig } from "./config";
import { addChildNode, removeNode } from "./utils/sortingData";
interface Props {

}

interface State {

}

export default class MindMap extends React.Component<Props, State> {
  private graphContainer!: HTMLDivElement;
  private value: string
  //WARNING! To be deprecated in React v17. Use componentDidMount instead.
  componentWillMount() {
    insertCss(`
      .topic-image {
        visibility: hidden;
        cursor: pointer;
      }
      .x6-node:hover .topic-image {
        visibility: visible;
      }
      .x6-node-selected rect {
        stroke-width: 2px;
      }
    `)
    // 连接器
    Graph.registerConnector(
      'mindmap',
      (sourcePoint, targetPoint, routerPoints, options) => {
        const midX = sourcePoint.x + 10
        const midY = sourcePoint.y
        const ctrX = (targetPoint.x - midX) / 5 + midX
        const ctrY = targetPoint.y
        const pathData = `
     M ${sourcePoint.x} ${sourcePoint.y}
     L ${midX} ${midY}
     Q ${ctrX} ${ctrY} ${targetPoint.x} ${targetPoint.y}
    `
        return options.raw ? Path.parse(pathData) : pathData
      },
      true,
    )
    Graph.registerNode('topic', topicOption, true)
    Graph.registerNode('topic-child', topicChildOption, true)
    Graph.registerEdge('mindmap-edge', MapEdgeOption, true)
  }
  componentDidMount() {

    const graph = new Graph({
      container: this.graphContainer,
      connecting: {
        connectionPoint: 'anchor',
      },
      selecting: {
        enabled: true,
      },
      keyboard: {
        enabled: true,
      },
      // 控制画布整体平移
      panning: {
        enabled: true,
        eventTypes: ['leftMouseDown', 'mouseWheel'],
      },
      // 限制子节点时触发，只能在父节点移动
      translating: {
        restrict(view) {
          const cell = view.cell
          if (cell.isNode()) {
            const parent = cell.getParent()
            if (parent) {
              return parent.getBBox()
            }
          }

          return null
        }
      },
      // // 设置带有nodeMovable的节点不可拖动
      // interacting: function (cellView) {
      //   if (cellView.cell.getData() != undefined && !cellView.cell.getData().disableMove) {
      //     return { nodeMovable: false }
      //   }
      //   return true
      // },
      interacting: {
        nodeMovable: false
      }
    })
    const { mappedElements } = parser(objData)
    const renderJSON = () => {
      const cells: Cell[] = []
      const traverse = (hierarchyItem: HierarchyResult) => {


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
              traverse(item)
            })
          }
        }
      }
      const els = hierarchyLayout(mappedElements)
      traverse(els)
      graph.resetCells(cells)//清空画布并添加用指定的节点/边。
      console.log("🚀 - file: index.tsx - line 163 - cells", els, cells, mappedElements)
      graph.centerContent()//将画布内容中心与视口中心对齐
    }
    graph.on('add:topic', ({ node }: { node: Node }) => {
      const { id } = node
      const type = node.prop('type')
      if (addChildNode(mappedElements, id, type)) {
        renderJSON()
      }
    })
    graph.bindKey(['backspace', 'delete'], () => {
      const selectedNodes = graph.getSelectedCells().filter((item) => item.isNode())
      if (selectedNodes.length) {
        const { id } = selectedNodes[0]
        if (removeNode(mappedElements, id)) {
          renderJSON()
        }
      }
    })

    graph.bindKey('tab', (e) => {
      e.preventDefault()
      const selectedNodes = graph.getSelectedCells().filter((item) => item.isNode())
      if (selectedNodes.length) {
        const node = selectedNodes[0]
        const type = node.prop('type')
        if (addChildNode(mappedElements, node.id, type)) {
          renderJSON()
        }
      }
    })
    graph.on('cell:dblclick', ({ cell, e }) => {
      const isNode = cell.isNode()
      const name = cell.isNode() ? 'node-editor' : 'edge-editor'
      cell.removeTool(name)
      cell.addTools({
        name,
        args: {
          event: e,
          attrs: {
            backgroundColor: isNode ? '#EFF4FF' : '#FFF',
          },
        },
      })
      console.log(graph.toJSON())
    })

    renderJSON()
  }
  private refContainer = (container: HTMLDivElement) => {
    this.graphContainer = container;
  };
  render() {
    return (<div
      style={{
        width: '100%',
        height: 'calc(100vh - 36px)',
        position: 'relative'
      }}>
      <div style={{ height: 'calc(100vh - 36px)', }} ref={this.refContainer}></div>
    </div>);
  }
}
