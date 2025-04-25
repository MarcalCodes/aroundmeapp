import prisma from "./prisma.js"

/**
 * Using Raw queries from Prisma.
 * See https://www.prisma.io/docs/orm/prisma-client/using-raw-sql/raw-queries
 */
const insert = async (postcode) =>
    prisma.$executeRaw`INSERT INTO Area (postcode)
                       VALUES (${postcode});`

const get = async (id) =>
    prisma.$queryRaw`SELECT *
                     FROM Area
                     WHERE id = ${id};`

const all = async () =>
    prisma.$queryRaw`SELECT *
                     FROM Area;`

const getAllAreasOfUser = async (userId) =>
    prisma.$queryRaw`SELECT a.*
                     FROM Subscription as s,
                          Area as a
                     WHERE s.userId = ${userId}
                       AND s.areaId = a.id;` // joining Subscription and Area tables on Subscription::areaId and Area:id fields



export {
    all,
    get,
    insert,
    getAllAreasOfUser
};

