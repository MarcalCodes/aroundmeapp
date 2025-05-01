import * as Subscriptions from "../models/subscriptions.js"

const getAll = async (session, res) => {
  const userId = session.user.id
  const subscriptions = await Subscriptions.getAll(userId)
  res.json(subscriptions);
}

const createSubscription = async (areaId, session, res) => {
  const userId = session.user.id
  await Subscriptions.insert(userId, areaId)
  res.status(201).end();
}

const deleteSubscription = async (areaId, session, res) => {
  const userId = session.user.id
  await Subscriptions.remove(userId, areaId)
  res.status(200).end();
}

export {
  getAll,
  createSubscription,
  deleteSubscription
}
