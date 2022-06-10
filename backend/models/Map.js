const mongoose = require('mongoose')

const MapSchema = new mongoose.Schema({
  imageFile: {
    type: Object,
    default: { data: '' },
  },
  mapData: {
    type: String,
    default: 'No map data',
  },
  // lore: {
  //     type: mongoose.Schema.ObjectId,
  //     ref: "Lore",
  //     required: true
  // },
})

module.exports = mongoose.model('Map', MapSchema)
