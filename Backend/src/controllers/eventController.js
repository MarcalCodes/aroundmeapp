import * as Events from "../models/events.js"

const getEvent = async (id, res) => {
    const event = await Events.get(id)
    if (event) {
        res.json(event)
    } else {
        res.status(404).end()
    }
}

const createEvent = async (data, res) => {
    const { name, startsAt, endsAt, creatorId, areaId } = data
    await Events.insert(name, startsAt, endsAt, creatorId, areaId)
    res.status(201).end();
}

const updateEvent = async (id, data, res) => {
    const { name, startsAt, endsAt, creatorId, areaId } = data
    await Events.update(id, name, startsAt, endsAt, creatorId, areaId)
    res.status(200).end();
}

const cancelEvent = async (id, res) => {
    await Events.softDelete(id)
    res.status(200).end();
}

export {
    getEvent,
    createEvent,
    updateEvent,
    cancelEvent
}
