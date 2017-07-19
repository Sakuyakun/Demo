const React = require('react');
const PropTypes = React.PropTypes;
// const dragImgURL = '.img/drag.png';
// const topImgURL = '.img/totop.png';
const lodash = require('lodash');
const DragSource = require('react-dnd').DragSource;
const DropTarget = require('react-dnd').DropTarget;
const HTML5Backend = require('react-dnd-html5-backend');
const DragDropContext = require('react-dnd').DragDropContext;
require('./kmc-dragTable');

let rowSource = {
    beginDrag (props) {
        return { id: props.id };
    },
    endDrag (props, monitor, component) {
        props.endDrag()
    }
}
let rowTarget = {
    hover (props, monitor) {
        let draggedId = monitor.getItem().id;
        if (draggedId !== props.id) {
            props.moveRow(draggedId, props.id);
        }
    }
}
let sourceCollect = (connect, monitor) => {
  return {
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
  }
}
let targetCollect = (connect) => {
  return {
    connectDropTarget: connect.dropTarget()
  }
}
// 表格行组件
const ChildComp = React.createClass({
    render() {
        const self = this
        let {rowItem, setTop, isDragging, connectDragSource, connectDropTarget} = this.props
        let opacity = isDragging ? 0 : 1
        return connectDragSource(connectDropTarget(
            <tr key={rowItem.id} style={{opacity: opacity}}>
                <td>{rowItem.id + 1}</td>
                <td>
                    {rowItem.zqmc}
                    <br/>
                    <span className="zqdm">{rowItem.zqdm}</span>
                </td>
                <td>{rowItem.yjk}</td>
                <td onClick={event => setTop(event, rowItem.id)}>
                    <img className="eventImg" src={topImgURL} />
                </td>
                <td>
                    <img className="eventImg" src={dragImgURL} />
                </td>
            </tr>
        ))
    }
})
let source = DragSource('row', rowSource, sourceCollect)(ChildComp);
let TableRow = DropTarget('row', rowTarget, targetCollect)(source);

// 表格整体组件
const DragTable = React.createClass({
    propTypes: {
        setTop: React.PropTypes.func,   // 置顶
        tableHeaderData: React.PropTypes.array, // 表格标题
        tableBodyData: React.PropTypes.array  // 表格内容
    },
    getInitialState() {
        return {
            tableHeaderDataState: [],
            tableBodyDataState: []
        }
    },
    getDefaultProps() {
        return {
            tableHeaderData: [],
            tableBodyData: []
        }
    },
    componentWillReceiveProps(nextProps) {
        let {tableBodyData} = nextProps;
        let cloneObj = this.handleRowDataId(tableBodyData, 'add')
        this.setState({
            tableBodyDataState: cloneObj
        })
    },
    componentWillMount() {
        let { tableHeaderData, tableBodyData } = this.props
        let cloneObj = this.handleRowDataId(tableBodyData, 'add')
        // 添加顶置与拖动表格列头
        tableHeaderData = [
            ...tableHeaderData, 
            {name: '顶置', key: 'top'}, 
            {name: '拖动', key: 'drag'}
        ]
        this.setState({
            tableHeaderDataState: tableHeaderData,
            tableBodyDataState: cloneObj
        })
    },
    handleRowDataId (Row, Type) {
        // 深拷贝对象 否则影响到传入的props
        let cloneObj = lodash.cloneDeep(Row)
        Object.keys(cloneObj).map((item, index) => {
            if (Type === 'add') {
                cloneObj[item]['id'] = index
            } else if (Type === 'delete') {
                delete cloneObj[item]['id']
            }
        })
        return cloneObj
    },
    // 优先级置顶
    handleSetTop (event, curr_index) {
        if (curr_index != 0) {
            let {tableBodyData} = this.props;
            tableBodyData = [
                tableBodyData[curr_index], 
                ...tableBodyData.slice(0, curr_index), 
                ...tableBodyData.slice(curr_index + 1)
            ]
            this.props.setTop(tableBodyData)
        }
    },
    handleMoveRow (id, afterId) {
        let self = this
        let rows = lodash.clone(this.state.tableBodyDataState)

        let currentRow = lodash.filter(rows, function (r) { return r.id === id;})[0];
        let afterRow = lodash.filter(rows, function (r) { return r.id === afterId;})[0];

        let currentRowIndex = rows.indexOf(currentRow);
        let afterRowIndex = rows.indexOf(afterRow);

        rows.splice(currentRowIndex, 1);
        rows.splice(afterRowIndex, 0, currentRow);

        this.setState({ tableBodyDataState: rows })
    },
    handlendDrag () {
        let {tableBodyDataState} = this.state;
        let cloneObj = this.handleRowDataId(tableBodyDataState, 'delete')
        this.props.setTop(cloneObj)
    },
    render() {
        let {tableHeaderDataState, tableBodyDataState} = this.state
        return (
            <div className="kmc-dragTable">
                <table>
                    <thead>
                        <tr>
                        { 
                            tableHeaderDataState.map((item, index) => (
                                <th key={index}>{item.name}</th>
                            ))
                        }
                        </tr>
                    </thead>
                    <tbody>
                        {
                            tableBodyDataState.map(item => {
                                return (
                                    <TableRow
                                        rowItem={item}
                                        key={item.id} 
                                        id={item.id} 
                                        moveRow={this.handleMoveRow}
                                        endDrag={this.handlendDrag}
                                        setTop={this.handleSetTop}
                                    />
                                )
                            })
                        }
                    </tbody>
                </table>
            </div>
        )
    }
})

const DragTableComp = DragDropContext(HTML5Backend)(DragTable)
export default DragTableComp;
