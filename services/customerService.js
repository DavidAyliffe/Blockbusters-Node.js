const db = require("../db");

exports.getAll = async () => {
  const [rows] = await db.query("SELECT customer_id, store_id, first_name, last_name, email, password_hash, dob, parent_id, sex, address_id, active, created_date, last_update FROM customer");
  return rows;
};

exports.getById = async (id) => {
  const [rows] = await db.query( "SELECT customer_id, store_id, first_name, last_name, email, password_hash, dob, parent_id, sex, address_id, active, created_date, last_update FROM customer WHERE customer_id = ?", [id] );
  return rows[0]; // undefined if not found
};

exports.create = async ({ in_store_id, in_first_name, in_last_name, in_email, in_password_hash, in_dob, in_parent_id, in_sex, in_address_id, in_active }) => {
	const [result] = await db.query( "INSERT INTO customer (store_id, first_name, last_name, email, password_hash, dob, parent_id, sex, address_id, active) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)", [in_manager_staff_id, in_name, in_address_id] );
  return { id: result.insertId, in_store_id, in_first_name, in_last_name, in_email, in_password_hash, in_dob, in_parent_id, in_sex, in_address_id, in_active };
};

exports.update = async (id, { in_store_id, in_first_name, in_last_name, in_email, in_dob, in_parent_id, in_sex, in_address_id, in_active}) => {
  await db.query( "UPDATE customer SET first_name = ?, last_name = ?, email = ?, dob = ?, parent_id = ?, sex = ?, address_id = ?, active = ? WHERE customer_id = ?", [in_manager_staff_id, in_name, in_address_id, id] );
  return { id, in_store_id, in_first_name, in_last_name, in_email, in_dob, in_parent_id, in_sex, in_address_id, in_active };
};

exports.remove = async (id) => {
  await db.query("DELETE FROM customer WHERE customer_id = ?", [id]);
};
