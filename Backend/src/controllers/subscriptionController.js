import * as Subscriptions from "../models/subscriptions.js"

const createSubscription = async (data, res) => {
    const { userId, areaId } = data
    await Subscriptions.insert(userId, areaId)
    res.status(201).end();
}

const deleteSubscription = async (data, res) => {
    const { userId, areaId } = data
    await Subscriptions.remove(userId, areaId)
    res.status(200).end();
}

export {
    createSubscription,
    deleteSubscription
}
