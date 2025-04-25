import express from 'express'
import * as eventController from "../controllers/eventController.js";

const router = express.Router();

/**
 * GET /events/:id
 *
 * Get the details of a particular event
 */
router.get('/:id', async (req, res) => {
    await eventController.getEvent(req.params.id, res)
})

/**
 * POST /events
 *
 * Create a new event
 */
router.post('/', async (req, res) => {
    await eventController.createEvent(req.body, res)
})

/**
 * Update /events/:id
 *
 * Update an existing event
 */
router.put('/:id', async (req, res) => {
    await eventController.updateEvent(req.params.id, req.body, res)
})

/**
 * Delete /events/:id
 *
 * Cancel an event - will do a "soft delete" in DB
 */
router.delete('/:id', async (req, res) => {
    await eventController.cancelEvent(req.params.id, res)
})

export default router;
