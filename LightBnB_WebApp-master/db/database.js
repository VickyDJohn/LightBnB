const properties = require("./json/properties.json");
const users = require("./json/users.json");
const { Pool } = require('pg');

const pool = new Pool({
  user: 'labber',
  password: 'labber',
  host: 'localhost',
  database: 'lightbnb'
});

/// Users

/**
 * Get a single user from the database given their email.
 * @param {String} email The email of the user.
 * @return {Promise<{}>} A promise to the user.
 */
const getUserWithEmail = function(email) {
  return pool
    .query(`
    SELECT * FROM users
    WHERE email = $1;
  `, [email])
    .then(result => {
      if (result.rows) {
        return result.rows[0]; // Return the first user object
      } else {
        return null; // Return null if user does not exist
      }
    })
    .catch(err => {
      console.log(err.message);
    });
};

/**
 * Get a single user from the database given their id.
 * @param {string} id The id of the user.
 * @return {Promise<{}>} A promise to the user.
 */
const getUserWithId = function(id) {
  return pool
    .query(`
    SELECT * FROM users
    WHERE id = $1;
  `, [id])
    .then(result => {
      if (result.rows) {
        return result.rows[0]; // Return the first user object
      } else {
        return null; // Return null if user does not exist
      }
    })
    .catch(err => {
      console.log(err.message);
    });
};

/**
 * Add a new user to the database.
 * @param {{name: string, password: string, email: string}} user
 * @return {Promise<{}>} A promise to the user.
 */
const addUser = function(user) {
  return pool
    .query(`
    INSERT INTO users (name, email, password)
    VALUES ($1, $2, $3)
    RETURNING *;
  `, [user.name, user.email, user.password])
    .then(result => {
      return result.rows[0]; // Return the newly inserted user object
    })
    .catch(err => {
      console.log(err.message);
    });
};

/// Reservations

/**
 * Get all reservations for a single user.
 * @param {string} guest_id The id of the user.
 * @return {Promise<[{}]>} A promise to the reservations.
 */
const getAllReservations = function(guest_id, limit = 10) {
  return pool
    .query(`
    SELECT reservations.*, properties.*, start_date, AVG(property_reviews.rating) as average_rating
    FROM reservations
    JOIN properties ON properties.id = property_id
    JOIN users ON guest_id = users.id
    JOIN property_reviews ON reservations.guest_id = property_reviews.guest_id
    WHERE reservations.guest_id = $1
    GROUP BY reservations.id, properties.id
    LIMIT $2;
  `, [guest_id, limit = 10])
    .then(result => {
      return result.rows;
    })
    .catch(err => {
      console.log(err.message);
    });
};

/// Properties

/**
 * Get all properties.
 * @param {{}} options An object containing query options.
 * @param {*} limit The number of results to return.
 * @return {Promise<[{}]>}  A promise to the properties.
 */
const getAllProperties = function(options, limit = 10) {
  const queryParams = [];

  let queryStr =
    `
      SELECT DISTINCT properties.*, AVG(property_reviews.rating) as average_rating
      FROM properties
      JOIN property_reviews ON property_reviews.property_id = properties.id
    `;

  if (options.city) {
    queryParams.push(`%${options.city}%`);
    queryStr += `WHERE city ILIKE $${queryParams.length}`;
  }

  if (options.owner_id) {
    queryParams.push(options.owner_id);
    queryStr += `${queryParams.length > 1 ? 'AND' : 'WHERE'} owner_id = $${queryParams.length} `;
  }

  if (options.maximum_price_per_night || options.minimum_price_per_night) {
    if (options.maximum_price_per_night !== undefined && !options.minimum_price_per_night) {
      const maxPrice = options.maximum_price_per_night * 100;
      queryParams.push(maxPrice);
      queryStr += `${queryParams.length > 1 ? 'AND' : 'WHERE'} cost_per_night <= $${queryParams.length} `;
    } else if (options.minimum_price_per_night !== undefined && !options.maximum_price_per_night) {
      const minPrice = options.minimum_price_per_night * 100;
      queryParams.push(minPrice);
      queryStr += `${queryParams.length > 1 ? 'AND' : 'WHERE'} cost_per_night >= $${queryParams.length} `;
    } else if (options.minimum_price_per_night !== undefined && options.maximum_price_per_night !== undefined) {
      const minPrice = options.minimum_price_per_night * 100;
      const maxPrice = options.maximum_price_per_night * 100;
      queryParams.push(minPrice, maxPrice);
      queryStr += `${queryParams.length > 2 ? 'AND' : 'WHERE'} cost_per_night >= $${queryParams.length - 1} AND cost_per_night <= $${queryParams.length} `;
    }
  }

  if (options.minimum_rating) {
    queryParams.push(options.minimum_rating);
    queryStr += `${queryParams.length > 1 ? 'AND' : 'WHERE'} property_reviews.rating >= $${queryParams.length} `;
  }

  queryParams.push(limit);
  queryStr +=
    `
      GROUP BY properties.id
      ORDER BY cost_per_night
      LIMIT $${queryParams.length};
    `;

  console.log(queryStr, queryParams);

  return pool.query(queryStr, queryParams).then((res) => res.rows);
};

/**
 * Add a property to the database
 * @param {{}} property An object containing all of the property details.
 * @return {Promise<{}>} A promise to the property.
 */
const addProperty = (property) => {
  const {
    owner_id,
    title,
    description,
    thumbnail_photo_url,
    cover_photo_url,
    cost_per_night,
    street,
    city,
    province,
    post_code,
    country,
    parking_spaces,
    number_of_bathrooms,
    number_of_bedrooms
  } = property;

  const costInCents = cost_per_night * 1000; // Convert cost_per_night to cents

  return pool
    .query(`
      INSERT INTO properties (owner_id, title, description, thumbnail_photo_url, cover_photo_url, cost_per_night, street, city, province, post_code, country, parking_spaces, number_of_bathrooms, number_of_bedrooms)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14)
      RETURNING *;
    `, [owner_id, title, description, thumbnail_photo_url, cover_photo_url, costInCents, street, city, province, post_code, country, parking_spaces, number_of_bathrooms, number_of_bedrooms])
    .then(result => {
      return result.rows; // Return the saved property object
    })
    .catch(err => {
      console.log(err.message);
    });
};

module.exports = {
  getUserWithEmail,
  getUserWithId,
  addUser,
  getAllReservations,
  getAllProperties,
  addProperty,
};
