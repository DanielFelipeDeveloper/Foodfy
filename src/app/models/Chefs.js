const db = require('../../config/db');
const { date } = require('../../lib/utils');

module.exports = {
  all(callback) {
    db.query('SELECT * FROM chefs', (err, results) => {
      if (err) console.log(`Database Error! ${err}`)
      callback(results.rows)
    })
  },
  create(data, callback) {
    const query = `
      INSERT INTO chefs (
        name,
        avatar_url,
        created_at
      ) VALUES ($1, $2, $3)
      RETURNING id  
    `

    const values = [
      data.name,
      data.avatar_url,
      date(Date.now()).iso
    ]

    db.query(query, values, (err, results) => {
      if (err) return console.log(`Database Error! ${err}`)

      callback(results.rows[0])
    })
  },
  find(id, callback) {
    db.query(`
      SELECT chefs.*, count(recipes) AS total_recipes
      FROM chefs 
      LEFT JOIN recipes ON (recipes.chef_id = chefs.id)
      WHERE chefs.id = $1
      GROUP BY chefs.id`, [id], (err, results) => {
        if (err) console.log(`Database Error! ${err}`)
        callback(results.rows[0])
      })
  }
}