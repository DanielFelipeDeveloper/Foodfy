function addIngredient() {
  const ingredient = document.querySelector('.ingredient');

  const newField = ingredient.lastElementChild.cloneNode(true);

  if (newField.value == '') return false

  newField.value = "";
  ingredient.appendChild(newField);
}

function addPreparation() {
  const preparation = document.querySelector('.preparation');

  const newField = preparation.lastElementChild.cloneNode(true);

  if (newField.value == '') return false

  newField.value = "";
  preparation.appendChild(newField);
}

document
.querySelector('.add-ingredient')
.addEventListener('click', addIngredient);

document
  .querySelector('.add-preparation')
  .addEventListener('click', addPreparation);