# LightBnB

LightBnB is a property management application that allows users to search, book, and manage properties for short-term rentals. This README provides an overview of the project, installation instructions, usage examples, and additional information.

## Features

- User registration and authentication
- Property search and filtering options
- Booking management for users and property owners
- Property listing and management for property owners
- Review and rating system for properties

## Installation

1. Clone the repository: `git clone https://github.com/VickyDJohn/lightbnb.git`
2. Install dependencies: `cd LightBnB_WebApp-master`, `npm install`
3. Start the application: `npm run local`

## Usage

1. Register a new user account or log in with an existing account.
2. Explore the available properties by using the search and filter options.
3. View property details, including photos, amenities, and descriptions.
4. View current reservations
5. As a property owner, manage your properties, including adding new properties and viewing booking details.
6. Leave reviews and ratings for properties you have stayed at.
7. Leave reviews for owners or guests for each reservation.

## Project Structure

```
.
├── 1_queries
    ├── all_my_reservations.sql
    ├── average_length_of_reservation.sql
    ├── most_visited_cities.sql
    ├── property_listings_by_city.sql
    └── user_login.sql
├── LightBnB_WebApp-master
    ├── db
    │   ├── json
    │   └── database.js
    ├── public
    │   ├── javascript
    │   │   ├── components 
    │   │   │   ├── header.js
    │   │   │   ├── login_form.js
    │   │   │   ├── new_property_form.js
    │   │   │   ├── property_listing.js
    │   │   │   ├── property_listings.js
    │   │   │   ├── search_form.js
    │   │   │   └── signup_form.js
    │   │   ├── libraries
    │   │   ├── index.js
    │   │   ├── network.js
    │   │   └── views_manager.js
    │   ├── styles
    │   │   ├── main.css
    │   │   └── main.css.map
    │   └── index.html
    ├── routes
    │   ├── apiRoutes.js
    │   └── userRoutes.js
    ├── styles  
    │   ├── _forms.scss
    │   ├── _header.scss
    │   ├── _property-listings.scss
    │   └── main.scss
    ├── .gitignore
    ├── package-lock.json
    ├── package.json
    ├── README.md
    └── server.js
├── migrations
    └── 01_schema.sql
├── seeds
    ├── 01_seeds.sql
    ├── 02_seeds.sql
```

* `1_queries` contains various SQL queries
  * `all_my_reservations.sql` is a query to display all current reservations for a particular user
  * `average_length_of_reservation.sql` is a query to to check the average length of reservations made
  * `most_visited_cities.sql` is a query to list the most visited cities based on property reservations
  * `property_listings_by_city.sql` is a query that lists all the property listings in a particular city
  * `user_login.sql` is a query to show the name, email and password(encrypted) of a particular user
* `db` contains all the database interaction code.
  * `json` is a directory that contains a bunch of dummy data in `.json` files.
  * `database.js` is responsible for all queries to the database. It doesn't currently connect to any database, all it does is return data from `.json` files.
* `public` contains all of the HTML, CSS, and client side JavaScript. 
  * `index.html` is the entry point to the application. It's the only html page because this is a single page application.
  * `javascript` contains all of the client side javascript files.
    * `index.js` starts up the application by rendering the listings.
    * `network.js` manages all ajax requests to the server.
    * `views_manager.js` manages which components appear on screen.
    * `components` contains all of the individual html components. They are all created using jQuery.
* `routes` contains the router files which are responsible for any HTTP requests to `/users/something` or `/api/something`. 
* `styles` contains all of the sass files. 
* `server.js` is the entry point to the application. This connects the routes to the database.
* `migrations` contains the schema(s) of the database
  * `01_schema.sql` contains rhe schema of all the tables in the database
* `seeds` contains seed data
  * `01_seeds.sql` contains seed data for properties
  * `02_seeds.sql` contains seed data for users

## Technologies Used

- Node.js
- Express.js
- PostgreSQL
- HTML/CSS
- JavaScript