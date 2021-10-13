let title = document.querySelector('#title')
let form = document.querySelector('form')

form.addEventListener('submit', () => {
    if (title.value.trim() == '') {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Something went wrong!',
        })
    }
})
