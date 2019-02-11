const mongoose = require('mongoose');
const messageModel = mongoose.model('message');

// GET Request Handler
const getAllMessagesOrderedByLastPosted = (req, res) => {
  res.status(200).send('Successful API GET Request');
};

// POST Request Handler
const addNewMessage = (req, res) => {
  res.status(200).send('Successful API POST Request');
};

module.exports = {
  getAllMessagesOrderedByLastPosted,
  addNewMessage
}