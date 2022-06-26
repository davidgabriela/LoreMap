const mongoose = require('mongoose')

const FolderSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    lore: {
      type: mongoose.Schema.ObjectId,
      ref: 'Lore',
      // required: true,
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
)
//Cascade delete documents when a folder is deleted
FolderSchema.pre('remove', async function (next) {
  await this.model('Document').deleteMany({ parent: this._id })
  next()
})

// Reverse populate with virtuals
FolderSchema.virtual('children', {
  ref: 'Document',
  localField: '_id',
  foreignField: 'parent',
  justOne: false,
})
module.exports = mongoose.model('Folder', FolderSchema)
