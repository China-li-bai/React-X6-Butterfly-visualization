const LINE_HEIGHT = 24
const NODE_WIDTH = 150
const erRect = {
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
  ],
  attrs: {
    rect: {
      strokeWidth: 1,
      stroke: '#5F95FF',
      fill: '#5F95FF',
    },
    label: {
      fontWeight: 'bold',
      fill: '#ffffff',
      fontSize: 12,
    },
  },
  ports: {
    groups: {
      list: {
        markup: [
          {
            tagName: 'rect',
            selector: 'portBody',
          },
          {
            tagName: 'text',
            selector: 'portNameLabel',
          },
          {
            tagName: 'text',
            selector: 'portTypeLabel',
          },
        ],
        attrs: {
          portBody: {
            width: NODE_WIDTH,
            height: LINE_HEIGHT,
            strokeWidth: 1,
            stroke: '#5F95FF',
            fill: '#EFF4FF',
            // magnet: true,
          },
          portNameLabel: {
            ref: 'portBody',
            refX: 6,
            refY: 6,
            fontSize: 16,
          },
          portTypeLabel: {
            ref: 'portBody',
            refX: 95,
            refY: 6,
            fontSize: 10,
          },
        },
        position: 'erPortPosition',
      },
    },
  },
}