const auth = '563492ad6f917000010000012d5323a91bae4df0b6bdc5933a958aae'
const curatedData = 'https://api.pexels.com/v1/curated?per_page=15&page=1'

const missing = document.querySelector('.missing')

const gallery = document.querySelector('.gallery')
const search = document.querySelector('.search__form--input')
const form = document.querySelector('.search__form')

let searchVal
let fetchLink
let currentSearch
let page = 1

const logo = document.querySelector('#logo')
const logoName = document.querySelector('#logo--name')
const nav = document.querySelector('.nav')
const more = document.querySelector('.nav--btn')
const floating = document.querySelector('.floating')
const arrow = document.querySelector('#arrow')
const progress = document.querySelector('#progress')


//event listeners

window.onbeforeunload = () => window.scrollTo(0, 0)

window.onscroll = () => {
    if (window.scrollY === 0) {
        logoName.style.transform = 'scale(0)'
        setTimeout(() => {
            logo.style.opacity = '1'
            floating.style.transform = 'scale(0)'
        }, 100)

    } else {
        logo.style.opacity = '0'
        logoName.style.transform = 'scale(1.2)'
        setTimeout(() => floating.style.transform = 'scale(1)', 100)
    }

    if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
        nav.style.bottom = '0'
        floating.style.marginBottom = '5rem'
    } else {
        nav.style.bottom = '-10rem'
        floating.style.marginBottom = '0'
    }
}

search.addEventListener('input', e => searchVal = e.target.value)
gallery.addEventListener("contextmenu", e => e.preventDefault())

search.addEventListener("keyup", (e) => {

    if (e.keyCode === 13) {
        e.preventDefault()
        search.blur()
    }
})

form.addEventListener('submit', e => {
    e.preventDefault()

    currentSearch = searchVal
    searchPhotos(searchVal)
})

more.addEventListener('click', loadMore)
arrow.addEventListener('click', scrollToTop)


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
            galleryImg.style.transition = 'all .2s'
            setTimeout(() => galleryImg.style.opacity = '1', 1000)
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
    fetchLink = curatedData
    const data = await fetchApi(fetchLink)
    generatePictures(data)
}

async function searchPhotos(query) {
    clear()

    fetchLink = `https://api.pexels.com/v1/search?query=${query}&per_page=15&page=1`
    const data = await fetchApi(fetchLink)
    generatePictures(data)
}

async function loadMore() {
    arrow.style.opacity = '0'
    progress.style.opacity = '1'

    setTimeout(() => {
        nav.style.bottom = '-10rem'
        arrow.style.opacity = '1'
        progress.style.opacity = '0'
        floating.style.marginBottom = '0'
    }, 1000)
    page++

    if (currentSearch) {
        fetchLink = `https://api.pexels.com/v1/search?query=${currentSearch}&per_page=15&page=${page}`
    } else {
        fetchLink = `https://api.pexels.com/v1/curated?per_page=15&page=${page}`
    }

    const data = await fetchApi(fetchLink)
    generatePictures(data)
}

function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}

curatedPhotos()