const db = require('../../config/db');
const File = require('./File');
const { date } = require('../../lib/utils');

module.exports = {
  async all() {
    const results = await db.query(`
      SELECT recipes.*, chefs.name AS chef_name
      from recipes
      LEFT JOIN chefs ON (chefs.id = recipes.chef_id)
      ORDER BY created_at DESC`);
      
    return results.rows;
  },
  async create(data) {
    const query = `
      INSERT INTO recipes (
        title,
        chef_id,
        ingredients,
        preparation,
        information,
        created_at
      ) VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING id
    `;

    const values = [
      data.title,
      Number(data.chef_id),
      data.ingredients,
      data.preparation,
      data.information,
      date(Date.now()).iso
    ];

    const results = await db.query(query, values);
    return results.rows[0];
  },
  async find(id) {
    const results = await db.query(`
      SELECT recipes.*, chefs.name AS chef_name
      from recipes
      LEFT JOIN chefs ON (chefs.id = recipes.chef_id)
      WHERE recipes.id = $1`, [id])
    
    return results.rows[0]
  },
  async createFile(values) {
    const file = await File.create({
      name: values.file.filename,
      path: values.file.path,
    });

    const query = `
      INSERT INTO recipe_files (
          recipe_id,
          file_id
      ) VALUES (
          $1,
          $2
      )
    `;

    return db.query(query, [values.recipe_id, file.id]);
  },
  async files(recipe_id) {
    const files = [];
    const query = `
      SELECT file_id FROM recipe_files 
      WHERE recipe_id = $1
    `
    const results = await db.query(query, [recipe_id])
    
    for (result of results.rows) {
      const file = await File.find(result.file_id);
      files.push(file);
    }

    return files;
  },
  async findByFilter(filter) {
    const results = await db.query(`
      SELECT recipes.*, chefs.name AS chef_name
      from recipes
      LEFT JOIN chefs ON (chefs.id = recipes.chef_id)
      WHERE recipes.title ILIKE '%${filter}%'
      ORDER BY updated_at DESC`);
    return results.rows;
  },
  async findByChef(id) {
    const results = await db.query(`
      SELECT *
      from recipes
      WHERE chef_id = $1
      ORDER BY id ASC`, [id]);

      return results.rows;
  },
  update(data) {
    const query = `
      UPDATE recipes SET 
        title=($1),
        chef_id=($2),
        ingredients=($3),
        preparation=($4),
        information=($5),
      WHERE id = ($6)
    `

    const values = [
      data.title,
      data.chef_id,
      data.ingredients,
      data.preparation,
      data.information,
      data.id
    ]

    return db.query(query, values);
  },
  delete(id) {
    return db.query(`DELETE from recipes WHERE id = $1`, [id]);
  }
}