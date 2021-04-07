const Chef = require("../models/Chef")
const Recipe = require("../models/Recipe")

module.exports = {
  async index(req, res) {
    const chefs = await Chef.all();
    return res.render('admin/chefs/index', { chefs });
  },
  create(req, res) {
    return res.render('admin/chefs/create');
  },
  async show(req, res) {
    const chef = await Chef.find(req.params.id);

    if (!chef) return res.send('Chef not found!');

    const recipes = await Recipe.findByChef(req.params.id);

    return res.render('admin/chefs/show', { chef, recipes });
  },
  async edit(req, res) {
    const chef = await Chef.find(req.params.id);

    if(!chef) return res.send('Chef not found!');
    
    return res.render('admin/chefs/edit', { chef });
  },
  async post(req, res) {
    const keys = Object.keys(req.body)

    for (key of keys) {
      if (req.body[key] == "") return res.send("Please, fill all fields")
    }

    const chef = await Chef.create({ chef: req.body, file: req.file });
    
    return res.redirect(`/admin/chefs/${chef.id}`);
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