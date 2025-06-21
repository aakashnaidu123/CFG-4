  const bcrypt = require('bcrypt');
  const jwt = require('jsonwebtoken');
  const { User } = require('../models');

  const SECRET = process.env.JWT_SECRET || 'your_jwt_secret';

  exports.register = async (req, res) => {
    try {
      const { name, email, password, role, ngo_name } = req.body;

      if (!name || !email || !password || !role) {
        return res.status(400).json({ error: 'Name, email, password, and role are required.' });
      }
      if (password.length < 6) {
        return res.status(400).json({ error: 'Password must be at least 6 characters long.' });
      }
      if (!['cry_frontliner', 'ngo_partner', 'admin'].includes(role)) {
          return res.status(400).json({ error: 'Invalid role provided.' });
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      const user = await User.create({ name, email, password: hashedPassword, role, ngo_name });
      
      res.status(201).json({ message: 'User registered successfully' });
    } catch (err) {
      
      if (err.name === 'SequelizeUniqueConstraintError') {
        return res.status(409).json({ error: 'Registration failed. Email already in use.' });
      }
      res.status(500).json({ error: 'Registration failed', details: err.message });
    }
  };

  exports.login = async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ where: { email } });
      if (!user) return res.status(404).json({ error: 'User not found' });

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) return res.status(401).json({ error: 'Invalid credentials' });

      
    const token = jwt.sign({ id: user.id, role: user.role }, SECRET, { expiresIn: '1d' });
    res.json({ message: 'Login successful', token, user: { id: user.id, name: user.name, role: user.role } });
  } catch (err) {
    res.status(500).json({ error: 'Login failed', details: err.message });
  }
};

exports.getNgoPartners = async (req, res) => {
  try {
    const ngos = await User.findAll({
      where: { role: 'ngo_partner' },
      attributes: ['id', 'name', 'email', 'ngo_name'],
    });
    res.json(ngos);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch NGO partners', details: err.message });
  }
};
