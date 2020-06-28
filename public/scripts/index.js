const modalOverlay = document.querySelector('.modal-overlay')
const cardsRecipes = document.querySelectorAll('.card-recipe')

for (let cardRecipe of cardsRecipes) {
    cardRecipe.addEventListener('click', function(){
        const imageId = cardRecipe.getAttribute('id')
        const h3 = cardRecipe.querySelector('h3').textContent
        const p = cardRecipe.querySelector('p').textContent

        modalOverlay.classList.add('active')
        modalOverlay.querySelector('img').src = `../../public/assets/${imageId}`
        modalOverlay.querySelector('h3').textContent = h3
        modalOverlay.querySelector('p').textContent = p

    })
}

modalOverlay.querySelector('h4').addEventListener('click', function(e){
    modalOverlay.classList.remove('active')
    e.preventDefault()
})

