const recipes = require('../../data.json');
module.exports = {
  index(req, res) {
    return res.render('admin/index', { recipes: recipes.recipes })
  },
  create(req, res) {
    return res.render('admin/create')
  },
  show(req, res) {
    
  },
  edit(req, res) {
    
  },
  // HTTP METHODS //
  post(req, res) {
    
  },
  put(req, res) {

  },
  delete(req, res) {

  }
}