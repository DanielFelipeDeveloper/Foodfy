const Chefs = require('../models/Chef');
const Recipe = require('../models/Recipe');
const File = require('../models/File');

module.exports = {
  index(req, res) {
    Recipe.all(recipes => {
      return res.render('admin/recipes/index', { recipes })
    })
  },
  async create(req, res) {
    const chefs = await Chefs.all()

    return res.render('admin/recipes/create', { chefs })
  },
  async show(req, res) {
    const { id } = req.params
    const recipe = await Recipe.find(id)

    if (!recipe) {
      return res.send('Recipe not found!')
    } 

    const files = await Recipe.files(id);

    res.render('admin/recipes/show', { recipe, files })
  },
  async edit(req, res) {
    const recipeId = req.params.id

    const recipe = await Recipe.find(recipeId)

    if (!recipe) return res.send('Recipe not found!')

    const chefs = await Chefs.all();

    let files = await Recipe.files(recipeId);

    files = files.map(file => ({
      ...file,
      src: `${req.protocol}://${req.headers.host}${file.path.replace('public', '')}`
    }));

    return res.render('admin/recipes/edit', { recipe, chefs, files })
  },
  // HTTP METHODS //
  async post(req, res) {
    const keys = Object.keys(req.body)

    for (key of keys) {
      if (req.body[key] == "") return res.send("Please, fill all fields")
    }

    const recipe = await Recipe.create(req.body);

    const recipeFilesPromises = req.files.map((file) =>
      Recipe.createFile({ file, recipe_id: recipe.rows[0].id })
    );

    await Promise.all(recipeFilesPromises);

    return res.redirect(`/admin/recipes/${recipe.rows[0].id}`)
  },
  async put(req, res) {
    const keys = Object.keys(req.body);

    for (key of keys) {
      if (req.body[key] == "" && key != "removed_files") {
        return res.send('Please, fill all fields!');
      }
    }

    if (req.files.length != 0) {
      const newFilesPromise = req.files.map(file => 
        Recipe.createFile({ file, recipe_id: req.body.id })
      )

      await Promise.all(newFilesPromise);
    }

    if (req.body.removed_files) {
      let removedFiles = req.body.removed_files.split(',');
      const lastIndex = removedFiles.length - 1;
      removedFiles.splice(lastIndex, 1);

      const removedFilesPromise = removedFiles.map(id => File.delete(id));

      await Promise.all(removedFilesPromise);
    }

    await Recipe.update(req.body);

    return res.redirect(`/admin/recipes/${req.body.id}`);
  },
  delete(req, res) {
    Recipe.delete(req.body.id, () => {
      return res.redirect('/admin/recipes')
    })
  }
}