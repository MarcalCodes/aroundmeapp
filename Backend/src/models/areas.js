import sql from "../db.js"

const insert = async (postcode) =>
    sql`INSERT INTO area (postcode)
        VALUES (${postcode});`

const get = async (id) =>
    sql`SELECT *
        FROM area
        WHERE id = ${id};`

const findByPostcodeSuburbAndState = async (postcode, suburb, state) =>
  sql`SELECT *
        FROM area
        WHERE postcode = ${postcode} AND suburb = ${suburb.toUpperCase()} AND state = ${state.toUpperCase()};`

const all = async () =>
    sql`SELECT *
        FROM area;`

const getAllAreasOfUser = async (userId) =>
    sql`SELECT a.*
        FROM subscription as s,
             area as a
        WHERE s.user_id = ${userId}
          AND s.area_id = a.id;` // joining subscription and area tables on subscription::area_id and area:id fields

export {
    all,
    get,
    findByPostcodeSuburbAndState,
    insert,
    getAllAreasOfUser
};

