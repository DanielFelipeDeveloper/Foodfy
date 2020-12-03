const express = require('express');
const routes = express.Router();

const userController = require('./app/controllers/UserController');
const recipeController = require('./app/controllers/RecipeController');
const chefController = require('./app/controllers/ChefController');

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

routes.post('/admin/recipes', recipeController.post)
routes.put('/admin/recipes', recipeController.put)
routes.delete('/admin/recipes', recipeController.delete)

/* CHEFS */
routes.get('/admin/chefs', chefController.index)
routes.get('/admin/chefs/create', chefController.create)
routes.get('/admin/chefs/:id', chefController.show)
routes.get('/admin/chefs/:id/edit', chefController.edit)

routes.post('/admin/chefs', chefController.post)
routes.put('/admin/chefs', chefController.put)


module.exports = routes;