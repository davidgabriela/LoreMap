const mongoose = require('mongoose')

const EventSchema = new mongoose.Schema({
  title: {
    type: String,
  },
  information: {
    type: String,
  },
  color: {
    type: String,
  },
  timeline: {
    type: mongoose.Schema.ObjectId,
    ref: 'Timeline',
    // required: true,
  },
})

module.exports = mongoose.model('Event', EventSchema)
