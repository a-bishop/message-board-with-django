const React = require("react");

class Msg extends React.Component {
    constructor(props) {
        super(props);
        this.deleteMessage = this.deleteMessage.bind(this);
    }

    deleteMessage () {
        let id = this.props.id
        this.props.deleteMsgCallback(id);
    }

    render () {
        return (
            <tr>
                <td>{this.props.displayId + 1}</td>
                <td>{this.props.name}</td>
                <td>{this.props.msg}</td>
                <td><button type="submit" className="btn btn-danger" onClick={this.deleteMessage}>
                    Delete
                </button>
                </td>
            </tr>
        )
    }
}

module.exports = Msg;
