import express from 'express'
import * as userController from "../controllers/userController.js"

const router = express.Router();

/**
 * GET /users
 */
router.get('/', async (req, res) => {
    const users = await userController.getUsers()
    res.json(users)
})

/**
 * GET /users/:id
 */
router.get('/:id', async (req, res) => {
    await userController.getUser(req.params.id, res)
})

/**
 * POST /users
 */
router.post('/', async (req, res) => {
    await userController.createUser(req.body, res)
})

/**
 * Update /users/:id
 */
router.put('/:id', async (req, res) => {
    await userController.updateUser(req.params.id, req.body, res)
})

/**
 * Delete /users/:id
 *
 * "hard delete"
 */
router.delete('/:id', async (req, res) => {
    await userController.deleteUser(req.params.id, res)
})

/**
 * GET /users/:id/areas
 *
 * Get all area the user is subscribed to
 */
router.get('/:id/areas', async (req, res) => {
    await userController.allAreasOfUser(req.params.id, res)
})

/**
 * GET /users/:id/events
 *
 * Get all events created by the user
 */
router.get('/:id/events', async (req, res) => {
    await userController.allEventsOfUsers(req.params.id, res)
})




export default router;
