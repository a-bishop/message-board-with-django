const React = require("react");
const Msg = require("./Msg.jsx");

class MsgList extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      messages: this.props.messages
    };

    this.deleteMessage = this.deleteMessage.bind(this);
  }


  deleteMessage(id) {
    // event.preventDefault();

    //save state vars to local
    // let name = this.state.name;
    // let msg = this.state.msg;
    fetch("http://localhost:3000/api/v1/msgs", {
      method: "DELETE",
      body: id
    })
      .then(response => this.handleHTTPErrors(response))
      .then(result => result.json())
      .then(result => {
        let newMsgs = this.state.messages.filter(msg => msg._id !== result.id);
        this.setState({
          messages: newMsgs
        });
      })
      .catch(error => {
        console.log(error);
      });
  };

  handleHTTPErrors(response) {
    if (!response.ok) throw Error(response.status + ": " + response.statusText);
    return response;
  }


  render() {
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
            <Msg key={index} displayId={index} id={message._id} name={message.name} msg={message.msg} deleteMsgCallback={this.deleteMessage} />
          )}
        </tbody>
      </table>
    );
  }
};

module.exports = MsgList;
