import sql from "../db.js"

const insert = async ({email, firstname, lastname, passwordHash}) =>
  sql`INSERT INTO "user" (email, firstname, lastname, passwordhash)
          VALUES (${email}, ${firstname}, ${lastname}, ${passwordHash})
              RETURNING id, email, firstname, lastname;`;

const update = async (id, email, firstname, lastname) =>
  sql`UPDATE "user"
      SET email      = ${email},
          firstname  = ${firstname},
          lastname   = ${lastname},
          updated_at = ${new Date()}
      WHERE id = ${id};`;

const remove = async (id) =>
  sql`DELETE
      FROM "user"
      WHERE id = ${id};`;

const get = async (id) =>
  sql`SELECT id, email, firstname, lastname
      FROM "user"
      WHERE id = ${id};`;

const all = async () =>
  sql`SELECT id, email, firstname, lastname
      FROM "user";`;

const getUsersByAreaSubscription = async (areaId) =>
  sql`SELECT u.id, u.email, u.firstname, u.lastname
      FROM subscription As s
               JOIN "user" As u ON s.user_id = u.id
      WHERE s.area_id = ${areaId};`;

const findByEmail = async  (email) =>
  sql `SELECT * FROM "user" WHERE email = ${email};`;


export {
  all,
  get,
  insert,
  update,
  remove,
  getUsersByAreaSubscription,
  findByEmail
};
