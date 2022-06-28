const DESC = 'desc'
/* 
  1.处理是否有对象基本描述
  2.找出对象基本描述属性 假设为DESC
  3.其他属性转换为child
 */
const disposalInterfaceData = (data) => {
  const obj = JSON.parse(JSON.stringify(data))
  const objKeys = Object.keys(obj)
  // 是否有描述对象的字段
  if (objKeys.includes(DESC)) {
    const columns = Object.keys(obj[DESC]).concat(['id', 'type', DESC])
    // 排除基本属性
    obj.children = objKeys.filter((k) => !columns.includes(k))
      .map(v => {
        const o: any = {
          ...obj[v],
          childKey: v
        }
        disposalInterfaceData(obj[v])
        delete obj[v]
        return o
      }).filter(Boolean)


    // disposalInterfaceData(obj)

  }
  if (data?.children?.length > 0) {
    data?.children.forEach(child => {
      disposalInterfaceData(child)
    });
  }
  return obj

}
export default disposalInterfaceData