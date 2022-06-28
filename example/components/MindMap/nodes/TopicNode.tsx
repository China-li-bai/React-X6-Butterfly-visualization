
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

