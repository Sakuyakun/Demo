import React, { Component } from 'react';
import { isEqual, uniq, isEmpty, get, cloneDeep } from 'lodash';
import { Input, Tree, Button, Checkbox } from 'antd';
import { isLastLevelKey, disabledCategoryData, getLastLevelData, filterCategoryData } from './utils';
import styles from './style.module.scss';

type State = any
type Props = {
  className?: string,
  dataSource: Array<any>[], // 全量的tree数据源
  title: string[], // 穿梭框的标题
  defaultValues?: Array<any>[], // 默认的初始值，只在组件第一次渲染时生效
  values?: Array<any>[], // 受控选择的values 优先级高于defaultValues
  disabled?: boolean, // 是否禁用搜索框
  leftDisabled?: boolean, // 左侧Tree是否禁用
  rightDisabled?: boolean, // 右侧Tree是否禁用
  showSearch?: boolean, // 是否显示搜索框
  searchItems?: Array<any>[], // 搜索时匹配的属性
  searchPlaceholder?: Array<string>[] | undefined, // 搜索框的placeHolder
  notFoundContent?: string, // 无数据时的文本
  rightExtendNode?: any, // 右侧Tree节点的自定义渲染节点
  draggable?: boolean, // 开启拖拽
  onMove?: Function, // 数据移动时触发的函数，默认参数一为选择的keys，参数二为数组形式的JSON字符串数据为为选择之后左侧的数据源和右侧的数据源
}

const { Search } = Input;
const { TreeNode } = Tree

export default class TreeTransfer extends Component<Props, State> {
  static defaultProps = {
    className: '',
    dataSource: [],
    values: undefined,
    defaultValues: [],
    onMove: () => { },
    title: ['左侧标题', '右侧标题'],
    showSearch: true,
    searchItems: ['label', 'key'],
    searchPlaceholder: ['请输入', '请输入'],
    notFoundContent: '暂无数据',
    disabled: false,
    leftDisabled: false,
    rightDisabled: false,
    draggable: false,
    rightExtendNode: null
  }

  constructor(props: any) {
    super(props);
    this.state = {
      dataSource: this.props.dataSource, // 全量数据
      selectValues: this.props.values ? this.props.values : this.props.defaultValues, // 最后选择到右侧的values(values的优先级高于defaultValues)
      leftTree: {
        // 左侧剩余数据
        dataSource: [], // 展示的数据
        selectDataSource: [], // 选中的产品数据
        filterSelectDataSource: [], // 去除选中的产品数据
        keys: [], // 选中的keys(包括已经选择移动到右边的keys)
        checkedKeys: [], // 受控选中的keys
        expandedKeys: [], // 展开的项
        autoExpandParent: true, // 自动展开父节点
        matchedKeys: [], // 匹配搜索内容的数据
      },
      rightTree: {
        // 右侧已选择数据
        dataSource: [], // 展示的数据
        selectDataSource: [], // 选中的产品数据
        filterSelectDataSource: [], // 去除选中的产品数据
        keys: [], // 选中的keys(和checkedKeys相同)
        checkedKeys: [], // 受控选中的keys
        expandedKeys: [], // 展开的项
        autoExpandParent: true, // 自动展开父节点
        matchedKeys: [], // 匹配搜索内容的数据
      },
    };
  }

  componentDidMount() {
    this.changeData(this.props, this.state.selectValues);
  }

  //  当传入的受控values和全量的dataSource改变时，重新计算左右侧的数据
  componentDidUpdate(prevProps: any) {
    const { values, dataSource } = this.props;
    const { selectValues } = this.state;

    // dataSource数据源改变时重新计算
    if (!isEqual(dataSource, prevProps.dataSource)) {
      this.changeDataSource(this.props, selectValues);
    }
    // 受控的values改变时
    if (values && !isEqual(values, prevProps.values)) {
      this.changeData(this.props, values);
    }
  }

