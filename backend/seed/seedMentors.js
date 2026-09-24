require('dotenv').config();
const mongoose = require('mongoose');
const Mentor = require('../src/models/Mentor');

const mentors = [
  { name: 'Mentor One',   expertise: ['Java'],  experience: 5, availability: 'Monday-Friday' },
  { name: 'Mentor Two',   expertise: ['AI/ML'], experience: 4, availability: 'Weekends' },
  { name: 'Mentor Three', expertise: ['Web Development', 'DBMS'], experience: 6, availability: 'Evenings' },
];

(async () => {
  await mongoose.connect(process.env.MONGO_URI);
  await Mentor.deleteMany({});
  await Mentor.insertMany(mentors);
  console.log('Mentors seeded');
  process.exit(0);
})();