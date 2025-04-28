-- migrate:up

-- Insert 1 user with ID = 0
INSERT INTO public."user" (id, email, name)
VALUES (0, 'testuser@example.com', 'Test User');

-- Insert 3 areas
INSERT INTO public.area (postcode, suburb, state)
VALUES
    ('2428', 'Forster', 'NSW'),
    ('2428', 'Boomerang Beach', 'NSW'),
    ('2428', 'Tuncurry', 'NSW');

-- Insert 5 events for Forster (area_id = 1)
INSERT INTO public.event (name, starts_at, ends_at, creator_id, area_id)
VALUES
    ('Forster Farmers Market', '2025-05-05 09:00:00', '2025-05-01 13:00:00', 0, 1),
    ('Beach Yoga Session', '2025-05-07 07:30:00', '2025-05-02 09:00:00', 0, 1),
    ('Forster Art Fair', '2025-05-09 10:00:00', '2025-05-04 16:00:00', 0, 1),
    ('Community BBQ', '2025-05-06 12:00:00', '2025-05-06 15:00:00', 0, 1),
    ('Twilight Cinema', '2025-05-20 18:30:00', '2025-05-08 21:00:00', 0, 1);

-- Insert 5 events for Boomerang Beach (area_id = 2)
INSERT INTO public.event (name, starts_at, ends_at, creator_id, area_id)
VALUES
    ('Boomerang Surf Carnival', '2025-05-03 08:00:00', '2025-05-03 14:00:00', 0, 2),
    ('Beach Clean-Up Day', '2025-05-05 09:00:00', '2025-05-05 11:00:00', 0, 2),
    ('Sunset Beach Run', '2025-05-07 17:00:00', '2025-05-07 19:00:00', 0, 2),
    ('Open Mic at Beach Café', '2025-05-09 19:00:00', '2025-05-09 22:00:00', 0, 2),
    ('Outdoor Yoga by the Sea', '2025-05-11 07:00:00', '2025-05-11 08:00:00', 0, 2);

-- Insert subscriptions for user 0
INSERT INTO public.subscription (user_id, area_id)
VALUES
    (0, 1),
    (0, 2),
    (0, 3);

-- migrate:down

-- Delete subscriptions for user 0
DELETE FROM public.subscription
WHERE user_id = 0;

-- Delete events created by user 0
DELETE FROM public.event
WHERE creator_id = 0;

-- Delete the 3 areas
DELETE FROM public.area
WHERE suburb IN ('Forster', 'Boomerang Beach', 'Tuncurry');

-- Delete user 0
DELETE FROM public."user"
WHERE id = 0;
