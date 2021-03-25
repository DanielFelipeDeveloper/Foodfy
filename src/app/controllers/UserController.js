const Recipe = require('../models/Recipe');
module.exports = {
  index(req, res) {
    Recipe.all((recipes) => {
      return res.render('user/index', { recipes })
    })
  },
  about(req, res) {
    res.render('user/about')
  },
  showAllRecipes(req, res) {
    const { filter } = req.query;

    if (filter) {
      Recipe.findByFilter(filter, (recipes) => {
        return res.render('user/recipes', { recipes })
      })
    } else {
      Recipe.all((recipes) => {
        return res.render('user/recipes', { recipes })
      })
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