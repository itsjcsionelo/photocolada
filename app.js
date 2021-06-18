const auth = '563492ad6f917000010000012d5323a91bae4df0b6bdc5933a958aae'
const curatedData = 'https://api.pexels.com/v1/curated?per_page=15&page=1'

const missing = document.querySelector('.missing')

const gallery = document.querySelector('.gallery')
const search = document.querySelector('.search__form--input')
const form = document.querySelector('.search__form')
let searchVal


//event listeners


document.addEventListener("DOMContentLoaded", () => {
    const bg = document.querySelector('.hero')
    bg.onerror = () => this.style.display = 'none'
    console.log(bg);
});

search.addEventListener('input', e => searchVal = e.target.value)
gallery.addEventListener("contextmenu", e => e.preventDefault())

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
    try {
        data.photos.forEach(photo => {
            const galleryImg = document.createElement('div')
            galleryImg.classList.add('.gallery__img')
            galleryImg.innerHTML =
                `<img src=${photo.src.portrait} />
                 <div class="gallery__img--info">
                    <p>${photo.photographer}</p>
                    <a href=${photo.src.original} target="_blank">
                    Download</a>
                 </div>`

            gallery.appendChild(galleryImg)

            galleryImg.addEventListener('mouseenter', e => {
                e.target.lastChild.style.transition = 'all .2s ease'
                e.target.lastChild.style.background = 'black'
            })
            galleryImg.addEventListener('mouseleave', e => {
                e.target.lastChild.style.transition = 'all .2s ease'
                e.target.lastChild.style.background = 'white'
            })

        })
    } catch (e) {
        missing.style.display = 'flex'
        setTimeout(() => {
            missing.style.opacity = '1'
        }, 1500)
    }
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