const mongoose = require('mongoose');
const Mentor = require('../models/Mentor');

const isValidId = (id) => mongoose.Types.ObjectId.isValid(id);

// GET /api/mentors  (optional filter: ?expertise=Java)
exports.getMentors = async (req, res) => {
  try {
    const filter = {};
    if (req.query.expertise) {
      filter.expertise = { $regex: req.query.expertise, $options: 'i' };
    }
    const mentors = await Mentor.find(filter);
    res.status(200).json(mentors);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

// GET /api/mentors/:id
exports.getMentorById = async (req, res) => {
  try {
    if (!isValidId(req.params.id))
      return res.status(400).json({ message: 'Invalid mentor id' });

    const mentor = await Mentor.findById(req.params.id);
    if (!mentor) return res.status(404).json({ message: 'Mentor not found' });

    res.status(200).json(mentor);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

// POST /api/mentors  (ADMIN only)
exports.createMentor = async (req, res) => {
  try {
    const mentor = await Mentor.create(req.body);
    res.status(201).json(mentor);
  } catch (err) {
    if (err.name === 'ValidationError')
      return res.status(400).json({ message: err.message });
    res.status(500).json({ message: 'Server error' });
  }
};

// PUT /api/mentors/:id  (ADMIN only)
exports.updateMentor = async (req, res) => {
  try {
    if (!isValidId(req.params.id))
      return res.status(400).json({ message: 'Invalid mentor id' });

    const mentor = await Mentor.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!mentor) return res.status(404).json({ message: 'Mentor not found' });

    res.status(200).json(mentor);
  } catch (err) {
    if (err.name === 'ValidationError')
      return res.status(400).json({ message: err.message });
    res.status(500).json({ message: 'Server error' });
  }
};

// DELETE /api/mentors/:id  (ADMIN only)
exports.deleteMentor = async (req, res) => {
  try {
    if (!isValidId(req.params.id))
      return res.status(400).json({ message: 'Invalid mentor id' });

    const mentor = await Mentor.findByIdAndDelete(req.params.id);
    if (!mentor) return res.status(404).json({ message: 'Mentor not found' });

    res.status(200).json({ message: 'Mentor deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};