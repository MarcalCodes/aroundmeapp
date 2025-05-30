# Around Me

Never miss an event happening close to you

## Purpose of the app

Around Me is an application allowing people to receive notifications when events happen around them.

A user can subscribe to some areas to receive notifications about local events happening around them.

A user can also create events in an area so that the event will be automatically advertised to the people who are
subscribed to this area

## Tools used

### Backend

- PostgresSQL, for the Database
- [dbmate](https://github.com/amacneil/dbmate), for the DB migrations
- [Postgres.js](https://github.com/porsager/postgres) and SQL, to query the DB
- Express.js & JS, to code the API
- JetBrains HTTP Files, to play with the API and write integration tests

### Frontend

- ReactJS & JS
- [Mantine](https://mantine.dev/), for the UI
- [Mapbox](https://www.mapbox.com/), to show the locations in the app

## Pre-requisite

1. Install Docker
2. Install `pg_dump` (needed for `dbmate`)     
   See https://www.bytebase.com/reference/postgres/how-to/how-to-install-pgdump-on-mac-ubuntu-centos-windows/
3. (Optional) If you want to see the Map(s) in the application, you need to set the `VITE_MAPBOX_KEY` environment variable in the `.env` file with a Mapbox API key     
   See https://console.mapbox.com/account/access-tokens/

## Backend - Running and migrating the DB

1. Copy the `Backend/.env.template` file and rename your copy to `Backend/.env`
2. In a bash console:
```bash
# Go in the Backend project
cd Backend

# Start the Docker compose, starting PostgresSQL server
npm run db_up

# Create the app DB and run the migrations
npm run db_migrate

# Optional. Stop the PostgresSQL server
npm run db_down
```

## Backend - Running the server locally

1. Copy the `Backend/.env.template` file and rename your copy to `Backend/.env`
2. In a bash console:
```bash
npm install
npm run dev
```

## Frontend - Running the app locally

1. Copy the `Frontend/.env.template` file and rename your copy to `Frontend/.env`
2. (Optional) Provide a Mapbox API key in the `.env` file so that the maps will load
3. In a bash console:
In a bash console:
```bash
npm install
npm run dev
```

