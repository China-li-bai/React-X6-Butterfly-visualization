import React, { useState, useEffect } from 'react'
import { GithubOutlined } from '@ant-design/icons'
import FlowGraph from './Graph'
import ToolBar from './components/ToolBar'
import '../reset.less'
import '../global.css'
import './index.less'

const Draw = () => {
  const [isReady, setIsReady] = useState(false)

  const getContainerSize = () => {
    return {
      width: document.body.offsetWidth - 214,
      height: document.body.offsetHeight - 105,
    }
  }

  useEffect(() => {
    const graph = FlowGraph.init()
    setIsReady(true)

    const resizeFn = () => {
      const { width, height } = getContainerSize()
      graph.resize(width, height)
    }
    resizeFn()

    window.addEventListener('resize', resizeFn)
    return () => {
      window.removeEventListener('resize', resizeFn)
    }
  }, [])

  const openGithub = () => {
    window.open(
      'https://github.com/antvis/X6/tree/master/examples/x6-app-draw',
      '_blank',
    )
  }

  return (
    <div className={'wrap'}>
      <div className={'toolbar'}>{isReady && <ToolBar />}</div>
      <div className={'content'}>
        <div id="stencil" className={'shapes'}></div>
        <div id="container" className="x6-graph" />
        <div id="minimap" className={'minimap'}></div>
      </div>
    </div>
  )
}
export default Draw