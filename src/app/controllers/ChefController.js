const Chef = require("../models/Chef")
const Recipe = require("../models/Recipe")

module.exports = {
  index(req, res) {
    Chef.all((chefs) => {
      return res.render('admin/chefs/index', { chefs })
    })
  },
  create(req, res) {
    return res.render('admin/chefs/create')
  },
  show(req, res) {
    Chef.find(req.params.id, (chef) => {
      if (!chef) return res.send('Chef not found!')

      Recipe.findByChef(req.params.id, (recipes) => {
        return res.render('admin/chefs/show', { chef, recipes })
      })
    })
  },
  edit(req, res) {
    Chef.find(req.params.id, (chef) => {
      if(!chef) return res.send('Chef not found!')

      return res.render('admin/chefs/edit', { chef })
    })
  },
  post(req, res) {
    const keys = Object.keys(req.body)

    for (key of keys) {
      if (req.body[key] == "") return res.send("Please, fill all fields")
    }

    Chef.create(req.body, (chef) => {
      return res.redirect(`/admin/chefs/${chef.id}`)
    })
  },
  put(req, res) {
    const keys = Object.keys(req.body)

    for (key of keys) {
      if (req.body[key] == "") return res.send("Please, fill all fields")
    }

    Chef.update(req.body, () => {
      return res.redirect(`/admin/chefs/${req.body.id}`)
    })
  },
  delete(req, res) {
    Chef.delete(req.body.id, () => {
      return res.redirect('/admin/chefs')
    })
  }
}