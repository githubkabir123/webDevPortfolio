const express5 = require('express');
const router = express5.Router();
const bcrypt = require('bcryptjs');
const jwt2 = require('jsonwebtoken');
const User = require('../models/User');


// Register (open by default, can be disabled by ALLOW_REGISTRATION=false)
router.post('/register', async (req, res) => {
try {
if (process.env.ALLOW_REGISTRATION === 'false') {
return res.status(403).json({ message: 'Registration is disabled' });
}
const { name, email, password } = req.body;
if (!email || !password) return res.status(400).json({ message: 'Email and password required' });


const existing = await User.findOne({ email });
if (existing) return res.status(400).json({ message: 'Email already in use' });


const passwordHash = await bcrypt.hash(password, 10);
const user = new User({ name, email, passwordHash });
await user.save();


const token = jwt2.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
res.json({ token, user: { _id: user._id, name: user.name, email: user.email } });
} catch (err) {
console.error(err);
res.status(500).json({ message: 'Server error' });
}
});


// Login
router.post('/login', async (req, res) => {
try {
const { email, password } = req.body;
if (!email || !password) return res.status(400).json({ message: 'Email and password required' });
const user = await User.findOne({ email });
if (!user) return res.json({ message: 'Invalid Email' });
const ok = await bcrypt.compare(password, user.passwordHash || '');
if (!ok) return res.json({ message: 'Invalid Password' });
const token = jwt2.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
res.json({ token, user: { _id: user._id, name: user.name, email: user.email } });
} catch (err) {
console.error(err);
res.status(500).json({ message: 'Server error' });
}
});

// Update Password
router.put('/update-password', async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;

    // Validate input
    if (!currentPassword || !newPassword) {
      return res.status(400).json({ message: 'Both current and new passwords are required.' });
    }

    // Verify JWT to get user ID
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return res.status(401).json({ message: 'Unauthorized, no token provided' });

    const decoded = jwt2.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.userId);

    if (!user) return res.status(404).json({ message: 'User not found' });

    // Check current password
    const isMatch = await bcrypt.compare(currentPassword, user.passwordHash);
    if (!isMatch) {
      return res.status(400).json({ message: 'Current password is incorrect' });
    }

    // Hash new password
    const newHashedPassword = await bcrypt.hash(newPassword, 10);
    user.passwordHash = newHashedPassword;
    await user.save();

    res.json({ message: 'Password updated successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});


module.exports = router;