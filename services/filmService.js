const db = require("../db");

exports.getAll = async () => {
  const [rows] = await db.query("SELECT film_id, title, description, release_year, language_id, original_language_id, rental_duration, rental_rate, sequel_id, length, replacement_cost, rating, special_features last_update FROM film");
  return rows;
};

exports.getById = async (id) => {
  const [rows] = await db.query( "SELECT film_id, title, description, release_year, language_id, original_language_id, rental_duration, rental_rate, sequel_id, length, replacement_cost, rating, special_features last_update FROM film WHERE film_id = ?", [id] );
  return rows[0]; // undefined if not found
};

exports.create = async ({ in_title, in_description, in_release_year, in_language_id, in_original_language_id, in_rental_duration, in_rental_rate, in_sequel_id, in_length, in_replacement_cost, in_rating, in_special_features }) => {
  const [result] = await db.query( "INSERT INTO film (title, description, release_year, language_id, original_language_id, rental_duration, rental_rate, sequel_id, length, replacement_cost, rating, special_features) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)", [in_title, in_description, in_release_year, in_language_id, in_original_language_id, in_rental_duration, in_rental_rate, in_sequel_id, in_length, in_replacement_cost, in_rating, in_special_features] );
  return { id: result.insertId, in_title, in_description, in_release_year, in_language_id, in_original_language_id, in_rental_duration, in_rental_rate, in_sequel_id, in_length, in_replacement_cost, in_rating, in_special_features };
};

exports.update = async (id, { in_title, in_description, in_release_year, in_language_id, in_original_language_id, in_rental_duration, in_rental_rate, in_sequel_id, in_length, in_replacement_cost, in_rating, in_special_features }) => {
  await db.query( "UPDATE film SET title = ?, description = ?, release_year = ?, language_id = ?, original_language_id = ?, rental_duration = ?, rental_rate = ?, sequel_id = ?, length = ?, replacement_cost = ?, rating = ?, special_features = ? WHERE film_id = ?", [fname, lname, id] );
  return { id, in_title, in_description, in_release_year, in_language_id, in_original_language_id, in_rental_duration, in_rental_rate, in_sequel_id, in_length, in_replacement_cost, in_rating, in_special_features };
};

exports.remove = async (id) => {
  await db.query("DELETE FROM film WHERE film_id = ?", [id]);
};
