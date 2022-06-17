import * as React from 'react';
import { Graph, Node, Edge, } from '@antv/x6'
import { TreeNode } from './TreeNode';
import { TreeEdge } from './TreeEdge';
import { data } from './data';


export default class MainMap extends React.Component {
  componentDidMount() {

    // 注册自定义图形
    Node.registry.register('tree-node', TreeNode, true)
    Edge.registry.register('tree-edge', TreeEdge, true)
    // 初始化画布
    const graph = new Graph({
      container: document.getElementById('container'),
      async: true,
      frozen: true,
      scroller: true,
      interacting: false,
      sorting: 'approx',
      connecting: {
        anchor: 'orth',
        connector: 'rounded',
        connectionPoint: 'boundary',
        router: {
          name: 'er',
          args: {
            offset: 24,
            direction: 'H',
          },
        },
      },
    })
    graph.on('node:collapse', ({ node }: { node: TreeNode }) => {
      node.toggleCollapse()
      const collapsed = node.isCollapsed()
      const run = (pre: TreeNode) => {
        const succ = graph.getSuccessors(pre, { distance: 1 })
        if (succ) {
          succ.forEach((node: TreeNode) => {
            node.toggleVisible(!collapsed)
            if (!node.isCollapsed()) {
              run(node)
            }
          })
        }
      }
      run(node)
    })

    const start = new Date().getTime()
    const nodes = data.nodes.map(({ leaf, ...metadata }: any) => {
      const node = new TreeNode(metadata)
      if (leaf) {
        node.toggleButtonVisibility(leaf === false)
      }
      return node
    })
    console.log("🚀 - file: Mainmap.tsx - line 43 - nodes", nodes)
    const edges = data.edges.map(
      (edge: any) =>
        new TreeEdge({
          source: edge.source,
          target: edge.target,
        }),
    )

    graph.resetCells([...nodes, ...edges])

    graph.unfreeze({
      progress({ done }) {
        if (done) {
          const time = new Date().getTime() - start
          console.log(time)
          graph.unfreeze({
            batchSize: 50,
          })
          graph.zoomToFit({ padding: 24 })
        }
      },
    })
  }
  render() {
    return (<div>
      <div id='container' style={{ height: '80vh' }}></div>
    </div>);
  }
}
