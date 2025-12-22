const db = require("../db");

exports.getAll = async () => {
  const [rows] = await db.query("SELECT actor_id, first_name, last_name, sex, last_update FROM actor");
  return rows;
};

exports.getById = async (id) => {
  const [rows] = await db.query( "SELECT actor_id, first_name, last_name, sex, last_update FROM actor WHERE actor_id = ?", [id] );
  return rows[0]; // undefined if not found
};

exports.create = async ({ in_first_name, in_lastname }) => {
  const [result] = await db.query( "INSERT INTO actor (first_name, last_name, sex) VALUES (?)", [in_first_name, in_lastname, in_sex] );
  return { id: result.insertId, in_first_name, in_lastname, in_sex };
};

exports.update = async (id, { in_first_name, in_lastname, in_sex }) => {
  await db.query( "UPDATE actor SET first_name = ?, last_name = ?, sex = ? WHERE actor_id = ?", [in_first_name, in_lastname, in_sex, id] );
  return { id, in_first_name, in_lastname };
};

exports.remove = async (id) => {
  await db.query("DELETE FROM actor WHERE actor_id = ?", [id]);
};
