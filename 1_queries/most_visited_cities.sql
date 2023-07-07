SELECT properties.city AS city, count(reservations.property_id) as total_reservations
FROM reservations
JOIN properties ON properties.id = property_id
GROUP BY city
ORDER BY total_reservations DESC;