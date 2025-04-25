import prisma from "./prisma.js"

/**
 * Using Raw queries from Prisma.
 * See https://www.prisma.io/docs/orm/prisma-client/using-raw-sql/raw-queries
 */
const insert = async (userId, areaId) =>
    prisma.$executeRaw`INSERT INTO Subscription (userId, areaId)
                       VALUES (${userId}, ${areaId});`


const remove = async (userId, areaId) =>
    prisma.$executeRaw`DELETE
                       FROM Subscription
                       WHERE userId = ${userId}
                         AND areaId = ${areaId};`


export {
    insert,
    remove,
};

