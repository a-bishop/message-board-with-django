const React = require("react");
const MsgList = require("./MsgList.jsx");
const NewMsg = require("./NewMsg.jsx");

class MsgBoard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: this.props.messages
    };

    this.addMessage = this.addMessage.bind(this);
    this.deleteMessage = this.deleteMessage.bind(this);
  }


  handleHTTPErrors(response) {
    if (!response.ok) throw Error(response.status + ": " + response.statusText);
    return response;
  }

  componentDidMount() {
    fetch(`${process.env.API_URL}`)
      .then(response => this.handleHTTPErrors(response))
      .then(response => response.json())
      .then(result => {
        this.setState({
          messages: result,
        });
      })
      .catch(error => {
        console.log(error);
      });
  }

  deleteMessage(id) {
    let idObj = { "_id": id };
    fetch(`${process.env.API_URL}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(idObj)
    })
      .then(response => this.handleHTTPErrors(response))
      .then(result => result.json())
      .then(result => {
        let newMsgs = this.state.messages;
        newMsgs = newMsgs.filter(msg => msg._id !== result.id);
        this.setState({
          messages: newMsgs
        });
      })
      .catch(error => {
        console.log(error);
      });
  };

  addMessage(message) {
    console.log(message);
    fetch(`${process.env.API_URL}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(message)
    })
      .then(response => this.handleHTTPErrors(response))
      .then(result => result.json())
      .then(result => {
        console.log([result]);
        let newMsgs = [result].concat(this.state.messages)
        this.setState({
          messages: newMsgs
        });
      })
      .catch(error => {
        console.log(error);
      });
  }

  render() {
    return (
      <React.Fragment>
        <NewMsg addMsgCallback={this.addMessage} />
        <MsgList messages={this.state.messages} deleteMsgCallback={this.deleteMessage}/>
      </React.Fragment>
    );
  }
}

module.exports = MsgBoard;
