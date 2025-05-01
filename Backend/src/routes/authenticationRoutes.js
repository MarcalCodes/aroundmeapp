/*
* Comes from: "https://expressjs.com/en/guide/routing.html"
*/


import express from 'express';
import * as authenticationController from '../controllers/authenticationController.js';
import {requireAuth} from "../middleware/authMiddleware.js";

const router = express.Router();

router.post('/login', authenticationController.login);

router.post('/logout', authenticationController.logout);

router.get('/me', requireAuth, (req, res) => {
  res.status(200).json({ user: req.session.user });
});

export default router;
