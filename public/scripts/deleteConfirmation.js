const formDelete = document.querySelector('#form-delete')

formDelete.addEventListener('submit', (e) => {
  const confirmation = confirm("Deseja deletar?")
  if (!confirmation) {
    e.preventDefault()
  }
})