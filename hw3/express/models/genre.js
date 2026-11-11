const mongoose = require('mongoose');

const { Schema } = mongoose;

const genreSchema = new Schema({
  name: { type: String, required: true, minLength: 3, maxLength: 100 },
});

// Virtual for this genre instance URL.
genreSchema.virtual('url').get(function url() {
  return `/catalog/genre/${this._id}`;
});

// Export model.
module.exports = mongoose.model('Genre', genreSchema);
