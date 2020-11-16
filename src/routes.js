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
routes.get('/admin/recipes', recipeController.index)
routes.get('/admin/recipes/create', recipeController.create)
routes.get('/admin/recipes/:id', recipeController.show)
routes.get('/admin/recipes/:id/edit', recipeController.edit)
routes.get('/admin/chefs', chefController.index)


routes.post('/admin/recipes', recipeController.post)
routes.put('/admin/recipes', recipeController.put)
routes.delete('/admin/recipes', recipeController.delete)

module.exports = routes;