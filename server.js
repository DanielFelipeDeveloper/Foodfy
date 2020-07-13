const express = require('express')
const nunjucks = require('nunjucks')
const recipes = require('./data')

const server = express()

server.use(express.static("public"))

server.set("view engine", "njk")

nunjucks.configure("src/views", {
    express : server,
    autoescape: false,
    noCache: true
})

server.get('/', (req, res) => {
    const info = {
        text1: 'As melhores receitas',
        text2: 'Aprenda a construir os melhores pratos com receitas criadas por profissionais do mundo inteiro.',
        title: 'Foodfy'
    }
    res.render('index', { recipes, info })
})

server.get('/about', (req, res) => {
    const info = {
        title: 'Sobre - Foodfy',
        about: 'Sobre o Foodfy:',
        start: 'Como tudo começou..',
        recipes: 'Nossas receitas:',
      }

    res.render('about', { info })
})

server.get('/recipes', (req, res) => {
    const info = {
        title: 'Receitas - Foodfy'
      }

    res.render('recipes', { recipes, info })
})

server.get('/recipes/:index', (req, res) => {
    const recipeIndex = req.params.index
    const recipe = recipes.indexOf( (recipe) => {
        if (recipe == recipeIndex) {
            return true
        }
    })

    if(!recipe) {
        return res.send('recept not found')
    }

    const info = {
        ingredients: 'Ingredientes',
        hide: 'ESCONDER',
        show: 'MOSTRAR',
        make: 'Modo de preparo',
        adittional: 'Informações adicionais'
    }
    
    return res.render('recipe', { item: recipes[recipeIndex], info})
})

server.listen('3000', () => {
    console.log("Server is running")
})