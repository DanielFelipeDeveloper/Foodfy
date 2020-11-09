function addIngredient() {
  const ingredient = document.querySelector('.ingredient')
  const ingredients = document.querySelectorAll('.ingredient')

  const newField = ingredients[ingredients.length - 1].cloneNode(true);

  if (newField.children[0].value == "") return false;

  newField.children[0].value = "";
  ingredient.appendChild(newField)
}

function addPreparation() {
  const preparations = document.querySelector('.preparation');
  const fieldContainer = document.querySelectorAll('.preparation');

  const newField = fieldContainer[fieldContainer.length - 1].cloneNode(true);

  if (newField.children[0].value == "") return false;

  newField.children[0].value = "";
  preparations.appendChild(newField)
}

document
  .querySelector('.add-ingredient')
  .addEventListener('click', addIngredient);

document
  .querySelector('.add-preparation')
  .addEventListener('click', addPreparation);