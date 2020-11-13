const data = require('../../data.json');
const fs = require('fs');
const { date } = require('../../lib/utils');
const Recipes = require('../models/Recipes');

module.exports = {
  index(req, res) {
    Recipes.all(recipes => {
      return res.render('admin/index', { recipes })
    })
  },
  create(req, res) {
    return res.render('admin/create')
  },
  show(req, res) {
    Recipes.find(req.params.id, (recipe) => {
      if (!recipe) return res.send('Recipe not found!')
      
      return res.render('admin/show', { recipe })
    })
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
    const keys = Object.keys(req.body)

    for (key of keys) {
      if (req.body[key] == "") return res.send("Please, fill all fields")
    }

    Recipes.create(req.body, (recipes) => {
      return res.redirect(`/admin/recipes/${recipes.id}`)
    })

    
  },
  put(req, res) {
    const { id } = req.body
    let index = 0

    const foundRecipe = data.recipes.find(function (recipe, foundIndex) {
      if (id == recipe.id) {
        index = foundIndex
        return true
      }
    })

    if (!foundRecipe) return res.send('Recipe not found!')

    
    const recipe = {
      id: Number(id),
      ...foundRecipe,
      ...req.body
    }

    data.recipes[index] = recipe

    fs.writeFile("src/data.json", JSON.stringify(data, null, 2), (err) => {
      if (err) return res.send(`Write File Error! ${err}`)

      return res.redirect(`/admin/recipes/${id}`)
    })
  },
  delete(req, res) {
    const { id } = req.body
    
    const foundRecipes = data.recipes.filter((recipe) => {
      return recipe.id != id
    })

    data.recipes = foundRecipes

    fs.writeFile('src/data.json', JSON.stringify(data, null, 2), (err) => {
      if (err) return res.send(`Write File Error! ${err}`)

      return res.redirect('/admin/recipes')
    })
  }
}