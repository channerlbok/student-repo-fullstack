const mongoose = require('mongoose');
const { DateTime } = require('luxon'); //for date handling

const { Schema } = mongoose;

const bookInstanceSchema = new Schema({
  book: { type: Schema.ObjectId, ref: 'Book', required: true }, // Reference to the associated book.
  imprint: { type: String, required: true },
  status: {
    type: String,
    required: true,
    enum: ['Available', 'Maintenance', 'Loaned', 'Reserved'],
    default: 'Maintenance',
  },
  due_back: { type: Date, default: Date.now },
});

// Virtual for this bookinstance object's URL.
bookInstanceSchema.virtual('url').get(function url() {
  return `/catalog/bookinstance/${this._id}`;
});

bookInstanceSchema.virtual('due_back_formatted').get(function dueBackFormatted() {
  return DateTime.fromJSDate(this.due_back, { zone: 'utc' }).toLocaleString(DateTime.DATE_MED);
});

bookInstanceSchema.virtual('due_back_yyyy_mm_dd').get(function dueBackYyyyMmDd() {
  return DateTime.fromJSDate(this.due_back, { zone: 'utc' }).toISODate(); //format 'YYYY-MM-DD'
});

// Export model.
module.exports = mongoose.model('BookInstance', bookInstanceSchema);
