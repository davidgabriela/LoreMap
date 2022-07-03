const mongoose = require('mongoose')

const MapSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    default: 'New Map',
  },
  imageFile: {
    type: Object,
    default: { data: '' },
  },
  mapData: {
    type: Object,
    default: {},
  },
  lore: {
    type: mongoose.Schema.ObjectId,
    ref: 'Lore',
    // required: true,
  },
})

module.exports = mongoose.model('Map', MapSchema)
