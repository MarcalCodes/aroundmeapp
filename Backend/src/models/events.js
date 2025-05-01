import sql from "../db.js"
import * as Areas from "./areas.js"

const insert = async (
  name,
  startsAt,
  endsAt,
  creatorId,
  areaId,
  img,
  address_line1,
  address_line2,
  suburb,
  state,
  postcode
) => {
  const areas = await Areas.findByPostcodeSuburbAndState(postcode, suburb, state)

  if (areas.length === 0) {
    throw new Error(`No Areas found for suburb: ${suburb} ${postcode} ${state}`)
  }
  else if (areas.length > 1) {
    throw new Error(`More than one area match the suburb: ${suburb} ${postcode} ${state}`)
  }
  else {
    const area = areas[0]
    const areaId = area.id

    return sql`INSERT INTO event (name, starts_at, ends_at, creator_id, area_id, image,
                           address_line1, address_line2, city, state, postcode)
        VALUES (${name}, ${startsAt}, ${endsAt}, ${creatorId}, ${areaId}, ${img},
                ${address_line1}, ${address_line2}, ${suburb}, ${state}, ${postcode})
            RETURNING id;`
  }
}


const update = async (
  id,
  name,
  startsAt,
  endsAt,
  creatorId,
  areaId,
  img,
  address_line1,
  address_line2,
  city,
  state,
  postcode
) =>
  sql`UPDATE event
      SET name          = ${name},
          starts_at     = ${new Date(startsAt)},
          ends_at       = ${new Date(endsAt)},
          creator_id    = ${creatorId},
          area_id       = ${areaId},
          image         = ${img},
          address_line1 = ${address_line1},
          address_line2 = ${address_line2},
          city          = ${city},
          state         = ${state},
          postcode      = ${postcode},
          updated_at    = ${new Date()}
      WHERE id = ${id};`

const softDelete = async (id) =>
  sql`UPDATE event
      SET canceled_at = ${new Date()},
          updated_at  = ${new Date()}
      WHERE id = ${id};`

const get = async (id) =>
  sql`SELECT *
      FROM event
      WHERE id = ${id};`


const getEventsByUser = async (userId) =>
  sql`SELECT *
      FROM event
      WHERE creator_id = ${userId};`

const getEventsByArea = async (areaId) =>
  sql`SELECT *
      FROM event
      WHERE area_id = ${areaId};`


export {
  get,
  insert,
  update,
  softDelete,
  getEventsByUser,
  getEventsByArea,
};
