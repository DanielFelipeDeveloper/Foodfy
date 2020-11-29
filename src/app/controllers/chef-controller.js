const Chefs = require("../models/Chefs")
const Recipes = require("../models/Recipes")

module.exports = {
  index(req, res) {
    Chefs.all((chefs) => {
      return res.render('admin/chefs/index', { chefs })
    })
  },
  create(req, res) {
    return res.render('admin/chefs/create')
  },
  show(req, res) {
    Chefs.find(req.params.id, (chef) => {
      if (!chef) return res.send('Chef not found!')

      Recipes.findByChef(req.params.id, (recipes) => {
        return res.render('admin/chefs/show', { chef, recipes })
      })
    })
  },
  edit(req, res) {
    return res.render('admin/chefs/edit')
  },
  post(req, res) {
    const keys = Object.keys(req.body)

    for (key of keys) {
      if (req.body[key] == "") return res.send("Please, fill all fields")
    }

    Chefs.create(req.body, (chef) => {
      return res.redirect(`/admin/chefs/${chef.id}`)
    })
  }
}