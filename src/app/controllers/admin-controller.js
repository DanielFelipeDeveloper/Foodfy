const recipes = require('../../data.json');
module.exports = {
  index(req, res) {
    return res.render('admin/index', { recipes: recipes.recipes })
  },
  create(req, res) {
    
  },
  show(req, res) {
    
  },
  edit(req, res) {
    
  },
  post(req, res) {
    
  },
  put(req, res) {

  },
  delete(req, res) {

  }
}