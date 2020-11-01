const express = require('express');
const routes = express.Router();

const userController = require('./app/controllers/user-controller');
const adminController = require('./app/controllers/admin-controller');

/* USER ROUTES */
routes.get('/', userController.index)
routes.get('/about', userController.about)
routes.get('/recipes', userController.showAllRecipes)
routes.get('/recipes/:index', userController.showTheRecipe)

/* ADMIN ROUTES */
routes.get('/admin/recipes', adminController.index)
routes.get('/admin/recipes/create', adminController.create)
routes.get('/admin/recipes/:id', adminController.show)
routes.get('/admin/recipes/:id/edit', adminController.edit)

routes.post('/admin/recipes', adminController.post)
routes.post('/admin/recipes', adminController.put)
routes.post('/admin/recipes', adminController.delete)

module.exports = routes;