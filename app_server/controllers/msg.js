"use strict";
const React = require("react");
const ReactDOMServer = require("react-dom/server");
require('es6-promise').polyfill();
require('isomorphic-fetch');

const MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/msgsdb";

require("@babel/register")({
  presets: ["@babel/preset-react"]
});

// Transpile and add the React Components
const Header = React.createFactory(require("../components/Header.jsx"));
const Footer = React.createFactory(require("../components/Footer.jsx"));
const MsgBoard = React.createFactory(require("../components/MsgBoard.jsx"));


function handleHTTPErrors(response) {
  if (!response.ok) throw Error(response.status + ": " + response.statusText);
  return response;
}

// index handler
const renderIndex = (req, res, msgs) => {
  res.render('index', {
    title: 'ICS 221 Universal JS Msg Board',
    header: ReactDOMServer.renderToString(Header()),
    footer: ReactDOMServer.renderToString(Footer()),
    msgBoard: ReactDOMServer.renderToString(MsgBoard(
      { messages: msgs }
    )),
    props: '<script>let messages=' + JSON.stringify(msgs.sort((a, b) => a.id - b.id)) + '</script>'
  });
};

const getMessages = (req, res) => {
  fetch('http://localhost:3003/msgs')
  .then(response=> handleHTTPErrors(response))
  .then(result=> result.json())
  .then(result=> {
    if (!(result instanceof Array)) {
      console.error('API lookup error');
      result = [];
    } else {
      renderIndex(req, res, result);
    }
  })
  .catch(error=> {
    console.log(error);
  });
}

module.exports = {
  getMessages
};
