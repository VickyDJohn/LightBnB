SELECT properties.id, title, cost_per_night, AVG(property_reviews.rating) AS average_ratings
FROM properties
JOIN property_reviews ON property_reviews.property_id = properties.id
WHERE city LIKE '%ancouve%'
GROUP BY properties.id, title, cost_per_night
HAVING AVG(property_reviews.rating) >= 4
ORDER BY cost_per_night ASC
LIMIT 10;