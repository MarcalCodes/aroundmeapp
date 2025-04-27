-- migrate:up
ALTER TABLE area ADD COLUMN suburb TEXT NOT NULL;
ALTER TABLE area ADD COLUMN state TEXT NOT NULL;
ALTER TABLE area ALTER COLUMN postcode SET NOT NULL;

-- // We can have more than 1 suburb having the same postcode
ALTER TABLE area DROP CONSTRAINT area_postcode_key;

-- migrate:down

