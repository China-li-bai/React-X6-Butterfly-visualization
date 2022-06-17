import { Cell, Graph, Path, Node } from "@antv/x6";
import React from 'react';
import Hierarchy from '@antv/hierarchy'
import insertCss from 'insert-css'
import { HierarchyResult, MindMapData } from "./interface";
import { data } from "./mock/data";
import { topicOption } from "./nodes/TopicNode";
import { topicChildOption } from "./nodes/TopicChild";
import { MindMapEdge } from "./nodes/MindEdge";
interface Props {

}

interface State {

}

export default class MindMap extends React.Component<Props, State> {
  private graphContainer!: HTMLDivElement;
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
    Graph.registerEdge('mindmap-edge', MindMapEdge, true)
  }
  componentDidMount() {

    const graph = new Graph({
      container: this.graphContainer,
      interacting: {
        nodeMovable: true
      },
      connecting: {
        connectionPoint: 'anchor',
      },
      selecting: {
        enabled: true,
      },
      keyboard: {
        enabled: true,
      },
    })
    const target2 = graph.createNode({
      x: 180,
      y: 10,
      width: 80,
      height: 40,
      label: "Child",
      zIndex: 100,
      attrs: {
        body: {
          fill: '#fff'
        },
        label: {
          fill: "#c74783"
        }
      }
    });
    const render = () => {
      const result: HierarchyResult = Hierarchy.mindmap(data, {
        direction: 'H',
        getHeight(d: MindMapData) {
          return d.height
        },
        getWidth(d: MindMapData) {
          return d.width
        },
        getHGap() {
          return 40
        },
        getVGap() {
          return 20
        },
        getSide: () => {
          return 'right'
        },
      })
      const cells: Cell[] = []
      cells.push(target2)

      const traverse = (hierarchyItem: HierarchyResult) => {


        if (hierarchyItem) {
          const { data, children } = hierarchyItem

          const node = graph.createNode({
            id: data.id,
            shape: data.type === 'topic-child' ? 'topic-child' : 'topic',
            x: hierarchyItem.x,
            y: hierarchyItem.y,
            width: data.width,
            height: data.height,
            label: data.label,
            type: data.type,
            zIndex: 1
          })

          if (node.id == '1') node.addChild(target2)
          cells.push(node)
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
      traverse(result)
      graph.resetCells(cells)//清空画布并添加用指定的节点/边。
      console.log("🚀 - file: index.tsx - line 163 - cells", cells)
      graph.centerContent()//将画布内容中心与视口中心对齐
    }
    const findItem = (
      obj: MindMapData,
      id: string,
    ): {
      parent: MindMapData | null
      node: MindMapData | null
    } | null => {
      if (obj.id === id) {
        return {
          parent: null,
          node: obj,
        }
      }
      const { children } = obj
      if (children) {
        for (let i = 0, len = children.length; i < len; i++) {
          const res = findItem(children[i], id)
          if (res) {
            return {
              parent: res.parent || obj,
              node: res.node,
            }
          }
        }
      }
      return null
    }
    const addChildNode = (id: string, type: NodeType) => {
      const res = findItem(data, id)
      const dataItem = res?.node
      if (dataItem) {
        let item: MindMapData | null = null
        const length = dataItem.children ? dataItem.children.length : 0
        if (type === 'topic') {
          item = {
            id: `${id}-${length + 1}`,
            type: 'topic-branch',
            label: `分支主题${length + 1}`,
            width: 100,
            height: 40,
          }
        } else if (type === 'topic-branch') {
          item = {
            id: `${id}-${length + 1}`,
            type: 'topic-child',
            label: `子主题${length + 1}`,
            width: 60,
            height: 30,
          }
        }
        if (item) {
          if (dataItem.children) {
            dataItem.children.push(item)
          } else {
            dataItem.children = [item]
          }
          return item
        }
      }
      return null
    }

    const removeNode = (id: string) => {
      const res = findItem(data, id)
      const dataItem = res?.parent
      if (dataItem && dataItem.children) {
        const { children } = dataItem
        const index = children.findIndex((item) => item.id === id)
        return children.splice(index, 1)
      }
      return null
    }

    graph.on('add:topic', ({ node }: { node: Node }) => {
      const { id } = node
      const type = node.prop('type')
      if (addChildNode(id, type)) {
        render()
      }
    })
    graph.bindKey(['backspace', 'delete'], () => {
      const selectedNodes = graph.getSelectedCells().filter((item) => item.isNode())
      if (selectedNodes.length) {
        const { id } = selectedNodes[0]
        if (removeNode(id)) {
          render()
        }
      }
    })

    graph.bindKey('tab', (e) => {
      e.preventDefault()
      const selectedNodes = graph.getSelectedCells().filter((item) => item.isNode())
      if (selectedNodes.length) {
        const node = selectedNodes[0]
        const type = node.prop('type')
        if (addChildNode(node.id, type)) {
          render()
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
    render()
  }
  private refContainer = (container: HTMLDivElement) => {
    this.graphContainer = container;
  };
  render() {
    return (<div>
      <div style={{ height: '80vh' }} ref={this.refContainer}></div>
    </div>);
  }
}
