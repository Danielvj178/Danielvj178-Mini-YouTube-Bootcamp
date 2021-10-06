let queryString = window.location.search
let labelText = document.querySelector('#order-label')
let link = document.querySelector('#link-sort')
const url = '/videos'

let urlParams = new URLSearchParams(queryString)
let orderBy = urlParams.get('sortBy')

if (orderBy === 'desc') {
    link.href = `${url}?sortBy=asc`
    labelText.textContent = 'Asc'
} else {
    link.href = `${url}?sortBy=desc`
    labelText.textContent = 'Desc'
}
