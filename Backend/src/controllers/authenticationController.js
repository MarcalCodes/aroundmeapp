/*
* Comes from: "https://www.npmjs.com/package/bcrypt"
* Comes from: "https://expressjs.com/en/resources/middleware/session.html"
* Comes from: "https://expressjs.com/en/4x/api.html#res.clearCookie"
* Comes from: "https://github.com/expressjs/session#destroying-a-session"
*/

import * as Users from "../models/users.js";
import bcrypt from 'bcrypt';

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const userResult = await Users.findByEmail(email);
    const user = userResult[0];

    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password.' });
    }

    const passwordMatch = await bcrypt.compare(password, user.passwordhash);

    if (!passwordMatch) {
      return res.status(401).json({ message: 'Invalid email or password.' });
    }

    req.session.user = {
      id: user.id,
      email: user.email,
      firstname: user.firstname,
      lastname: user.lastname
    };

    res.status(200).json({ message: 'Login successful.' });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Internal server error.' });
  }
};

export const logout = (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.error('Logout error:', err);
      return res.status(500).json({ message: 'Logout failed' });
    }

    res.clearCookie('connect.sid');
    res.status(200).json({ message: 'Logout successful.' });
  });
};
