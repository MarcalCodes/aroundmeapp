import * as Areas from "../models/areas.js"
import * as Users from "../models/users.js"
import * as Events from  "../models/events.js";

const getAreas = async () => {
    const areas = await Areas.all();
    return areas;
}

const getArea = async (id, res) => {
    const area = await Areas.get(id)
    if (area) {
        res.json(area)
    } else {
        res.status(404).end()
    }
}

const createArea = async (data, res) => {
    await Areas.insert(data.postcode)
    res.status(201).end();
}

const getAllUsersOfArea = async (id, res) => {
    const users = await Users.getUsersByAreaSubscription(id)
    res.json(users)
}

const getAllEventsOfArea = async  (id, res) => {
    const events = await Events.getEventsByArea(id)
    res.json(events)
}


export {
    getAreas,
    getArea,
    createArea,
    getAllUsersOfArea,
    getAllEventsOfArea,
}
