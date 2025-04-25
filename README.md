# Around Me

Never miss an event happening close to you

## Purpose of the app

Around Me is an application allowing people to receive notifications when events happen around them.

A user can subscribe to some areas to receive notifications about local events happening around them.

A user can also create events in an area so that the event will be automatically advertised to the people who are
subscribed to this area

## Tools used

- Mysql
- Prisma, for the DB migrations and DB queries
- Raw SQL, to manipulate the data in the DB
- ExpressJS & JS, to code the API
- JetBrains HTTP Files, to play with the API

## Running the server locally

In a bash console:
```bash
# 1. Reset DB
npm run reset_db

# 2. Migrate DB (optional. Already done by `reset_db`)
npm run migrate

# 3. Generate Prisma Client
npm run genPrismaClient

# 4. Run the server
npm run dev

# 5. (Optional) Open Prisma Studio, to look into the DB
npm run studio
```


