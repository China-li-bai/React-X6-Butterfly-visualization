import { Cell } from "@antv/x6"
import { HierarchyResult } from "./interface"

const cells:Cell[] = []     
const traverse = (hierarchyItem: HierarchyResult) => {
        if (hierarchyItem) {
          const { data, children } = hierarchyItem

          const node = graph.createNode({
            id: data.id,
            shape: data.type === 'topic-child' ? 'topic-child' : 'topic',
            x: hierarchyItem.x,
            y: hierarchyItem.y,
            width: data.width,
            height: data.height,
            label: data.label,
            type: data.type,
            zIndex: 1
          })

          cells.push(node)
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