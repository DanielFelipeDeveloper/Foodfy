const express = require('express');
const routes = express.Router();

const userController = require('./app/controllers/user-controller');
const recipeController = require('./app/controllers/recipe-controller');
const chefController = require('./app/controllers/chef-controller');

/* USER ROUTES */
routes.get('/', userController.index)
routes.get('/about', userController.about)
routes.get('/recipes', userController.showAllRecipes)
routes.get('/recipes/:index', userController.showTheRecipe)

/* ADMIN ROUTES */

/* RECIPES */
routes.get('/admin/recipes', recipeController.index)
routes.get('/admin/recipes/create', recipeController.create)
routes.get('/admin/recipes/:id', recipeController.show)
routes.get('/admin/recipes/:id/edit', recipeController.edit)
/* CHEFS */
routes.get('/admin/chefs', chefController.index)
routes.get('/admin/chefs/create', chefController.create)
routes.get('/admin/chefs/:id', chefController.show)
routes.get('/admin/chefs/:id/edit', chefController.edit)

routes.post('/admin/recipes', recipeController.post)
routes.put('/admin/recipes', recipeController.put)
routes.delete('/admin/recipes', recipeController.delete)

module.exports = routes;