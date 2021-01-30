document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('add-plant-form')
  console.log({ form })
  form.addEventListener('submit', ev => {
    console.log('submitting', form)
  })
})
