const mongoose = require('mongoose');
const { DateTime } = require('luxon'); // for date handling

const { Schema } = mongoose;

const authorSchema = new Schema({
  first_name: { type: String, required: true, maxLength: 100 },
  family_name: { type: String, required: true, maxLength: 100 },
  date_of_birth: { type: Date },
  date_of_death: { type: Date },
});

// Virtual for author "full" name.
authorSchema.virtual('name').get(function name() {
  return `${this.family_name}, ${this.first_name}`;
});

// Virtual for this author instance URL.
authorSchema.virtual('url').get(function url() {
  return `/catalog/author/${this._id}`;
});

authorSchema.virtual('lifespan').get(function lifespan() {
  let lifetimeString = '';
  if (this.date_of_birth) {
    lifetimeString = DateTime.fromJSDate(this.date_of_birth, { zone: 'utc' }).toLocaleString(DateTime.DATE_MED);
  }
  lifetimeString += ' - ';
  if (this.date_of_death) {
    lifetimeString += DateTime.fromJSDate(this.date_of_death, { zone: 'utc' }).toLocaleString(DateTime.DATE_MED);
  }
  return lifetimeString;
});

authorSchema.virtual('date_of_birth_yyyy_mm_dd').get(function dateOfBirthYyyyMmDd() {
  return DateTime.fromJSDate(this.date_of_birth, { zone: 'utc' }).toISODate(); // format 'YYYY-MM-DD'
});

authorSchema.virtual('date_of_death_yyyy_mm_dd').get(function dateOfDeathYyyyMmDd() {
  return DateTime.fromJSDate(this.date_of_death, { zone: 'utc' }).toISODate(); // format 'YYYY-MM-DD'
});

// Export model.
module.exports = mongoose.model('Author', authorSchema);
