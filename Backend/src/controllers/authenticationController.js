/*
* Comes from see: "https://www.npmjs.com/package/bcrypt"
* Comes from see: "https://expressjs.com/en/resources/middleware/session.html"
*/


import * as Users from "../models/users.js";
import bcrypt from 'bcrypt';

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;


    const userResult = await Users.findByEmail(email);
    const user = userResult[0]; // Assuming userResult is an array

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
