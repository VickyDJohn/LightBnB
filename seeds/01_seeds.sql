INSERT INTO users (name, email, password)
VALUES 
('Bob Murray', 'bob@gmail.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.'),
('Curtis Werstuik', 'curtis@gmail.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.'),
('Jonny Loewen', 'jonny@gmail.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.');

INSERT INTO properties (owner_id, title, description, thumbnail_photo_url, cover_photo_url, cost_per_night, parking_spaces, number_of_bathrooms, number_of_bedrooms, country, street, city, province, post_code)
VALUES 
('1', 'Speed lamp', 'description', 'https://images.pexels.com/photos/2086676/pexels-photo-2086676.jpeg?auto=compress&cs=tinysrgb&h=350', 'https://images.pexels.com/photos/2086676/pexels-photo-2086676.jpeg',  '930', '4', '4', '5', 'Canada', 'Howee Rd', 'Abbotsford', 'BC', 'V0G 64V'),
('1', 'Slow lamp', 'description', 'https://images.pexels.com/photos/2086676/pexels-photo-2086676.jpeg?auto=compress&cs=tinysrgb&h=350', 'https://images.pexels.com/photos/2086676/pexels-photo-2086676.jpeg',  '250', '2', '1', '2', 'Canada', 'Richert St', 'Kelowna', 'BC', 'V1Y 64X'),
('2', 'Crown lamp', 'description', 'https://images.pexels.com/photos/2086676/pexels-photo-2086676.jpeg?auto=compress&cs=tinysrgb&h=350', 'https://images.pexels.com/photos/2086676/pexels-photo-2086676.jpeg',  '600', '3', '2', '4', 'Canada', 'Lamp St', 'Surrey', 'BC', 'V07 649');

INSERT INTO reservations (start_date, end_date, property_id, guest_id)
VALUES 
('2018-09-11', '2018-09-26', '2', '3'),
('2019-01-04', '2019-02-01', '2', '2'),
('2023-10-01', '2023-10-14', '1', '3');

INSERT INTO property_reviews (guest_id, property_id, reservation_id, rating, message)
VALUES 
('3', '2', '1', '3', 'message'),
('2', '2', '2', '4', 'message'),
('3', '1', '3', '4', 'message');