  changeDataSource = (props: any, filterValues: any) => {
    const { dataSource, disabled, leftDisabled, rightDisabled } = props;
    let newDataSource = cloneDeep(dataSource); // 新的全量数据
    // 如果设置disabled时将数据源全部disabled(数据结构参考Tree组件)
    if (disabled) {
      newDataSource = disabledCategoryData(dataSource);
    }

    // 有value时计算两侧的dataSource
    const newLeftTreeDataSource = filterCategoryData(filterValues, newDataSource, 'filter', disabled || leftDisabled); // 左侧Tree的的展示数据
    const newRightTreeDataSource = filterCategoryData(filterValues, newDataSource, 'select', disabled || rightDisabled); // 右侧Tree的展示数据

    this.setState({
      dataSource: newDataSource,
      selectValues: filterValues,
      leftTree: {
        ...this.state.leftTree,
        dataSource: newLeftTreeDataSource,
        checkedKeys: []
      },
      rightTree: {
        ...this.state.rightTree,
        dataSource: newRightTreeDataSource,
        checkedKeys: []
      },
    });
  };

  // 初始的数据赋值(根据selectValues以及dataSources计算左右侧的展示数据，同时会处理disabled属性)
  changeData = (props: any, filterValues: any) => {
    const { dataSource, disabled, leftDisabled, rightDisabled } = props;
    let newDataSource = cloneDeep(dataSource); // 新的全量数据
    // 如果设置disabled时将数据源全部disabled(数据结构参考Tree组件)
    if (disabled) {
      newDataSource = disabledCategoryData(dataSource);
    }
    // 有value时计算两侧的dataSource
    const newLeftTreeDataSource = filterCategoryData(filterValues, newDataSource, 'filter', disabled || leftDisabled); // 左侧Tree的的展示数据
    const newRightTreeDataSource = filterCategoryData(filterValues, newDataSource, 'select', disabled || rightDisabled); // 右侧Tree的展示数据

    this.setState({
      dataSource: newDataSource,
      selectValues: filterValues,
      leftTree: {
        ...this.state.leftTree,
        dataSource: newLeftTreeDataSource,
      },
      rightTree: {
        ...this.state.rightTree,
        dataSource: newRightTreeDataSource,
      },
    });
  };

  // 选择checkbox时改变状态的方法
  operationOnCheck = (keys: any, data: any, direction: any, rightToLeft: any, callback?: any) => {
    const { leftDisabled, rightDisabled } = this.props;
    const newData = filterCategoryData(keys, data, 'filter', rightToLeft ? leftDisabled : false); // 去除选中的数据
    const selectDataCategory = filterCategoryData(keys, data, 'select', rightDisabled); // 选中的数据
    const changeState = direction === 'left' ? 'leftTree' : 'rightTree';

    if (rightToLeft) {
      // rightToLeft为true时会重新计算左侧Tree的selectDataSource和filterSelectDataSource
      const { leftTree: { checkedKeys } } = this.state;
      const newLeftKeys = [...checkedKeys, ...keys];
      const newLeftFilterData = filterCategoryData(newLeftKeys, data, 'filter', leftDisabled);
      const newLeftSelectData = filterCategoryData(newLeftKeys, data, 'select', leftDisabled);
      // 右面选中移动到左边时生成左边的数据
      this.setState({
        [changeState]: {
          ...this.state[changeState],
          dataSource: newData,
          selectDataSource: newLeftSelectData,
          filterSelectDataSource: newLeftFilterData,
        },
      }, () => callback && callback());
    } else {
      this.setState({
        [changeState]: {
          ...this.state[changeState],
          filterSelectDataSource: newData,
          selectDataSource: selectDataCategory,
        },
      });
    }
  };

