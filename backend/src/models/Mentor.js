const mongoose = require('mongoose');

const mentorSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    expertise: {
      type: [String],
      required: true,
      validate: (v) => Array.isArray(v) && v.length > 0,
    },
    experience: { type: Number, required: true, min: 0 },
    availability: { type: String, required: true, trim: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Mentor', mentorSchema);