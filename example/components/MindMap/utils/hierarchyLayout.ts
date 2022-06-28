import Hierarchy from '@antv/hierarchy'
import { HierarchyResult, MindMapData } from '../interface'
type direction = 'H' | 'V' | 'LR' | 'RL' | 'TB' | 'BT'
const hierarchyLayout = (data, direction: direction = 'H') => {
  const result: HierarchyResult = Hierarchy.mindmap(data, {
    direction: direction,
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
  console.log("🚀 - file: HierarchyLayout.ts - line 26 - result", result)

  return result
}

export default hierarchyLayout