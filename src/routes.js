const express = require('express');
const routes = express.Router();
const multer = require('./app/middlewares/multer');

const HomeController = require('./app/controllers/HomeController');
const RecipeController = require('./app/controllers/RecipeController');
const ChefController = require('./app/controllers/ChefController');

/* USER ROUTES */
routes.get('/', HomeController.index);
routes.get('/about', HomeController.about);
routes.get('/recipes', HomeController.showAllRecipes);
routes.get('/recipes/:index', HomeController.showTheRecipe);
routes.get('/chefs', HomeController.chefs);

/* ADMIN ROUTES */

/* RECIPES */
routes.get('/admin/recipes', RecipeController.index);
routes.get('/admin/recipes/create', RecipeController.create);
routes.get('/admin/recipes/:id', RecipeController.show);
routes.get('/admin/recipes/:id/edit', RecipeController.edit);

routes.post('/admin/recipes', multer.array("photos", 5), RecipeController.post);
routes.put('/admin/recipes', multer.array("photos", 5), RecipeController.put);
routes.delete('/admin/recipes', RecipeController.delete);

/* CHEFS */
routes.get('/admin/chefs', ChefController.index);
routes.get('/admin/chefs/create', ChefController.create);
routes.get('/admin/chefs/:id', ChefController.show);
routes.get('/admin/chefs/:id/edit', ChefController.edit);

routes.post('/admin/chefs', multer.single("photo"), ChefController.post);
routes.put('/admin/chefs', multer.single("photo"), ChefController.put);
routes.delete('/admin/chefs', ChefController.delete);

module.exports = routes;