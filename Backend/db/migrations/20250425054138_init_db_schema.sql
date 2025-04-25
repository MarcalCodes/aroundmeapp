-- migrate:up
CREATE TABLE "user"
(
    id         BIGSERIAL PRIMARY KEY,
    email      TEXT                     NOT NULL UNIQUE,
    name       TEXT                     NOT NULL,

    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE
);

CREATE TABLE "area"
(
    id         BIGSERIAL PRIMARY KEY,
    postcode   TEXT UNIQUE,

    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE "subscription"
(
    user_id    BIGINT                   NOT NULL references "user" (id),
    area_id    BIGINT                   NOT NULL references "area" (id),

    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,

    PRIMARY KEY (user_id, area_id)
);

CREATE TABLE "event"
(
    id          BIGSERIAL PRIMARY KEY,
    name        TEXT                     NOT NULL,
    starts_at   TIMESTAMP WITH TIME ZONE NOT NULL,
    ends_at     TIMESTAMP WITH TIME ZONE NOT NULL,
    creator_id  BIGINT                   NOT NULL references "user" (id),
    area_id     BIGINT                   NOT NULL references "area" (id),
    canceled_at TIMESTAMP WITH TIME ZONE,

    created_at  TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at  TIMESTAMP WITH TIME ZONE
);


-- migrate:down
