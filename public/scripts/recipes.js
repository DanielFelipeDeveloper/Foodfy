const cardsRecipes = document.querySelectorAll('.card-recipe')
const recipes = document.querySelectorAll('.recipe')

for (let cardRecipe of cardsRecipes) {
    cardRecipe.addEventListener('click', () => {
        let index = cardRecipe.getAttribute('id')

        window.location.href = `/recipes/${index}`
    })
}

for (let recipe of recipes) {
    let data = recipe.querySelector('.data')
    let click = recipe.querySelector('.showOrHide')

    click.addEventListener('click', () => {
        if(click.innerHTML == 'ESCONDER') {
            click.innerHTML = 'MOSTRAR'
        } else {
            click.innerHTML = 'ESCONDER'
        }

        data.classList.toggle('active')
    })
    
}