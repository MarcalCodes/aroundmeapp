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

const createUser = async (data, res) => {
    try {
        const { email, firstname, lastname, password } = data;
        const passwordHash = await bcrypt.hash(password, 10);
        const user = await Users.insert({ email, firstname, lastname, passwordHash });

        res.status(201).json(user);
    } catch (error) {
        console.error('Error creating user:', error);
        res.status(500).send('Internal Server Error');
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
