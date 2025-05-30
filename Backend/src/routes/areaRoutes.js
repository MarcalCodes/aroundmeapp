import express from 'express'
import * as areaController from "../controllers/areaController.js";
import {requireAuth} from "../middleware/authMiddleware.js";

const router = express.Router();

/**
 * GET /areas
 */
router.get('/', async (req, res) => {
    const areas = await areaController.getAreas()
    res.json(areas)
})

/**
 * GET /areas/:id
 */
router.get('/:id', requireAuth, async (req, res) => {
    await areaController.getArea(req.params.id, res)
})

/**
 * POST /areas
 */
router.post('/', requireAuth, async (req, res) => {
    await areaController.createArea(req.body, res)
})

/**
 * GET /areas/:id/users
 *
 * Get all the users subscribed to this area
 */
router.get('/:id/users', requireAuth, async (req, res) => {
    await areaController.getAllUsersOfArea(req.params.id, res)
})

/**
 * GET /areas/:id/events
 *
 * Get all the events happening to this area
 */
router.get('/:id/events', requireAuth, async (req, res) => {
    await areaController.getAllEventsOfArea(req.params.id, res)
})




export default router;