  // 选中时的方法(rightToLeft表示右边移动到左边时调用该函数)
  onCheck = (keys: any, info: any, direction: any, rightToLeft: any, callback?: any) => {
    const { dataSource } = this.props;
    // 选择的keys中是最后一级的keys
    const lastLevelKey = keys.filter((item: any) => isLastLevelKey(dataSource, item));

    if (direction === 'left') {
      this.setState(
        {
          leftTree: {
            ...this.state.leftTree,
            // 如果rightToLeft为true时checkedKeys还是原来的checkedKeys，否则为lastLevelKey
            checkedKeys: rightToLeft ? this.state.leftTree.checkedKeys : lastLevelKey,
            // 如果rightToLeft为true时keys是原来的checkedKeys加selectValues，否则为lastLevelKey加selectValues
            keys: rightToLeft ? uniq([...this.state.selectValues, ...this.state.leftTree.checkedKeys]) : uniq([...this.state.selectValues, ...lastLevelKey])
          },
        },
        () => {
          const newKeys = uniq([...lastLevelKey, ...this.state.selectValues]);
          this.operationOnCheck(newKeys, dataSource, direction, rightToLeft, callback);
        }
      );
    } else {
      // 选择的是右侧的Tree时只需要改变受控的keys然后调用operationOnCheck方法
      this.setState(
        {
          rightTree: {
            ...this.state.rightTree,
            checkedKeys: lastLevelKey,
            keys: lastLevelKey,
          },
        },
        () => this.operationOnCheck(lastLevelKey, this.state.rightTree.dataSource, direction, rightToLeft)
      );
    }
  };

  // 左向右的按钮
  // 左侧Tree新的数据源是左侧 Tree 的 filterSelectDataSource
  // 右侧Tree新的数据源是左侧 Tree 的 selectDataSource
  leftToRight = () => {
    const { onMove } = this.props;
    const { leftTree: { selectDataSource, filterSelectDataSource } } = this.state;



    this.setState(
      {
        selectValues: this.state.leftTree.keys,
        leftTree: {
          ...this.state.leftTree,
          dataSource: filterSelectDataSource,
          matchedKeys: [],
          checkedKeys: [],
          filterSelectDataSource: [],
          selectDataSource: [],
        },
        rightTree: {
          ...this.state.rightTree,
          dataSource: selectDataSource,
        },
      },
      () => {
        const { selectValues, leftTree, rightTree } = this.state;
        // 左向右按钮点击之后，重新计算右边tree的相关state(兼容点击左向右按钮时右侧有选中项的情况)
        if (!isEmpty(rightTree.checkedKeys)) {
          this.operationOnCheck(rightTree.checkedKeys, rightTree.dataSource, 'right', false);
        }
        // 返回给父组件数据
        const categoryData = JSON.stringify([leftTree.dataSource, rightTree.dataSource]);
        onMove && onMove(selectValues, categoryData, rightTree.dataSource);
      }
    );
  };

  // 右向左的按钮
  rightToLeft = () => {
    const { onMove } = this.props;
    // 已选择的keys中去除右侧新选择的keys
    const newLeftKeys = this.state.selectValues.filter(
      (item: any) => !this.state.rightTree.keys.includes(item)
    );

    this.setState(
      {
        selectValues: newLeftKeys,
        rightTree: {
          ...this.state.rightTree,
          dataSource: this.state.rightTree.filterSelectDataSource,
          keys: [],
          matchedKeys: [],
          selectDataSource: [],
          filterSelectDataSource: [],
          checkedKeys: [],
        },
      },
      () => {
        // 右向左移动时，左侧的数据需要重新计算
        this.onCheck(newLeftKeys, {}, 'left', true, () => {
          const { selectValues, leftTree, rightTree } = this.state;
          const categoryData = JSON.stringify([leftTree.dataSource, rightTree.dataSource]);
          onMove && onMove(selectValues, categoryData, rightTree.dataSource);
        });
      }
    );
  };

  // 渲染transfer的全选checkBox
  renderCheckBox = (direction: any) => {
    const { disabled, leftDisabled, rightDisabled } = this.props;
    const directionDisabled = direction === 'left' ? leftDisabled : rightDisabled;
    const { leftTree, rightTree } = this.state;
    const operationState = direction === 'left' ? leftTree : rightTree;
    const allLength = getLastLevelData(operationState.dataSource).length; // 所有最后一项的数据长度
    const selectLength = operationState.checkedKeys.length; // 所选择的数据长度
    const checkAllDisabled = disabled || directionDisabled || isEmpty(operationState.dataSource); // 全选的checkbox是否disabled
    // 全选或者全不选的状态
    const type = allLength === selectLength ? 'clear' : 'checkAll';

    if (selectLength === 0) {
      // 非全选状态
      return (
        <div>
          <Checkbox
            checked={false}
            indeterminate={false}
            onClick={() => this.checkAll(direction, type)}
            style={{ marginRight: '6px' }}
            disabled={checkAllDisabled}
          />
          {`${allLength}项`}
        </div>
      );
    } else {
      // 全选状态
      return (
        <div>
          <Checkbox
            checked={selectLength === allLength}
            indeterminate={selectLength !== allLength}
            onClick={() => this.checkAll(direction, type)}
            style={{ marginRight: '6px' }}
          />
          {`${selectLength}/${allLength}项`}
        </div>
      );
    }
  };

