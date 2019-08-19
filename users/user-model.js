const db = require("../data/db-config");

module.exports = {
  find,
  findById,
  findPosts,
  add
  // update,
  // remove
};

function find() {
  return db("users");
}

function findById(id) {
  return db("users")
    .where({ id })
    .first();
}

function findPosts(user_id) {
  return db("posts as p")
    .join("users as u", "u.id", "p.user_id")
    .select("p.id", "u.username", "p.contents")
    .where({ user_id })
    .first();
}

async function add(user) {
  const [id] = await db("users").insert(user);
  return findById(id);
}
