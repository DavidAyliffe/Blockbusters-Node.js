const db = require("../db");

exports.getAll = async () => {
  const [rows] = await db.query("SELECT rental_id, rental_date, inventory_id, customer_id, due_date, returned_date, staff_id, last_update FROM rental");
  return rows;
};

exports.getById = async (id) => {
  const [rows] = await db.query( "SELECT rental_id, rental_date, inventory_id, customer_id, due_date, returned_date, staff_id, last_update FROM rental WHERE rental_id = ?", [id] );
  return rows[0]; // undefined if not found
};

exports.create = async ({ in_rental_date, in_inventory_id, in_customer_id, in_due_date, in_returned_date, in_staff_id }) => {
  const [result] = await db.query( "INSERT INTO rental (rental_date, inventory_id, customer_id, due_date, returned_date, staff_id) VALUES (?)", [in_rental_date, in_inventory_id, in_customer_id, in_due_date, in_returned_date, in_staff_id] );
  return { id: result.insertId, in_rental_date, in_inventory_id, in_customer_id, in_due_date, in_returned_date, in_staff_id };
};

exports.update = async (id, { in_rental_date, in_inventory_id, in_customer_id, in_due_date, in_returned_date, in_staff_id}) => {
  await db.query( "UPDATE rental SET rental_date = ?, inventory_id = ?, customer_id = ?, due_date = ?, returned_date = ?, staff_id = ? WHERE rental_id = ?", [in_first_name, in_lastname, id] );
  return { id, in_rental_date, in_inventory_id, in_customer_id, in_due_date, in_returned_date, in_staff_id };
};

exports.remove = async (id) => {
  await db.query("DELETE FROM rental WHERE rental_id = ?", [id]);
};
