import sql from "../db.js"

const insert = async (userId, areaId) =>
    sql`INSERT INTO subscription (user_id, area_id)
        VALUES (${userId}, ${areaId});`


const remove = async (userId, areaId) =>
    sql`DELETE
        FROM subscription
        WHERE user_id = ${userId}
          AND area_id = ${areaId};`


export {
    insert,
    remove,
};

