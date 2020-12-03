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
    Chefs.find(req.params.id, (chef) => {
      if(!chef) return res.send('Chef not found!')

      return res.render('admin/chefs/edit', { chef })
    })
  },
  post(req, res) {
    const keys = Object.keys(req.body)

    for (key of keys) {
      if (req.body[key] == "") return res.send("Please, fill all fields")
    }

    Chefs.create(req.body, (chef) => {
      return res.redirect(`/admin/chefs/${chef.id}`)
    })
  },
  put(req, res) {
    const keys = Object.keys(req.body)

    for (key of keys) {
      if (req.body[key] == "") return res.send("Please, fill all fields")
    }

    Chefs.update(req.body, () => {
      return res.redirect(`/admin/chefs/${req.body.id}`)
    })
  },
  delete(req, res) {
    Chefs.delete(req.body.id, () => {
      return res.redirect('/admin/chefs')
    })
  }
}