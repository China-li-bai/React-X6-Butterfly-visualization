import { MindMapData } from "../interface"

const findItem = (
  obj: MindMapData,
  id: string,
): {
  parent: MindMapData | null
  node: MindMapData | null
} | null => {
  if (obj.id === id) {
    return {
      parent: null,
      node: obj,
    }
  }
  const { children } = obj
  if (children) {
    for (let i = 0, len = children.length; i < len; i++) {
      const res = findItem(children[i], id)
      if (res) {
        return {
          parent: res.parent || obj,
          node: res.node,
        }
      }
    }
  }
  return null
}

const addChildNode = (data: MindMapData, id: string, type) => {
  const res = findItem(data, id)
  const dataItem = res?.node
  if (dataItem) {
    let item: MindMapData | null = null
    const length = dataItem.children ? dataItem.children.length : 0
    if (type === 'topic') {
      item = {
        id: `${id}-${length + 1}`,
        type: 'topic-branch',
        label: `分支主题${length + 1}`,
        width: 100,
        height: 40,
      }
    } else if (type === 'topic-branch') {
      item = {
        id: `${id}-${length + 1}`,
        type: 'topic-child',
        label: `子主题${length + 1}`,
        width: 60,
        height: 30,
      }
    }
    if (item) {
      if (dataItem.children) {
        dataItem.children.push(item)
      } else {
        dataItem.children = [item]
      }
      return item
    }
  }
  return null
}

const removeNode = (data: MindMapData, id: string) => {
  const res = findItem(data, id)
  const dataItem = res?.parent
  if (dataItem && dataItem.children) {
    const { children } = dataItem
    const index = children.findIndex((item) => item.id === id)
    return children.splice(index, 1)
  }
  return null
}

export { removeNode, addChildNode, findItem }
