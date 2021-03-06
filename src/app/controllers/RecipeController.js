const Chefs = require('../models/Chef');
const Recipe = require('../models/Recipe');
const File = require('../models/File');

module.exports = {
  async index(req, res) {
    let recipes = await Recipe.all();

    for (recipe of recipes) {
      let file = await Recipe.files(recipe.id);
      let src = `${req.protocol}://${req.headers.host}${file[0].path.replace('public', '')}`;

      recipe.file_src = src;
    }

    return res.render('admin/recipes/index', { recipes });
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

    let files = await Recipe.files(id);

    files = files.map(file => ({
      ...file,
      src: `${req.protocol}://${req.headers.host}${file.path.replace('public', '')}`
    }));

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
      Recipe.createFile({ file, recipe_id: recipe.id })
    );

    await Promise.all(recipeFilesPromises);

    return res.redirect(`/admin/recipes/${recipe.id}`)
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

      const removedFilesPromise = removedFiles.map(id => File.delete(id), true);

      await Promise.all(removedFilesPromise);
    }

    await Recipe.update(req.body);

    return res.redirect(`/admin/recipes/${req.body.id}`);
  },
  async delete(req, res) {
    const { id } = req.body;

    const files = await Recipe.files(id);

    const removedFilesPromise = files.map(file => File.delete(file.id));
    await Promise.all(removedFilesPromise);

    await Recipe.delete(id);

    return res.redirect('/admin/recipes');
  }
}