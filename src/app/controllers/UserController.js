const Recipes = require('../models/Recipes');
module.exports = {
  index(req, res) {
    Recipes.all((recipes) => {
      return res.render('user/index', { recipes })
    })
  },
  about(req, res) {
    res.render('user/about')
  },
  showAllRecipes(req, res) {
    const { filter } = req.query;

    if (filter) {
      Recipes.findByFilter(filter, (recipes) => {
        return res.render('user/recipes', { recipes })
      })
    } else {
      Recipes.all((recipes) => {
        return res.render('user/recipes', { recipes })
      })
    }
  },
  showTheRecipe(req, res) {
    const recipeId = req.params.index

    Recipes.find(recipeId, (recipe) => {
      if (!recipe) return res.send('Recipe not found!')
      
      return res.render('user/recipe', { recipe })
    })
  }
}