  // checkBox的全选事件
  checkAll = (direction: any, type: any) => {
    const { leftDisabled, rightDisabled } = this.props;
    const directionDisabled = direction === 'left' ? rightDisabled : leftDisabled;
    const operationState = direction === 'left' ? 'leftTree' : 'rightTree';
    const selectAllKeys = getLastLevelData(this.state[operationState].dataSource).map(
      (item: any) => item.key
    );
    // 全选右侧时所有的key
    const allRightTreeKeys = getLastLevelData(this.state.rightTree.dataSource).map(
      (item: any) => item.key
    );
    // 全选左侧时所有的key
    const allKeys = getLastLevelData(this.state.dataSource).map((item: any) => item.key);
    // 根据选择的方向生成对应的key
    const generateKeys = direction === 'left' ? allKeys : allRightTreeKeys;
    this.setState({
      [operationState]: {
        ...this.state[operationState],
        selectDataSource: directionDisabled ? disabledCategoryData(this.state.dataSource) : this.state.dataSource,
        filterSelectDataSource: [],
        checkedKeys: type === 'clear' ? [] : selectAllKeys,
        keys: type === 'clear' ? [] : generateKeys,
      },
    });
  };

  // 搜索筛选(设置expandedKeys和matchedKeys)
  handleSearch = (e: any, direction: any) => {
    let { value } = e.target;
    const { searchItems } = this.props;
    const changeState = direction === 'left' ? 'leftTree' : 'rightTree';
    const dataSource = this.state[changeState].dataSource;
    value = value.trim();
    if (!value) {
      this.setState({
        [changeState]: {
          ...this.state[changeState],
          matchedKeys: null,
          expandedKeys: [],
        },
      });
      return;
    }
    const matchedKeys: any = [];
    const loop = (data: any) => data.forEach((item: any) => {
      if (searchItems?.some((searchItem: any) => String(item[searchItem] || '').indexOf(value) > -1)) {
        matchedKeys.push(item.key);
      }
      if (item.children && item.children.length) {
        loop(item.children);
      }
    });
    loop(dataSource);

    this.setState({
      [changeState]: {
        ...this.state[changeState],
        expandedKeys: [...matchedKeys],
        autoExpandParent: true,
        matchedKeys,
      },
    });
  };

  // 展开或收起时操作
  handleExpand = (keys: any, direction: any) => {
    const changeState = direction === 'left' ? 'leftTree' : 'rightTree';
    this.setState({
      [changeState]: {
        ...this.state[changeState],
        expandedKeys: keys,
        autoExpandParent: false,
      },
    });
  };

  // 递归渲染树节点
  renderRightTreeNode = (treeNode: any) => {
    let renderTitle = (node: any) => {
      return (
        <div style={{ width: '100%' }}>
          <span>{node.title}</span>
          {this.props.rightExtendNode && this.props.rightExtendNode(node)}
        </div>
      )
    }

    return treeNode.map((node: any) => {
      return (
        <TreeNode title={renderTitle(node)} key={node.key} disabled={node.disabled}>
          {
            node.children?.length > 0 && this.renderRightTreeNode(node.children)
          }
        </TreeNode>
      )
    })
  }

  onDrop = (info: any) => {
    console.log(info);
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
    const data = [...this.state.rightTree.dataSource];

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

    this.setState({
      rightTree: {
        ...this.state.rightTree,
        dataSource: data
      },
    });
  }

