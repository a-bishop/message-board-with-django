const mongoose = require('mongoose');
const messageModel = mongoose.model('message');

// GET Request Handler
const getAllMessagesOrderedByLastPosted = (req, res) => {
  res.status(200).send('Successful API POST Request');
};

// POST Request Handler
const addNewMessage = (req, res) => {
  messageModel
  .find()
  .sort( {'_id': 'desc'} )
  .exec( (err, messages) => {
    if (err) {
      res.status(404).json(err);
    } else {
      res.status(200).json(messages);
    }
  });
};

module.exports = {
  getAllMessagesOrderedByLastPosted,
  addNewMessage
}