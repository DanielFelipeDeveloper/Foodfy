const Chef = require("../models/Chef");
const File = require("../models/File");
const Recipe = require("../models/Recipe")

module.exports = {
  async index(req, res) {
    const chefs = await Chef.all();

    for (chef of chefs) {
      file = await File.find(chef.file_id);

      chef.file_src = `${req.protocol}://${req.headers.host}${file.path.replace('public', '')}`;
    }

    return res.render('admin/chefs/index', { chefs });
  },
  create(req, res) {
    return res.render('admin/chefs/create');
  },
  async show(req, res) {
    const { id } = req.params;
    const chef = await Chef.find(id);

    if (!chef) return res.send('Chef not found!');

    const recipes = await Recipe.findByChef(id);

    for (recipe of recipes) {
      let file = await Recipe.files(recipe.id);
      let src = `${req.protocol}://${req.headers.host}${file[0].path.replace('public', '')}`;

      recipe.file_src = src;
    }

    let file = await File.find(chef.file_id);

    file.src = `${req.protocol}://${req.headers.host}${file.path.replace('public', '')}`;

    return res.render('admin/chefs/show', { chef, recipes, file });
  },
  async edit(req, res) {
    const chef = await Chef.find(req.params.id);

    if(!chef) return res.send('Chef not found!');

    let file = await File.find(chef.file_id);

    file.src = `${req.protocol}://${req.headers.host}${file.path.replace('public', '')}`;
    
    return res.render('admin/chefs/edit', { chef, file });
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
  async delete(req, res) {
    const { id } = req.body;
    const { file_id } = await Chef.find(id);

    await Chef.delete(req.body.id);
    await File.delete(file_id);

    return res.redirect('/admin/chefs');
  }
}