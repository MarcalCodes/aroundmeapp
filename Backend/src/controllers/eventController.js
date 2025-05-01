import * as Events from "../models/events.js"

const getEvent = async (id, res) => {
  const events = await Events.get(id)

  if (!events || events.lenghth === 0) {
    res.status(404).end()
  } else {
    res.json(events[0])
  }
}

const createEvent = async (data, session, res) => {
  const creatorId = session.user.id

  const {
    title, startsAt, endsAt, areaId, image, addressLine1, addressLine2, addressCity, addressState, addressPostcode
  } = data;

  try {
    const events = await Events.insert(
      title, startsAt, endsAt, creatorId, areaId, image, addressLine1, addressLine2, addressCity, addressState, addressPostcode
    );

    const createdEvent = events[0]

    res.status(201).json({ id: createdEvent.id });
  } catch (e) {
    console.log(e)

    res.status(500).end();
  }
};

const updateEvent = async (id, data, res) => {
  const {
    name, startsAt, endsAt, creatorId, areaId, img, address_line1, address_line2, city, state, postcode
  } = data;

  await Events.update(
    id, name, startsAt, endsAt, creatorId, areaId, img, address_line1, address_line2, city, state, postcode
  )

  res.status(200).end();
};


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
