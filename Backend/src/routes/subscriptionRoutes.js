import express from 'express'
import * as subscriptionController from "../controllers/subscriptionController.js";
import {requireAuth} from "../middleware/authMiddleware.js";

const router = express.Router();

/**
 * GET /subscriptions
 *
 * Return all the subscriptions of a User
 */
router.get('/', requireAuth, async (req, res) => {
    await subscriptionController.getAll(req.session, res)
})

/**
 * POST /subscriptions/:area_id
 *
 * A user subscribe to an Area
 */
router.post('/:area_id', requireAuth, async (req, res) => {
    await subscriptionController.createSubscription(req.params.area_id, req.session, res)
})

/**
 * Delete /subscriptions/:area_id
 *
 * A user remove its subscription to an Area - "hard delete"
 */
router.delete('/:area_id', requireAuth, async (req, res) => {
    await subscriptionController.deleteSubscription(req.params.area_id, req.session, res)
})

export default router;
