-- migrate:up

ALTER TABLE event ADD COLUMN image TEXT;

-- migrate:down
ALTER TABLE event DROP COLUMN image;



