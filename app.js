const auth = '563492ad6f917000010000012d5323a91bae4df0b6bdc5933a958aae'
const curatedData = 'https://api.pexels.com/v1/curated?per_page=15&page=1'

const gallery = document.querySelector('.gallery')
const search = document.querySelector('.search__form--input')
const form = document.querySelector('.search__form')
let searchVal

//event listeners

search.addEventListener('input', e => {
    searchVal = e.target.value
})

form.addEventListener('submit', e => {
    e.preventDefault()
    searchPhotos(searchVal)
})


///////////---------------

async function fetchApi(url) {
    const dataFetch = await fetch(url, {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            Authorization: auth
        }
    })

    const data = await dataFetch.json()
    return data
}

async function generatePictures(data) {
    data.photos.forEach(photo => {
        const galleryImg = document.createElement('div')
        galleryImg.classList.add('.gallery__img')
        galleryImg.innerHTML =
            `<img src=${photo.src.portrait} />
             <p>${photo.photographer}</p>
             <a href=${photo.src.original}>Download</a>`

        gallery.appendChild(galleryImg)
    })
}

function clear() {
    gallery.innerHTML = ''
    search.value = ''
}

///////////---------------


async function curatedPhotos() {
    const data = await fetchApi(curatedData)
    generatePictures(data)
}

async function searchPhotos(query) {
    clear()

    const data = await fetchApi(`https://api.pexels.com/v1/search?query=${query}&per_page=15&page=1`)
    generatePictures(data)
}

curatedPhotos()