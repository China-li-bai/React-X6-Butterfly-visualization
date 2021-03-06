import React from 'react'
import { Graph, Node, Color } from '@antv/x6'
import { ReactShape } from '@antv/x6-react-shape'
class MyComponent extends React.Component<{
  node?: ReactShape
  text: string
}> {
  shouldComponentUpdate() {
    const node = this.props.node
    if (node) {
      if (node.hasChanged('data')) {
        return true
      }
    }

    return false
  }

  render() {
    return (
      <div
        style={{
          width: '100%',
          height: '100%',
          textAlign: 'center',
          lineHeight: '50px',
          border: '2px solid #9254de',
          borderRadius: 4,
          background: '#efdbff',
        }}
      >
        {this.props.text}
      </div>
    )
  }
}