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
  }

  componentDidMount() {
    fetch("http://localhost:3000/api/v1/msgs")
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

  handleHTTPErrors(response) {
    if (!response.ok) throw Error(response.status + ": " + response.statusText);
    return response;
  }

  async addMessage(message) {
    await fetch("http://localhost:3000/api/v1/msgs", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(message)
    })
      .then(response => this.handleHTTPErrors(response))
      .then(result => result.json())
      .then(result => {
        console.log(result);
        let newMsgs = [result].concat(this.state.messages);
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
        <MsgList messages={this.state.messages}/>
      </React.Fragment>
    );
  }
}

module.exports = MsgBoard;
