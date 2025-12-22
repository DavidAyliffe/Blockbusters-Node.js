const db = require("../db");

exports.getAll = async () => {
  const [rows] = await db.query("SELECT country_id, name, last_update FROM country");
  return rows;
};

exports.getById = async (id) => {
  const [rows] = await db.query( "SELECT country_id, name, last_update FROM country WHERE country_id = ?", [id] );
  return rows[0]; // undefined if not found
};

exports.create = async ({ in_name }) => {
  const [result] = await db.query( "INSERT INTO country (name) VALUES (?)", [in_name] );
  return { id: result.insertId, in_first_name, in_lastname };
};

exports.update = async (id, { in_name }) => {
  await db.query( "UPDATE country SET name = ? WHERE country_id = ?", [in_name, id] );
  return { id, in_first_name, in_lastname };
};

exports.remove = async (id) => {
  await db.query("DELETE FROM country WHERE country_id = ?", [id]);
};
