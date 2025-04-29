-- migrate:up
ALTER TABLE "user"
    RENAME COLUMN name TO firstname;

ALTER TABLE "user"
    ADD COLUMN lastname TEXT NOT NULL DEFAULT '',
    ADD COLUMN passwordHash TEXT NOT NULL DEFAULT '';

-- migrate:down
ALTER TABLE "user"
    RENAME COLUMN firstname TO name;

ALTER TABLE "user"
    DROP COLUMN lastname,
    DROP COLUMN passwordHash;

