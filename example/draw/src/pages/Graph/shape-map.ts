import { Graph, Path } from '@antv/x6'

// 子主题
export const topicChildOption = {
  inherit: 'rect',
  markup: [
    {
      tagName: 'rect',
      selector: 'body',
    },
    {
      tagName: 'text',
      selector: 'label',
    },
    {
      tagName: 'path',
      selector: 'line',
    },
  ],
  attrs: {
    body: {
      fill: '#ffffff',
      strokeWidth: 0,
      stroke: '#5F95FF',
    },
    label: {
      fontSize: 14,
      fill: '#262626',
      textVerticalAnchor: 'bottom',
    },
    line: {
      stroke: '#5F95FF',
      strokeWidth: 2,
      d: 'M 0 15 L 60 15',
    },
  },
}
// 中心主题或分支主题
export const topicOption = {
  inherit: 'rect',
  markup: [
    {
      tagName: 'rect',
      selector: 'body',
    },
    {
      tagName: 'image',
      selector: 'img',
    },
    {
      tagName: 'text',
      selector: 'label',
    },
  ],
  attrs: {
    body: {
      rx: 6,
      ry: 6,
      stroke: '#485a74',
      fill: '#1e1e1e',
      strokeWidth: 1,
    },
    img: {
      ref: 'body',
      refX: '100%',
      refY: '50%',
      refY2: -8,
      width: 16,
      height: 16,
      'xlink:href':
        'https://gw.alipayobjects.com/mdn/rms_43231b/afts/img/A*SYCuQ6HHs5cAAAAAAAAAAAAAARQnAQ',
      event: 'add:topic',
      class: 'topic-image',
    },
    label: {
      fontSize: 14,
      fill: '#ca8b22',
    },
  },
}
// 边
export const MapEdgeOption = {
  inherit: 'edge',
  connector: {
    name: 'mindmap',
  },
  attrs: {
    line: {
      targetMarker: '',
      stroke: '#485a74',
      strokeWidth: 2,
    },
  },
  zIndex: 0,
}
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