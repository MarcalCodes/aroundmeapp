import sql from "../db.js"

const insert = async (name, startsAt, endsAt, creatorId, areaId) =>
    sql`INSERT INTO event (name, starts_at, ends_at, creator_id, area_id)
        VALUES (${name}, ${startsAt}, ${endsAt}, ${creatorId}, ${areaId});`

const update = async (id, name, startsAt, endsAt, creatorId, areaId) =>
    sql`UPDATE event
        SET name      = ${name},
            starts_at  = ${new Date(startsAt)},
            ends_at    = ${new Date(endsAt)},
            creator_id = ${creatorId},
            area_id    = ${areaId},
            updated_at = ${new Date()}
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
