const Chef = require('../models/Chef');
const Recipe = require('../models/Recipe');

module.exports = {
  async index(req, res) {
    const recipes = await Recipe.all();

    return res.render('user/index', { recipes })
  },
  about(req, res) {
    res.render('user/about')
  },
  async chefs(req, res) {
    const chefs = await Chef.all();

    return res.render('user/chefs', { chefs });
  },
  async showAllRecipes(req, res) {
    const { filter } = req.query;

    if (filter) {
      Recipe.findByFilter(filter, (recipes) => {
        return res.render('user/recipes', { recipes })
      })
    } else {
      const recipes = await Recipe.all();

      return res.render('user/recipes', { recipes })
    }
  },
  showTheRecipe(req, res) {
    const recipeId = req.params.index

    Recipe.find(recipeId, (recipe) => {
      if (!recipe) return res.send('Recipe not found!')
      
      return res.render('user/recipe', { recipe })
    })
  }
}