import * as Users from "../models/users.js"
import * as Areas from "../models/areas.js"
import * as Events from "../models/events.js"
import bcrypt from 'bcrypt';

const getUsers = async () => {
    return Users.all()
}

const getUser = async (id, res) => {
    const user = await Users.get(id)
    if (user) {
        res.json(user)
    } else {
        res.status(404).end()
    }
}

/**
 * Comes from: "https://www.npmjs.com/package/bcrypt"
 * Comes from: "https://expressjs.com/en/resources/middleware/session.html"
 * Comes from: "https://expressjs.com/en/4x/api.html#res.clearCookie"
 * Comes from: "https://github.com/expressjs/session#destroying-a-session"
 */
const createUser = async (data, res) => {
    try {
        const { email, firstname, lastname, password } = data;
        const passwordHash = await bcrypt.hash(password, 10);
        const user = await Users.insert({ email, firstname, lastname, passwordHash });

        res.status(201).json(user);
    } catch (error) {
        const isDuplicate = error.message === "duplicate key value violates unique constraint \"user_email_key\""
        if (isDuplicate) {
            res.status(409).json({ message: "This email address is already used" })
        } else {
            console.error('Error creating user:', error);
            res.status(500).send('Internal Server Error');
        }
    }
};

const updateUser = async (id, data, res) => {
    await Users.update(id, data.email, data.firstname, data.lastname);
    res.status(200).end();
}

const deleteUser = async (id, res) => {
    await Users.remove(id)
    res.status(200).end();
}

const allAreasOfUser = async (id, res) => {
    const areas = await Areas.getAllAreasOfUser(id)
    res.json(areas)
}

const allEventsOfUsers = async (id, res) => {
    const events = await Events.getEventsByUser(id)
    res.json(events)
}

export {
    getUsers,
    getUser,
    createUser,
    updateUser,
    deleteUser,
    allAreasOfUser,
    allEventsOfUsers
}
