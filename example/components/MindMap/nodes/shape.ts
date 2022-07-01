import { Graph, Path } from '@antv/x6'
import { MapEdgeOption } from './MapEdgeOption'
import { topicChildOption } from './topicChildOption'
import { topicOption } from './topicOption'
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