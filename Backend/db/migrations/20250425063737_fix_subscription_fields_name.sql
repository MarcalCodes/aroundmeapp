-- migrate:up
ALTER TABLE "subscription"
    RENAME COLUMN areaId to user_id;
ALTER TABLE "subscription"
    RENAME COLUMN userId to area_id;

-- migrate:down

