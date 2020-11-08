const data = require('../../data.json');
const fs = require('fs');
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
    const keys = Object.keys(req.body)

    for (key of keys) {
      if (req.body[key] == "") return res.send("Please, fill all fields")
    }

    let { title, author, image, ingredients, preparation, information } = req.body

    const id = Number(recipes.length + 1)

    data.recipes.push({
      id,
      title,
      author,
      image,
      ingredients,
      preparation,
      information,
    })

    fs.writeFile("src/data.json", JSON.stringify(data, null, 2), (err) => {
      if (err) return res.send(`Write file error: ${err}`)

      return res.redirect('/admin/recipes')
    })
  },
  put(req, res) {

  },
  delete(req, res) {

  }
}