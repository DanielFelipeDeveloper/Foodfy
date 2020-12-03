const Chefs = require('../models/Chefs');
const Recipes = require('../models/Recipes');

module.exports = {
  index(req, res) {
    Recipes.all(recipes => {
      return res.render('admin/recipes/index', { recipes })
    })
  },
  create(req, res) {
    Chefs.all((chefs) => {
      return res.render('admin/recipes/create', { chefs })
    })
  },
  show(req, res) {
    Recipes.find(req.params.id, (recipe) => {
      if (!recipe) return res.send('Recipe not found!')
      
      return res.render('admin/recipes/show', { recipe })
    })
  },
  edit(req, res) {
    const recipeId = req.params.id

    Recipes.find(recipeId, (recipe) => {
      if (!recipe) return res.send('Recipe not found!')

      Chefs.all((chefs) => {
        return res.render('admin/recipes/edit', { recipe, chefs })
      })
    })

  },
  // HTTP METHODS //
  post(req, res) {
    const keys = Object.keys(req.body)

    for (key of keys) {
      if (req.body[key] == "") return res.send("Please, fill all fields")
    }

    Recipes.create(req.body, (recipes) => {
      return res.redirect(`/admin/recipes/${recipes.id}`)
    })
  },
  put(req, res) {
    const keys = Object.keys(req.body)

    for (key of keys) {
      if (req.body[key] == "")
        return res.send("Please Fill All Fields")
    }

    Recipes.update(req.body, () => {
      return res.redirect(`/admin/recipes/${req.body.id}`)
    })
  },
  delete(req, res) {
    const { id } = req.body
    
    Recipes.delete(id, () => {
      return res.redirect('/admin/recipes')
    })
  }
}