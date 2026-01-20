const db = require("../db");

exports.getAll = async () => {
  const [rows] = await db.query("SELECT payment_id, customer_id, staff_id, rental_id, amount, payment_date FROM payment");
  return rows;
};

exports.getById = async (id) => {
  const [rows] = await db.query("SELECT payment_id, customer_id, staff_id, rental_id, amount, payment_date FROM payment WHERE payment_id = ?", [id] );
  return rows[0]; // undefined if not found
};

exports.create = async ({ in_customer_id, in_staff_id, in_rental_id, in_amount, in_payment_date }) => {
  const [result] = await db.query( "INSERT INTO payment (customer_id, staff_id, rental_id, amount, payment_date) VALUES (?, ?, ?, ?, ?)", [in_customer_id, in_staff_id, in_rental_id, in_amount, in_payment_date] );
  return { id: result.insertId, in_rental_date, in_inventory_id, in_customer_id, in_staff_id };
};

exports.update = async (id, { in_customer_id, in_staff_id, in_rental_id, in_amount, in_payment_date }) => {
  await db.query( "UPDATE payment SET customer_id = ?, staff_id = ?, rental_id = ?, amount = ?, payment_date = ? WHERE payment_id = ?", [in_customer_id, in_staff_id, in_rental_id, in_amount, in_payment_date, id] );
  return { id, in_rental_date, in_inventory_id, in_customer_id, in_staff_id };
};

exports.remove = async (id) => {
  await db.query("DELETE FROM payment WHERE payment_id = ?", [id]);
};
