const mongoose = require('mongoose')

const DocumnetSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  content: {
    type: String,
  },
  lore: {
    type: mongoose.Schema.ObjectId,
    ref: 'Lore',
    // required: true,
  },
  parent: {
    type: mongoose.Schema.ObjectId,
    ref: 'Folder',
  },
})

module.exports = mongoose.model('Document', DocumnetSchema)
