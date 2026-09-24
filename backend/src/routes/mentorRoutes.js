const express = require('express');
const router = express.Router();
const c = require('../controllers/mentorController');

// TODO: Member 1 will provide authenticate + authorizeRoles.
// Once available, add them like this:
// const { authenticate, authorizeRoles } = require('../middleware/auth');
// router.get('/', authenticate, authorizeRoles('USER', 'ADMIN'), c.getMentors);

// USER and ADMIN can view mentors
router.get('/', c.getMentors);
router.get('/:id', c.getMentorById);

// ADMIN only can manage mentors
router.post('/', c.createMentor);
router.put('/:id', c.updateMentor);
router.delete('/:id', c.deleteMentor);

module.exports = router;