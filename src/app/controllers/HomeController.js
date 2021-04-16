const Chef = require('../models/Chef');
const File = require('../models/File');
const Recipe = require('../models/Recipe');

module.exports = {
  async index(req, res) {
    try {
      const recipes = await Recipe.all();

      for (recipe of recipes) {
        let file = await Recipe.files(recipe.id);
        let src = `${req.protocol}://${req.headers.host}${file[0].path.replace('public', '')}`;

        recipe.file_src = src;
      }

      return res.render('main/index', { recipes });
    } catch (err) {
      console.error(err);
    }
  },
  about(req, res) {
    res.render('main/about')
  },
  async chefs(req, res) {
    try {
      const chefs = await Chef.all();

      for (chef of chefs) {
        let file = await File.find(chef.file_id);
    
        let src = `${req.protocol}://${req.headers.host}${file.path.replace('public', '')}`;

        chef.file_src = src;
      }

      return res.render('main/chefs', { chefs });
    } catch (err) {
      console.error(err);
    }
  },
  async showAllRecipes(req, res) {
    try {
      const { filter } = req.query;

    async function addFileSrcInRecipe(recipes) {
      for (recipe of recipes) {
        let file = await Recipe.files(recipe.id);
        let src = `${req.protocol}://${req.headers.host}${file[0].path.replace('public', '')}`;
  
        recipe.file_src = src;
      }
    }
    
    if (filter) {
      const recipes = await Recipe.findByFilter(filter);

      await addFileSrcInRecipe(recipes);

      return res.render('main/recipes', { recipes, filter });
    } else {
      const recipes = await Recipe.all();

      await addFileSrcInRecipe(recipes);

      return res.render('main/recipes', { recipes })
    }

    } catch (err) {
      console.error(err);
    }
  },
  async showTheRecipe(req, res) {
    try {
      const recipeId = req.params.index;

      const recipe = await Recipe.find(recipeId);

      if (!recipe) return res.send('Recipe not found!');

      let files = await Recipe.files(recipeId);

      files = files.map(file => ({
        ...file,
        src: `${req.protocol}://${req.headers.host}${file.path.replace('public', '')}`
      }));

      return res.render('main/recipe', { recipe, files });
    } catch (err) {
        console.error(err);
    }
  }
}