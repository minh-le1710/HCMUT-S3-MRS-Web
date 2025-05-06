const db = require('../db');

async function findByEmail(email) {
  const { rows } = await db.query(
    'SELECT id, name, email, password_hash FROM users WHERE email = $1',
    [email]
  );
  return rows[0];
}

async function createUser({ name, email, passwordHash }) {
  const { rows } = await db.query(
    `INSERT INTO users (name, email, password_hash)
     VALUES ($1, $2, $3)
     RETURNING id, name, email, created_at`,
    [name, email, passwordHash]
  );
  return rows[0];
}

module.exports = { findByEmail, createUser };
