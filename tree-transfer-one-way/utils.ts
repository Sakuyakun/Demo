import { cloneDeep } from "lodash"

/**
 *  根据key值生成新的树
 * @param {any} key key值
 * @param {any} source treeNode
 * @param {any} parent 父节点
 */
export const filterSource = (keys: any, source: any, parent: string) => {
  let sourceWithTag: any = []

  source.forEach((item: any) => {
    if (item.children?.length > 0) {
      let sub = filterSource(keys, item.children, item.title)
      if (sub.length !== 0) {
        sourceWithTag.push({
          ...item,
          parent,
          children: filterSource(keys, item.children, item.title)
        })
      }
    } else if (keys.indexOf(item.key) > -1) {
      sourceWithTag.push(cloneDeep({
        ...item,
        parent
      }))
    }
  })

  return sourceWithTag
}

/**
 * 遍历树节点如果其中有 key 存在 keys 则添加 disabled 属性
 * @param {any} key key值
 * @param {any} source treeNode
 */
export const createDisabledSource = (keys: any, source: any) => {
  return source.map((item: any) => {
    if (item.children?.length > 0) {
      let children = createDisabledSource(keys, item.children)
      let disabled = children.every(item => item.disabled === true)
      return {
        ...item,
        children: children,
        disabled: disabled,
      }
    } else if (keys.indexOf(item.key) > -1) {
      return {
        ...item,
        disabled: true
      }
    }
    return {
      ...item,
      disabled: false
    }
  })
}

/**
 * 寻找指定 key 值的 nodeTree 的所有上级路径包括自身
 * @param {any} tree 节点
 * @param {any} func 条件方法
 */
export const findPath = (tree, func) => {
  const path: any = [],
    list: any = [...tree],
    visitedSet: any = new Set()
  while (list.length) {
    const node: any = list[0]
    if (visitedSet.has(node)) {
      path.pop()
      list.shift()
    } else {
      visitedSet.add(node)
      node['children'] && list.unshift(...node['children'])
      path.push(node)
      if (func(node)) return path
    }
  }
  return null
}

/**
 * 寻找指定 key 值的 nodeTree
 * @param {any} tree 节点
 * @param {any} func 条件方法
 */
export const findNode = (tree, func) => {
  const list = [...tree]
  for (let node of list) {
    if (func(node)) return node
    node['children'] && list.push(...node['children'])
  }
  return null
}

/**
 * 获取 treeNode 所有的 key
 * @param {any} treeNode 当前节点
 */
export const getAllKeys = (treeNode: any) => {
  let keys: any = []
  treeNode.forEach((node: any) => {
    keys.push(node.key)

    if (node.children?.length > 0) {
      let childrenKeys = getAllKeys(node.children)
      keys.push(...childrenKeys)
    }
  })
  return keys
}

/**
 * 将 treenode 转为 key 对应 treeNode 节点的 map 格式
 * @param {any} treeNode 当前节点
 */
export const createTreeMap = (treeNode: any) => {
  let keyMap: any = {}
  treeNode.forEach((node: any) => {
    keyMap[node.key] = node

    if (node.children?.length > 0) {
      let childrenKeysMap = createTreeMap(node.children)
      keyMap = {
        ...keyMap,
        ...childrenKeysMap
      }
    }
  })
  return keyMap
}

/**
 * 过滤 createTreeMap 的结果，只保留未添加到右边树的 treeNode
 * @param {any} treeNode 当前节点
 */
export const createCombieTree = (treeNode: any) => {
  const _treeNode = cloneDeep(treeNode)
  const _keys = Object.keys(treeNode)

  const getKeys = (nodeTree: any) => {
    let keyArr: any = []

    nodeTree.forEach(node => {
      keyArr.push(node.key)
      if (node.children?.length > 0) {
        let keys = getKeys(node.children)
        keyArr.push(...keys)
      }
    })

    return keyArr
  }

  _keys.forEach(key => {
    if (_treeNode[key]?.children?.length > 0) {
      const delkeys = getKeys(_treeNode[key]?.children)
      delkeys.forEach(key => {
        Reflect.deleteProperty(_treeNode, key)
      })
    }
  })

  return _treeNode
}

/**
 * 这个方法是将新的treenode节点添加到右边现有的tree里
 * @param {any} root 根节点
 * @param {any} treeNode 当前节点
 * @param {any} parentTreeNode 父节点
 * @param {any} treeMap 添加到右侧新数据的treeMap
 * @param {any} treeMapKey treeMap对应的key
 */
export const createFinalRightTree = (root: any, treeNode: any, parentTreeNode, treeMap: any, treeMapKey: any) => {
  const isAddMap = new Map()

  const loop = (parentKey: any, _key: any, treeNode: any, parentTreeNode: any, treeMap: any) => {
    for (let i = 0, len = treeNode.length; i < len; i++) {
      const { key, children } = treeNode[i]
      if (key === parentKey) {
        if (!isAddMap.get(treeMap[_key])) {
          children.push(treeMap[_key])
          isAddMap.set(treeMap[_key], true)
        }
      } else if (children?.length > 0) {
        loop(parentKey, _key, children, treeNode[i], treeMap)
      }
    }
  }

  treeMapKey.forEach(_key => {
    const parentKey = treeMap[_key].parent
    isAddMap.set(treeMap[_key], false)
    // 通过 loop 方法递归寻找相同的父节点并添加进去
    loop(parentKey, _key, treeNode, parentTreeNode, treeMap)
    // 如果没有相同的父节点，则添加到根节点下
    if (!isAddMap.get(treeMap[_key])) {
      root.push(treeMap[_key])
    }
  })
}

export default {
  filterSource,
  createDisabledSource,
  findPath,
  getAllKeys,
  createTreeMap,
  createFinalRightTree,
  createCombieTree,
  findNode
}
