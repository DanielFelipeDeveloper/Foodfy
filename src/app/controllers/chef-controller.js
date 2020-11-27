
module.exports = {
  index(req, res) {
    return res.render('admin/chefs/index')
  },
  create(req, res) {
    return res.render('admin/chefs/create')
  },
  show(req, res) {
    return res.render('admin/chefs/show')
  },
  edit(req, res) {
    return res.render('admin/chefs/edit')
  }
}