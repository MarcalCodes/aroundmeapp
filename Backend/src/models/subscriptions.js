import sql from "../db.js"

const getAll = async (userId) =>
  sql`SELECT a.*
      FROM subscription as s,
           area as a
      WHERE s.user_id = ${userId}
        AND s.area_id = a.id`

const insert = async (userId, areaId) =>
  sql`INSERT INTO subscription (user_id, area_id)
      VALUES (${userId}, ${areaId});`


const remove = async (userId, areaId) =>
  sql`DELETE
      FROM subscription
      WHERE user_id = ${userId}
        AND area_id = ${areaId};`


export {
  getAll,
  insert,
  remove,
};

