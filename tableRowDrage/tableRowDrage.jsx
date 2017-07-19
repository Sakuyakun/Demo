const React = require('react');
const PropTypes = React.PropTypes;
const dragImgURL = '../../../img/drag.png';
const topImgURL = '../../../img/totop.png';
require('../css/kmc-dragTable');
/*
数据置顶操作
getSetTopResult (tableBodyData) {
    this.setState({
        tableBodyData
    })
}
*/

export default class DragTable extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            tableHeaderData: []
        }
    }
    componentWillMount() {
        let { tableHeaderData } = this.props

        let thData = [
            ...tableHeaderData, 
            {name: '顶置', key: 'top'}, 
            {name: '拖动', key: 'drag'}
        ]

        this.setState({
            tableHeaderData: thData,
        })
    }
    // 优先级置顶
    setTop (event, curr_index) {
        if (curr_index == 0) return;

        let {tableBodyData} = this.props;
        tableBodyData = [tableBodyData[curr_index], ...tableBodyData.slice(0, curr_index), ...tableBodyData.slice(curr_index + 1)]
        this.props.setTop(tableBodyData)
    }
    render() {
        let {tableHeaderData} = this.state
        let {tableBodyData} = this.props
        return (
            <div className="kmc-dragTable">
                <table>
                    <tbody >
                        <tr>
                        { 
                            tableHeaderData.map((item, index) => <th key={index}>{item.name}</th> )
                        }
                        </tr>
                        { 
                            tableBodyData.map((dataObj, index) => {
                                return (
                                    <tr key={index}>
                                        <td>{dataObj.yxj}</td>
                                        <td>
                                            {dataObj.zqmc}
                                            <br/>
                                            <span className="zqdm">{dataObj.zqdm}</span>
                                        </td>
                                        <td>{dataObj.yjk}</td>
                                        <td onClick={event => this.setTop(event, index)}>
                                            <img className="eventImg" src={topImgURL} />
                                        </td>
                                        <td>
                                            <img className="eventImg" src={dragImgURL} />
                                        </td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
            </div>
        )
    }
}