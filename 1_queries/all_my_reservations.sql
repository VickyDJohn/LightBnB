SELECT reservations.id, properties.title as title, properties.cost_per_night, start_date, AVG(property_reviews.rating) as average_rating
FROM reservations
JOIN properties ON properties.id = property_id
JOIN users ON guest_id = users.id
JOIN property_reviews ON reservations.guest_id = property_reviews.guest_id
WHERE reservations.guest_id = 1
GROUP BY reservations.id, title, properties.cost_per_night, start_date
ORDER BY start_date
LIMIT 10;