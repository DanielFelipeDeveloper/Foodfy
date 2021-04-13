const db = require("../../config/db");
const fs = require('fs');

module.exports = {
  async create({ name, path }) {
    const query = `
      INSERT INTO files (
        name,
        path
      ) VALUES ($1, $2)
      RETURNING id
    `

    const results = await db.query(query, [name, path]);
    return results.rows[0];
  },
  async find(id) {
    const results = await db.query(`
      SELECT * FROM files 
      WHERE id = $1
    `, [id])

    return results.rows[0]
  },
  async update(id, file, oldFile) {
    try {
      fs.unlinkSync(oldFile.path);

      const query = `
        UPDATE files SET
          name=($1),
          path=($2)
        WHERE id = ($3)
      `;

      const values = [
        file.filename,
        file.path,
        id
      ];

      return await db.query(query, values);
    } catch (err) {
      console.error(err);
    }
  },
  async delete(id, isRecipe) {
    try {
      const result = await db.query(`SELECT * FROM files WHERE id = $1`, [id]);
      const file = result.rows[0];

      fs.unlinkSync(file.path);

      if (isRecipe) {
        await db.query(`
          DELETE FROM recipe_files WHERE file_id = $1
        `, [id])
      }

      return db.query(`
        DELETE FROM files WHERE id = $1
      `, [id])
    } catch (err) {
      console.error(err);
    }
  }
}