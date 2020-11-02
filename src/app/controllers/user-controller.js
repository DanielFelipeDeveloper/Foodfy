const data = require('../../data.json');
const recipes = data.recipes;

module.exports = {
  index(req, res) {
    res.render('user/index', { recipes })
  },
  about(req, res) {
    res.render('user/about')
  },
  showAllRecipes(req, res) {
    res.render('user/recipes', { recipes })
  },
  showTheRecipe(req, res) {
    const recipeIndex = req.params.index

    const recipe = recipes.find((recipe) => {
        if (recipe.id == recipeIndex) {
            return true
        }
    })

    if(!recipe) {
        return res.send('recipe not found')
    }
    
    return res.render('user/recipe', { item: recipes[recipeIndex - 1] })
  }
}