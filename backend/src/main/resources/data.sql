INSERT INTO users (id, name, email, password, role) VALUES (1, 'Admin User', 'admin@cleanstreet.com', '$2a$10$8.cV.PzC.E4qI.k.1bW9x.h.2J.1m.8g.g.g.g.g.g.g.g.g.g.g.g.g.g.g.g.g.g', 'ADMIN');
INSERT INTO users (id, name, email, password, role) VALUES (2, 'Regular User', 'user@cleanstreet.com', '$2a$10$8.cV.PzC.E4qI.k.1bW9x.h.2J.1m.8g.g.g.g.g.g.g.g.g.g.g.g.g.g.g.g.g.g', 'USER');

INSERT INTO location (id, area_name, city, pincode) VALUES (1, 'Downtown', 'Metropolis', '10001');
INSERT INTO location (id, area_name, city, pincode) VALUES (2, 'Uptown', 'Metropolis', '10002');
 
INSERT INTO complaint (id, title, description, status, image_url, timestamp, user_id, location_id) VALUES (1, 'Pothole on Main St', 'Large pothole causing traffic issues.', 'OPEN', 'http://example.com/image1.jpg', NOW(), 2, 1);
INSERT INTO complaint (id, title, description, status, image_url, timestamp, user_id, location_id) VALUES (2, 'Graffiti in Central Park', 'Graffiti on the park benches.', 'IN_PROGRESS', 'http://example.com/image2.jpg', NOW(), 2, 2); 