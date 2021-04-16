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
  update(data) {
    const query = `
      UPDATE chefs SET
        name=($1),
      WHERE id = ($2)  
    `

    const values = [
      data.name,
      data.id
    ]

    return db.query(query, values);
  },
  delete(id) {
    return db.query(`DELETE from chefs WHERE id = $1`, [id]);
  }
}