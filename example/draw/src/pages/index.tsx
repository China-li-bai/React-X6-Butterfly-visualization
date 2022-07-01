import React, { useState, useEffect } from 'react'
import FlowGraph from './Graph'
import ToolBar from './components/ToolBar'
import '../reset.less'
import '../global.css'
import './index.less'
import { Cell } from '@antv/x6'
import { HierarchyResult } from '../../../components/MindMap/interface'
import { renderText } from '../../../components/MindMap/utils/helpers'
import { createChildNode } from '../../../components/MindMap/utils/createChildNode'
import { nodeConfig } from '../../../components/MindMap/config'
import hierarchyLayout from '../../../components/MindMap/utils/HierarchyLayout'
import { useConfig } from '../../../JsonMap/reducer'
import { parser } from '../../../components/MindMap/utils/jsonEditorParse'

const Draw = (props) => {
  const { isShowMinMap = false } = props
  const [graph, setGraph] = useState(null)
  const [isReady, setIsReady] = useState(false)
  const { json, dispatch } = useConfig()
  const { mappedElements } = parser(json)
  const renderJSON = (graph) => {
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
  const getContainerSize = () => {
    return {
      width: document.body.offsetWidth - 214,
      height: document.body.offsetHeight - 105,
    }
  }

  useEffect(() => {
    const graph = FlowGraph.init()
    setGraph(graph)
    setIsReady(() => true)
    const resizeFn = () => {
      const { width, height } = getContainerSize()
      graph.resize(width, height)
    }
    resizeFn()
    renderJSON(graph)
    window.addEventListener('resize', resizeFn)

    return () => {
      window.removeEventListener('resize', resizeFn)
    }
  }, [])
  useEffect(() => {
    console.log("🚀 - file: index.tsx - line 163 - isReady", isReady)

    if (isReady) renderJSON(graph)
  }, [json, isReady])
  return (
    <div className={'wrap'}>
      <div className={'toolbar'}>{isReady && <ToolBar />}</div>
      <div className={'content'}>
        {/* <div id="stencil" className={'shapes'}></div> */}
        <div id="container" className="x6-graph" />
        {isShowMinMap ? <div id="minimap" className={'minimap'}></div> : null}
      </div>
    </div>
  )
}
export default Draw