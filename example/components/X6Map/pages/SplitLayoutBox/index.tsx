import React from 'react'
import { SplitBox } from '@antv/x6-react-components'
import '@antv/x6-react-components/es/split-box/style/index.css'
import './index.less'
interface Opt {
  containerStyle?: {
    height: number | string
    [x: string]: any
  }
  split?: 'vertical' | 'horizontal'
  primary?: 'first' | 'second'//默认first为defaultSize的大小
  resizable?: boolean
  defaultSize?: number | string
  minSize?: number
  maxSize?: number
  firstChildren?: JSX.Element | string
  secondChildren?: JSX.Element | string
}
export const SplitLayoutBox = (opt: Opt) => {
  const { split = 'vertical', defaultSize = "80%", primary = "first", minSize = 80, maxSize = -80, firstChildren, secondChildren, containerStyle } = opt
  const height = () => containerStyle?.height || '100vh'
  return (
    <div style={{ height: '100vh', ...containerStyle }}>
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          background: '#f5f5f5',
          userSelect: 'none',
        }}
      >
        <SplitBox
          split={split}
          minSize={minSize}
          maxSize={maxSize}
          defaultSize={defaultSize}
          primary={primary}
        >
          <div style={{ width: '100%', height: '100%', background: '#fff7e6' }}>{firstChildren}</div>
          <div style={{ width: '100%', height: '100%' }}>{secondChildren}</div>
        </SplitBox>
      </div>
    </div>
  )
}
