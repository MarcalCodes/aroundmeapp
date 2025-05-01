-- migrate:up
ALTER TABLE "user"
    RENAME COLUMN name TO firstname;

ALTER TABLE "user"
    ADD COLUMN lastname TEXT NOT NULL,
    ADD COLUMN password_hash TEXT NOT NULL;

-- migrate:down
