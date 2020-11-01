const recipes = require('../../data');

module.exports = {
  index(req, res) {
    res.render('index', { recipes })
  },
  about(req, res) {
    res.render('about')
  },
  showAllRecipes(req, res) {
    res.render('recipes', { recipes })
  },
  showTheRecipe(req, res) {
    const recipeIndex = req.params.index

    const recipe = recipes.indexOf( (recipe) => {
        if (recipe == recipeIndex) {
            return true
        }
    })

    if(!recipe) {
        return res.send('recept not found')
    }
    
    return res.render('recipe', { item: recipes[recipeIndex] } )
  }
}