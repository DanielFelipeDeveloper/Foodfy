const db = require('../../config/db');
const File = require('../models/File');
const { date } = require('../../lib/utils');

module.exports = {
  async all() {
    const results = await db.query(`
      SELECT chefs.*, count(recipes) AS total_recipes
      FROM chefs
      LEFT JOIN recipes ON (recipes.chef_id = chefs.id)
      GROUP BY chefs.id
    `)
    return results.rows
  },
  async create(data) {
    const file = await File.create({
      name: data.file.filename,
      path: data.file.path,
    });

    const query = `
      INSERT INTO chefs (
        name,
        file_id,
        created_at
      ) VALUES ($1, $2, $3)
      RETURNING id  
    `;

    const values = [
      data.chef.name,
      file.id,
      date(Date.now()).iso
    ];

    const results = await db.query(query, values);
    return results.rows[0];
  },
  async find(id) {
    const results = await db.query(`
      SELECT chefs.*, count(recipes) AS total_recipes
      FROM chefs 
      LEFT JOIN recipes ON (recipes.chef_id = chefs.id)
      WHERE chefs.id = $1
      GROUP BY chefs.id`, [id]
    )
    return results.rows[0]
  },
  update(data, callback) {
    const query = `
      UPDATE chefs SET
        name=($1),
        avatar_url=($2),
        updated_at=($3)
      WHERE id = ($4)  
    `

    const values = [
      data.name,
      data.avatar_url,
      date(Date.now()).iso,
      data.id
    ]

    db.query(query, values, (err, results) => {
      if (err) throw `Database Error! ${err}`

      return callback()
    })
  },
  delete(id) {
    return db.query(`DELETE from chefs WHERE id = $1`, [id]);
  }
}