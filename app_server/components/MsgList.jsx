const React = require("react");
const Msg = require("./Msg.jsx");

class MsgList extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      messages: this.props.messages
    };

    this.handleDelete = this.handleDelete.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ messages: nextProps.messages });  
  }

  handleDelete(id) {
    console.log("this", this);
    this.props.deleteMsgCallback(id);
  }

  // handleHTTPErrors(response) {
  //   if (!response.ok) throw Error(response.status + ": " + response.statusText);
  //   return response;
  // }


  render() {
    console.log("state", this.state);
    console.log("props", this.props);
    return (
      <table className="table table-striped table-bordered">
        <thead>
          <tr>
            <th scope="col" className="col-1">
              #
            </th>
            <th scope="col" className="col-2">
              Name
            </th>
            <th scope="col" className="col-7">
              Message
            </th>
            <th scope="col" className="col-2">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {this.state.messages.map((message, index) =>
            <Msg key={index} displayId={index + 1} id={message._id} name={message.name} msg={message.msg} deleteMsgCallback={this.handleDelete} />
          )}
        </tbody>
      </table>
    );
  }
};

module.exports = MsgList;
