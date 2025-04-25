import sql from "../db.js"

const insert = async (email, name) =>
    sql`INSERT INTO "user" (email, name)
        VALUES (${email}, ${name});`

const update = async (id, email, name) =>
    sql`UPDATE "user"
        SET email     = ${email},
            name      = ${name},
            updated_at = ${new Date()}
        WHERE id = ${id};`

const remove = async (id) =>
    sql`DELETE
        FROM "user"
        WHERE id = ${id};`

const get = async (id) =>
    sql`SELECT *
        FROM "user"
        WHERE id = ${id};`

const all = async () =>
    sql`SELECT *
        FROM "user";`

const getUsersByAreaSubscription = async (areaId) =>
    sql`SELECT u.*
        FROM subscription as s,
             "user" as u
        WHERE s.area_id = ${areaId}
          AND s.user_id = u.id;` // joining subscription and user tables on subscription::userId and user::id fields

export {
    all,
    get,
    insert,
    update,
    remove,
    getUsersByAreaSubscription
};
