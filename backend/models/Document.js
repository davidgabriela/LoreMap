const mongoose = require('mongoose')

const DocumnetSchema = new mongoose.Schema({
  documentContent: {
    type: String,
  },
  lore: {
    type: mongoose.Schema.ObjectId,
    ref: 'Lore',
    // required: true,
  },
})

module.exports = mongoose.model('Document', DocumnetSchema)
