const db = require('../../config/db');
const { date } = require('../../lib/utils');

module.exports = {
  all(callback) {
    db.query(`
      SELECT recipes.*, chefs.name AS chef_name
      from recipes
      LEFT JOIN chefs ON (chefs.id = recipes.chef_id)
      ORDER BY recipes.id`, (err, results) => {
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
      if (err) return console.log(`Database Error! ${err}`)

      callback(results.rows[0])
    })
  },
  find(id, callback) {
    db.query(`
      SELECT recipes.*, chefs.name AS chef_name
      from recipes
      LEFT JOIN chefs ON (chefs.id = recipes.chef_id)
      WHERE recipes.id = $1`, [id], (err, results) => {
        if (err) throw `Database Error! ${err}`
        callback(results.rows[0])
      })
  },
  findByChef(id, callback) {
    db.query(`
      SELECT *
      from recipes
      WHERE chef_id = $1
      ORDER BY id ASC`, [id], (err, results) => {
        if (err) throw `Database Error! ${err}`
        callback(results.rows)
      })
  },
  update(data, callback) {
    const query = `
      UPDATE recipes SET 
        image=($1),
        title=($2),
        ingredients=($3),
        preparation=($4),
        information=($5),
        updated_at=($6)
      WHERE id = ($7)
    `

    const values = [
      data.image,
      data.title,
      data.ingredients,
      data.preparation,
      data.information,
      date(Date.now()).iso,
      data.id
    ]

    db.query(query, values, (err, results) => {
      if (err) throw `Database Error! ${err}`

      return callback()
    })
  },
  delete(id, callback) {
    db.query(`DELETE from recipes WHERE id = $1`, [id], (err, results) => {
      if (err) throw `Database Error! ${err}`

      return callback()
    })
  }
}