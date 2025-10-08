const express6 = require('express');
const router2 = express6.Router();
const auth = require('../middleware/auth');
const User2 = require('../models/User');
const Project2 = require('../models/Project');
const Skill2 = require('../models/Skill');


// Get full profile (user + projects + skills)
router2.get('/', async (req, res) => {
try {
// const user = await User2.findById(req.userId).lean();
const user = await User2.find().lean();
// await User2.findByIdAndDelete("68a13bc2d5e6e7eab1eb645d");
if (!user) return res.status(404).json({ message: 'User not found' });
// const projects = await Project2.find({ user: req.userId }).lean();
const projects = await Project2.find().lean();
// const skills = await Skill2.find({ user: req.userId }).lean();
const skills = await Skill2.find().lean();
res.json({ user, projects, skills });
} catch (err) {
console.error(err);
res.status(500).json({ message: 'Server error' });
}
});


// Update profile (only allowed fields)
router2.put('/', auth, async (req, res) => {
try {
const allowed = ['name', 'profileImageSrc', 'profession', 'bioDetails', 'aboutME', 'aboutMeCoverImage', 'Email', 'phoneNumber', 'addressDetails', 'githubLink', 'linkedinLink', 'resumelink', 'fbLink', 'formendpoint'];
const update = {};
for (const k of allowed) if (req.body[k] !== undefined) update[k] = req.body[k];
const user = await User2.findByIdAndUpdate(req.userId, update, { new: true }).lean();
res.json({ user });
} catch (err) {
console.error(err);
res.status(500).json({ message: 'Server error' });
}
});


module.exports = router2;

