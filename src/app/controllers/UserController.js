const Chef = require('../models/Chef');
const File = require('../models/File');
const Recipe = require('../models/Recipe');

module.exports = {
  async index(req, res) {
    const recipes = await Recipe.all();

    for (recipe of recipes) {
      let file = await Recipe.files(recipe.id);
      let src = `${req.protocol}://${req.headers.host}${file[0].path.replace('public', '')}`;

      recipe.file_src = src;
    }

    return res.render('user/index', { recipes })
  },
  about(req, res) {
    res.render('user/about')
  },
  async chefs(req, res) {
    const chefs = await Chef.all();

    for (chef of chefs) {
      let file = await File.find(chef.file_id);
  
      let src = `${req.protocol}://${req.headers.host}${file.path.replace('public', '')}`;

      chef.file_src = src;
    }

    return res.render('user/chefs', { chefs });
  },
  async showAllRecipes(req, res) {
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

      return res.render('user/recipes', { recipes, filter });
    } else {
      const recipes = await Recipe.all();

      await addFileSrcInRecipe(recipes);

      return res.render('user/recipes', { recipes })
    }
  },
  async showTheRecipe(req, res) {
    const recipeId = req.params.index

    const recipe = await Recipe.find(recipeId);

    if (!recipe) return res.send('Recipe not found!')

    let files = await Recipe.files(recipeId);

    files = files.map(file => ({
      ...file,
      src: `${req.protocol}://${req.headers.host}${file.path.replace('public', '')}`
    }));

    return res.render('user/recipe', { recipe, files })
  }
}