  render() {
    const { leftTree, rightTree } = this.state
    const { title, showSearch, searchPlaceholder, notFoundContent, className, draggable }: any = this.props
    const leftFilterTreeNode =
      (node: any) => leftTree.matchedKeys && leftTree.matchedKeys.indexOf(node.props.eventKey) > -1
    const rightFilterTreeNode =
      (node: any) => rightTree.matchedKeys && rightTree.matchedKeys.indexOf(node.props.eventKey) > -1

    return (
      <div className={`${styles['dyx-tree-transfer']} ${className}`}>

        {/* transfer左侧 */}
        <div className={styles['dyx-transfer-box']}>
          <div className={styles['dyx-transfer-box-title']}>{get(title, 0, '选择框')}</div>
          {/* 左侧搜索 */}
          {
            showSearch && (
              <div className={styles['dyx-transfer-search']}>
                <Search
                  style={{ width: '95%', marginBottom: '10px' }}
                  onChange={e => this.handleSearch(e, 'left')}
                  placeholder={get(searchPlaceholder, 0, '请输入')}
                />
              </div>
            )
          }
          {/* 左侧树 */}
          {
            isEmpty(leftTree.dataSource) ? (
              <div className={styles["dyx-transfer-no-data"]}>{notFoundContent}</div>
            ) : (
              <div className="dyx-transfer-tree">
                <Tree
                  expandedKeys={leftTree.expandedKeys}
                  autoExpandParent={leftTree.autoExpandParent}
                  filterTreeNode={leftFilterTreeNode}
                  onExpand={keys => this.handleExpand(keys, 'left')}
                  treeData={leftTree.dataSource}
                  checkable
                  onCheck={(keys, info) => this.onCheck(keys, info, 'left', false)}
                  checkedKeys={leftTree.checkedKeys}
                />
              </div>
            )
          }
          {/* <div className={styles["dyx-transfer-bottom-select"]}>{this.renderCheckBox('left')}</div> */}
        </div>

        {/* transfer 中间按钮 */}
        <div className="dyx-transfer-exchange">
          <Button
            onClick={this.leftToRight}
            disabled={leftTree.checkedKeys.length === 0}
            type={leftTree.checkedKeys.length !== 0 ? 'primary' : 'default'}
          >
            {'>'}
          </Button>
          <Button
            onClick={this.rightToLeft}
            disabled={rightTree.checkedKeys.length === 0}
            type={rightTree.checkedKeys.length !== 0 ? 'primary' : 'default'}
          >
            {'<'}
          </Button>
        </div>

        {/* transfer右侧 */}
        <div className={styles["dyx-transfer-box"]}>
          <div className={styles["dyx-transfer-box-title"]}>
            <span>{get(title, 1, '已选择')}</span>
          </div>
          {/* 右侧搜索 */}
          {
            showSearch && (
              <div className={styles["dyx-transfer-search"]}>
                <Search
                  style={{ width: '95%', marginBottom: '10px' }}
                  onChange={e => this.handleSearch(e, 'right')}
                  placeholder={get(searchPlaceholder, 1, '请输入')}
                />
              </div>
            )
          }
          {/* 右侧树 */}
          {
            isEmpty(rightTree.dataSource) ? (
              <div className={styles["dyx-transfer-no-data"]}>{notFoundContent}</div>
            ) : (
              <div className="dyx-transfer-tree">
                <Tree
                  expandedKeys={rightTree.expandedKeys}
                  autoExpandParent={rightTree.autoExpandParent}
                  filterTreeNode={rightFilterTreeNode}
                  onExpand={keys => this.handleExpand(keys, 'right')}
                  checkable
                  onCheck={(keys, info) => this.onCheck(keys, info, 'right', false)}
                  checkedKeys={rightTree.checkedKeys}
                  draggable={{
                    icon: false,
                    nodeDraggable: (node: any) => draggable
                  }}
                  onDrop={this.onDrop}
                >
                  {this.renderRightTreeNode(rightTree.dataSource)}
                </Tree>
              </div>
            )
          }
          {/* <div className={styles["dyx-transfer-bottom-select"]}>{this.renderCheckBox('right')}</div> */}
        </div>

      </div>
    );
  }
}
