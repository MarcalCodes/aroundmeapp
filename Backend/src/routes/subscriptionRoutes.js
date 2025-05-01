import express from 'express'
import * as subscriptionController from "../controllers/subscriptionController.js";
import {requireAuth} from "../middleware/authMiddleware.js";

const router = express.Router();

/**
 * POST /subscriptions
 *
 * A user subscribe to an Area
 */
router.post('/', requireAuth, async (req, res) => {
    await subscriptionController.createSubscription(req.body, res)
})

/**
 * Delete /subscriptions
 *
 * A user remove its subscription to an Area - "hard delete"
 */
router.delete('/', requireAuth, async (req, res) => {
    await subscriptionController.deleteSubscription(req.body, res)
})

export default router;
