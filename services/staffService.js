const db = require("../db");

exports.getAll = async () => {
  const [rows] = await db.query("SELECT staff_id, first_name, last_name, address_id, email, store_id, active, username, password_hash, manager_id, sex, last_update FROM staff");
  return rows;
};

exports.getById = async (id) => {
  const [rows] = await db.query("SELECT staff_id, first_name, last_name, address_id, email, store_id, active, username, password_hash, manager_id, sex, last_update FROM staff WHERE store_id = ?", [id] );
  return rows[0]; // undefined if not found
};

exports.create = async ({ in_first_name, in_last_name, in_address_id, in_email, in_store_id, in_active, in_username, in_password, in_manager_id, in_sex }) => {
  const [result] = await db.query( "INSERT INTO staff (first_name, last_name, address_id, email, store_id, active, username, password, manager_id, sex) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)", [in_first_name, in_last_name, in_address_id, in_email, in_store_id, in_active, in_username, in_password, in_manager_id, in_sex] );
  return { id: result.insertId, in_first_name, in_last_name, in_address_id, in_email, in_store_id, in_active, in_username, in_password, in_manager_id, in_sex };
};

exports.update = async (id, { in_manager_staff_id, in_name, in_address_id}) => {
  await db.query( "UPDATE staff SET first_name = ?, last_name = ?, address_id = ?, email = ?, store_id = ?, username = ?, password = ? manager_id = ?, sex = ? WHERE store_id = ?", [in_manager_staff_id, in_name, in_address_id, id] );
  return { id, in_first_name, in_last_name, in_address_id, in_email, in_store_id, in_active, in_username, in_password, in_manager_id, in_sex };
};

exports.remove = async (id) => {
  await db.query("DELETE FROM staff WHERE store_id = ?", [id]);
};
