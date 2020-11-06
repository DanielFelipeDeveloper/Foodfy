const data = require('../../data.json');
const recipes = data.recipes;

module.exports = {
  index(req, res) {
    return res.render('admin/index', { recipes })
  },
  create(req, res) {
    return res.render('admin/create')
  },
  show(req, res) {
    const recipeId = req.params.id

    const foundRecipe = recipes.find((recipe) => {
      return recipe.id == recipeId
    })

    if (!foundRecipe) return 'Recipe not found!'

    return res.render('admin/show', { recipe : recipes[foundRecipe.id - 1] })
  },
  edit(req, res) {
    const recipeId = req.params.id

    const foundRecipe = recipes.find((recipe) => {
      return recipe.id == recipeId
    })

    if (!foundRecipe) return 'Recipe not found!'

    return res.render('admin/edit', { recipe: recipes[foundRecipe.id - 1] })
  },
  // HTTP METHODS //
  post(req, res) {
    
  },
  put(req, res) {

  },
  delete(req, res) {

  }
}