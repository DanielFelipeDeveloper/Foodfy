const express = require('express');
const routes = express.Router();
const multer = require('./app/middlewares/multer');

const userController = require('./app/controllers/UserController');
const recipeController = require('./app/controllers/RecipeController');
const chefController = require('./app/controllers/ChefController');

/* USER ROUTES */
routes.get('/', userController.index);
routes.get('/about', userController.about);
routes.get('/recipes', userController.showAllRecipes);
routes.get('/recipes/:index', userController.showTheRecipe);
routes.get('/chefs', userController.chefs);

/* ADMIN ROUTES */

/* RECIPES */
routes.get('/admin/recipes', recipeController.index);
routes.get('/admin/recipes/create', recipeController.create);
routes.get('/admin/recipes/:id', recipeController.show);
routes.get('/admin/recipes/:id/edit', recipeController.edit);

routes.post('/admin/recipes', multer.array("photos", 5), recipeController.post);
routes.put('/admin/recipes', multer.array("photos", 5), recipeController.put);
routes.delete('/admin/recipes', recipeController.delete);

/* CHEFS */
routes.get('/admin/chefs', chefController.index);
routes.get('/admin/chefs/create', chefController.create);
routes.get('/admin/chefs/:id', chefController.show);
routes.get('/admin/chefs/:id/edit', chefController.edit);

routes.post('/admin/chefs', chefController.post);
routes.put('/admin/chefs', chefController.put);
routes.delete('/admin/chefs', chefController.delete);

module.exports = routes;