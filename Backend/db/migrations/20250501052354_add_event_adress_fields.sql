-- migrate:up

ALTER TABLE public.event
    ADD COLUMN address_line1 TEXT NOT NULL,
    ADD COLUMN address_line2 TEXT,
    ADD COLUMN city TEXT NOT NULL,
    ADD COLUMN state TEXT NOT NULL,
    ADD COLUMN postcode TEXT NOT NULL;

-- migrate:down
