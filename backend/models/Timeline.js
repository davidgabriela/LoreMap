const mongoose = require('mongoose')

const TimelineSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  lore: {
    type: mongoose.Schema.ObjectId,
    ref: 'Lore',
    // required: true,
  },
})

module.exports = mongoose.model('Timeline', TimelineSchema)
