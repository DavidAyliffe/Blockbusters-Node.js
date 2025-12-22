const db = require("../db");

exports.getAll = async () => {
  const [rows] = await db.query("SELECT store_id, manager_staff_id, name, address_id, last_update FROM store");
  return rows;
};

exports.getById = async (id) => {
  const [rows] = await db.query("SELECT store_id, manager_staff_id, name, address_id, last_update FROM store WHERE store_id = ?", [id] );
  return rows[0]; // undefined if not found
};

exports.create = async ({ in_manager_staff_id, in_name, in_address_id }) => {
  const [result] = await db.query( "INSERT INTO store (manager_staff_id, name, address_id) VALUES (?, ?, ?)", [in_manager_staff_id, in_name, in_address_id] );
  return { id: result.insertId, in_manager_staff_id, in_name, in_address_id };
};

exports.update = async (id, { in_manager_staff_id, in_name, in_address_id}) => {
  await db.query( "UPDATE store SET manager_staff_id = ?, name = ?, address_id = ? WHERE store_id = ?", [in_manager_staff_id, in_name, in_address_id, id] );
  return { id, in_manager_staff_id, in_name, in_address_id };
};

exports.remove = async (id) => {
  await db.query("DELETE FROM store WHERE store_id = ?", [id]);
};
