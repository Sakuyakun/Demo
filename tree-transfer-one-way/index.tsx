import React, { useEffect, useState, useImperativeHandle } from 'react'

import { Button, Tree, Tooltip } from 'antd'
import { filterSource, findNode, findPath, createTreeMap, createFinalRightTree, getAllKeys, createCombieTree, createDisabledSource } from './utils'

import styles from './index.module.scss'
import { cloneDeep } from 'lodash'

interface PropsITF {
  dataSource: any
  values: any
  title: any
  className?: string
  emptyDataContent?: string
  handleEdit?: Function
  onRef?: any
}

export default ({
  className = '',
  emptyDataContent = '暂无数据',
  values = [],
  ...props
}: PropsITF) => {
  const { dataSource, handleEdit } = props
  const { TreeNode } = Tree

  useEffect(() => {
    setLeftTreeDataSource(dataSource)

    if (values?.length) {
      setLeftCheckedKeys(values)
      setPrevCheckedKeys(values)
      const newLeftTree = createDisabledSource(values, dataSource)
      setLeftTreeDataSource(newLeftTree)
    }
  }, [dataSource, values])

  // 左边树数据
  const [leftTreeDataSource, setLeftTreeDataSource] = useState([])
  const [filterCheckedKeys, setFilterCheckedKeys] = useState<any>([])
  const [reRender, setReRender] = useState(false)

  const [leftCheckedKeys, setLeftCheckedKeys] = useState<any>([]) // 勾选的所有key
  const [prevCheckedKeys, setPrevCheckedKeys] = useState<any>([]) // 左边已经勾选的key
  const [currNewCheckedKeys, setCurrNewCheckedKeys] = useState<any>([]) // 左边新勾选的key

  // 右边树数据
  const [rightTreeDataSource, setRightTreeDataSource] = useState<any>([])

  // 点击左到右按钮重新渲染两棵树
  const renderTwoTree = () => {
    setPrevCheckedKeys(leftCheckedKeys)
    //根据左边选择的key值生成新树
    const newRightTree = filterSource(currNewCheckedKeys, dataSource, '')
    if (rightTreeDataSource.length === 0) {
      setRightTreeDataSource(newRightTree)
    } else {
      // 对比 rightTreeDataSource 和 newRightTree
      // 1. 把 newRightTree 转为 map
      let newRightTreeMap = createTreeMap(newRightTree)

      // 2. 过滤 newRightTreeMap 仅保留未添加到右边树的 node
      let rightTreeDataSourceKeys = getAllKeys(rightTreeDataSource)
      let filterNewRightTreeMap = {}
      Object.keys(newRightTreeMap).forEach(key => {
        if (rightTreeDataSourceKeys.indexOf(key) === -1) {
          filterNewRightTreeMap[key] = newRightTreeMap[key]
        }
      })
      const combieNewRightTreeMap = createCombieTree(filterNewRightTreeMap)
      const filterNewRightTreeMapKey = Object.keys(combieNewRightTreeMap)
      console.log('combieNewRightTreeMap', combieNewRightTreeMap)
      console.log('filterNewRightTreeMapKey', filterNewRightTreeMapKey)

      // 2. 根据 filterNewRightTreeMap 加入 rightTreeDataSource，递归对比
      // 如果没有相同key 但有相同父节点，将 treenode 加入父节点
      // 如果没有相同key 并且没有相同父节点，将 treenode 添加到根
      let finalTree = cloneDeep(rightTreeDataSource)
      createFinalRightTree(finalTree, finalTree, null, combieNewRightTreeMap, filterNewRightTreeMapKey)
      console.log(finalTree)
      setRightTreeDataSource(finalTree)
    }

    // 根据左边选择的key值遍历左边树赋值disabled
    let newLeftTree = createDisabledSource(leftCheckedKeys, dataSource)
    setLeftTreeDataSource(newLeftTree)
    setCurrNewCheckedKeys([])
    // console.log(leftCheckedKeys, 'leftCheckedKeys')
    // console.log(prevCheckedKeys, 'prevCheckedKeys')
    // console.log(currNewCheckedKeys, 'currNewCheckedKeys')
  }

  // 选择checkbox时改变状态
  const handleOnCheck = ((keys: any, info: any) => {
    setCurrNewCheckedKeys(keys.filter(key => prevCheckedKeys.indexOf(key) === -1))
    setLeftCheckedKeys(keys)
  })

  // 右侧树删除方法
  const rightTreeDelete = (node: any) => {
    // 1. 获取删除的树节点key（包括该节点的children）
    const delKeys = getAllKey(node)
    // 2. 获取删除树节点key的所有父节点key
    const nodePath = findPath(rightTreeDataSource, n => n.key === node.key)
    const nodePathKeys = nodePath.map(node => node.key)
    delKeys.push(...nodePathKeys)

    // 3. 在leftCheckedKeys中移除，并重新渲染左右树
    const filterCheckedKeys = leftCheckedKeys.filter(key => delKeys.indexOf(key) === -1)
    setLeftCheckedKeys(filterCheckedKeys)
    setFilterCheckedKeys(filterCheckedKeys)
    setPrevCheckedKeys(filterCheckedKeys)
    setReRender(true)
  }

  useEffect(() => {
    // 重新渲染左右树
    if (reRender) {
      const newRightTreeData = filterSource(filterCheckedKeys, rightTreeDataSource, '')
      setRightTreeDataSource(newRightTreeData)
      const newLeftTreeData = createDisabledSource(filterCheckedKeys, dataSource)
      setLeftTreeDataSource(newLeftTreeData)
      setReRender(false)
    }
  }, [filterCheckedKeys, dataSource, rightTreeDataSource, reRender])

  // 递归获取传入树节点包含children的key
  const getAllKey = (treeNode: any) => {
    let keys: any = []
    keys.push(treeNode.key)

    if (treeNode.children?.length > 0) {
      treeNode.children.forEach((node: any) => {
        keys.push(node.key)
        if (node.children?.length > 0) {
          keys.push(...getAllKey(node))
        }
      })
    }

    return keys
  }

  // 递归渲染右边树结构
  const renderRightTreeNode = (treeNode: any, parentNode: any) => {
    let renderTitle = (node: any) => {
      return (
        <div style={{ width: '100%' }}>
          <span>{node.title}</span>
          <div style={{ float: 'right' }}>
            <a
              onClick={() => {
                const sourceNode = findNode(dataSource, (n) => n.key === node.key)
                handleEdit && handleEdit(node, sourceNode)
              }}
              style={{ paddingRight: '10px' }}
            >
              编辑
            </a>
            <a
              onClick={() => { rightTreeDelete(node) }}
              style={{ paddingRight: '10px' }}
            >
              删除
            </a>
          </div>
        </div>
      )
    }

    return treeNode.map((node: any) => {
      return (
        <TreeNode title={renderTitle(node)} key={node.key} disabled={node.disabled}>
          {
            node.children?.length > 0 && renderRightTreeNode(node.children, node)
          }
        </TreeNode>
      )
    })
  }

  // 拖拽
  const onDrop = (info: any) => {
    const dropKey = info.node.key;
    const dragKey = info.dragNode.key;
    const dropPos = info.node.pos.split('-');
    const dropPosition = info.dropPosition - Number(dropPos[dropPos.length - 1]);

    const loop = (data, key, callback) => {
      for (let i = 0; i < data.length; i++) {
        if (data[i].key === key) {
          return callback(data[i], i, data);
        }
        if (data[i].children) {
          loop(data[i].children, key, callback);
        }
      }
    };
    const data = [...rightTreeDataSource];

    let dragObj;
    loop(data, dragKey, (item, index, arr) => {
      arr.splice(index, 1);
      dragObj = item;
    });

    if (!info.dropToGap) {
      // Drop on the content
      loop(data, dropKey, item => {
        item.children = item.children || [];
        // where to insert 示例添加到头部，可以是随意位置
        item.children.unshift(dragObj);
      });
    } else if (
      (info.node.props.children || []).length > 0 && // Has children
      info.node.props.expanded && // Is expanded
      dropPosition === 1 // On the bottom gap
    ) {
      loop(data, dropKey, item => {
        item.children = item.children || [];
        // where to insert 示例添加到头部，可以是随意位置
        item.children.unshift(dragObj);
        // in previous version, we use item.children.push(dragObj) to insert the
        // item to the tail of the children
      });
    } else {
      let ar;
      let i;
      loop(data, dropKey, (item, index, arr) => {
        ar = arr;
        i = index;
      });
      if (dropPosition === -1) {
        ar.splice(i, 0, dragObj);
      } else {
        ar.splice(i + 1, 0, dragObj);
      }
    }

    setRightTreeDataSource(data)
  }

  // 修改节点title
  const changeNodeTitle = (key, newTitle) => {
    const newTree = cloneDeep(rightTreeDataSource)
    
    const loop = (treeNode) => {
      treeNode.forEach(node => {
        if (node.key === key) {
          node.title = newTitle
        } else if (node.children?.length > 0) {
          loop(node.children)
        }
      })
    }

    loop(newTree)
    setRightTreeDataSource(newTree)
  }
  useImperativeHandle(props.onRef, () => {
    return {
      changeNodeTitle: changeNodeTitle,
      rightTreeDataSource: rightTreeDataSource
    }
  })

  return (
    <>
      <div className={`${styles['transfer-wrap']} ${className}`}>
        {/* 左边树 */}
        <div className={styles['transfer-box']}>
          <div className={styles['transfer-box-top']}>{props.title[0]}</div>
          {
            leftTreeDataSource.length === 0 ? (
              <div className={styles["transfer-no-data"]}>{emptyDataContent}</div>
            ) : (
              <div className="ve-transfer-tree-wrap">
                <Tree
                  // defaultExpandAll={true}
                  treeData={leftTreeDataSource}
                  checkedKeys={leftCheckedKeys}
                  onCheck={(keys, info) => handleOnCheck(keys, info)}
                  checkable
                />
              </div>
            )
          }
        </div>

        <div className={styles['transfer-exchange']}>
          <Button
            onClick={renderTwoTree}
            disabled={currNewCheckedKeys.length === 0}
            type={currNewCheckedKeys.length !== 0 ? 'primary' : 'default'}
          >
            {'>'}
          </Button>
        </div>

        {/* 右边树 */}
        <div className={styles['transfer-box']}>
          <div className={styles['transfer-box-top']}>
            <span>{props.title[1]}</span>
            <div className={styles['transfer-box-btnarea']}>
              <Tooltip title="新增根菜单">
                <Button type="text" />
              </Tooltip>
            </div>
          </div>
          {
            rightTreeDataSource.length === 0 ? (
              <div className={styles["transfer-no-data"]}>{emptyDataContent}</div>
            ) : (
              <div className="ve-transfer-tree-wrap">
                <Tree
                  draggable={{
                    icon: false,
                    nodeDraggable: (node: any) => true
                  }}
                  onDrop={onDrop}
                >
                  {renderRightTreeNode(rightTreeDataSource, null)}
                </Tree>
              </div>
            )
          }
        </div>
      </div>
    </>
  )
}