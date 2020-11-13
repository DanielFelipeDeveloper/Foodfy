const db = require('../../config/db');
const { date } = require('../../lib/utils');

module.exports = {
  all(callback) {
    db.query('SELECT * FROM recipes', (err, results) => {
      if (err) throw `Database Error! ${err}`
      callback(results.rows)
    })
  },
  create(data, callback) {
    const query = `
      INSERT INTO recipes (
        image,
        title,
        ingredients,
        preparation,
        information,
        created_at
      ) VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING id
    `

    const values = [
      data.image,
      data.title,
      data.ingredients,
      data.preparation,
      data.information,
      date(Date.now()).iso
    ]

    db.query(query, values, (err, results) => {
      if (err) return res.send(`Database Error! ${err}`)

      callback(results.rows[0])
    })
  },
  find(id, callback) {
    db.query(`
      SELECT *
      FROM RECIPES
      WHERE ID = $1`, [id], (err, results) => {
        if (err) throw `Database Error! ${err}`
        callback(results.rows[0])
      })
  }
}