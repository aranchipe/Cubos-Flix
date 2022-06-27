const body = document.querySelector('body')
const divMovies = document.querySelector('.movies')
const anterior = document.querySelector('.btn-prev')
const proximo = document.querySelector('.btn-next')
const input = document.querySelector('.input')
const highlight_video = document.querySelector('.highlight__video')
const highlight_title = document.querySelector('.highlight__title')
const highlight_rating = document.querySelector('.highlight__rating')
const highlight_genres = document.querySelector('.highlight__genres')
const highlight_description = document.querySelector('.highlight__description')
const highlight_video_link = document.querySelector('.highlight__video-link')
const highlight_launch = document.querySelector('.highlight__launch')
const modal = document.querySelector('.modal')
const modal_title = document.querySelector('.modal__title')
const modal_img = document.querySelector('.modal__img')
const modal_description = document.querySelector('.modal__description')
const modal_average = document.querySelector('.modal__average')
const modal_genres = document.querySelector('.modal__genres')
const modal_close = document.querySelector('.modal__close')
const btn_theme = document.querySelector('.btn-theme')
const apiGeral = 'https://tmdb-proxy.cubos-academy.workers.dev/3/discover/movie?language=pt-BR'
const apiFilme = 'https://tmdb-proxy.cubos-academy.workers.dev/3/search/movie?language=pt-BR&include_adult=false&query='
let api = apiGeral

function filmes(api) {
    fetch(api).then(function (resposta) {
        const promiseBody = resposta.json()

        promiseBody.then(function (body) {

            for (let i = 0; i < 5; i++) {

                const movie = document.createElement('div')
                movie.classList.add('movie')
                movie.style.backgroundImage = `url(${body.results[i].poster_path})`

                const info = document.createElement('div')
                info.classList.add('movie__info')

                const title = document.createElement('span')
                title.classList.add('movie__title')
                title.textContent = body.results[i].title

                const rating = document.createElement('span')
                rating.classList.add('movie__rating')

                const imagem = document.createElement('img')
                imagem.src = "./assets/estrela.svg"

                rating.append(imagem, body.results[i].vote_average)
                info.append(title, rating)
                movie.append(info)
                divMovies.append(movie)

                let j = 0
                proximo.addEventListener('click', () => {
                    j = j + 5

                    if (j === body.results.length) {
                        j = 0
                    }

                    movie.style.backgroundImage = `url(${body.results[i + j].poster_path})`
                    title.textContent = body.results[i + j].title
                    rating.textContent = body.results[i + j].vote_average
                    imagem.src = "./assets/estrela.svg"
                    rating.append(imagem)
                    rating.innerHTML = ''
                    rating.append(imagem, body.results[i + j].vote_average)
                })

                anterior.addEventListener('click', () => {
                    j = j - 5

                    if (j === -5) {
                        j = body.results.length - 5
                    }

                    movie.style.backgroundImage = `url(${body.results[i + j].poster_path})`
                    title.textContent = body.results[i + j].title
                    rating.textContent = body.results[i + j].vote_average
                    imagem.src = "./assets/estrela.svg"
                    rating.append(imagem)

                })
                movie.addEventListener('click', () => {
                    fetch(`https://tmdb-proxy.cubos-academy.workers.dev/3/movie/${body.results[i + j].id}?language=pt-BR`).then(function (resposta2) {
                        const promiseBody = resposta2.json()

                        promiseBody.then(function (body2) {
                            console.log(body2)

                            modal.classList.remove('hidden')
                            modal_title.textContent = body2.title
                            modal_img.src = body2.backdrop_path
                            modal_description.textContent = body2.overview
                            modal_average.textContent = body2.vote_average

                            for (let k = 0; k < body2.genres.length; k++) {
                                const modal_genre = document.createElement('span')
                                modal_genre.classList.add('modal__genre')
                                modal_genre.textContent = `${body2.genres[k].name}`

                                modal_genres.append(modal_genre)
                            }

                        })
                        modal_close.addEventListener('click', () => {
                            modal.classList.add('hidden')
                            modal_genres.innerHTML = ''
                        })
                    })
                })

            }
        })

    })
}

filmes(api)


input.addEventListener('keydown', function (event) {
    if (event.code !== 'Enter') {
        return
    }
    if (!input.value) {
        divMovies.innerHTML = ''
        api = apiGeral
        filmes(api)
    }

    if (input.value) {
        divMovies.innerHTML = ''
        api = `${apiFilme}${input.value}`
        filmes(api)
        input.value = ''
    }

})


fetch('https://tmdb-proxy.cubos-academy.workers.dev/3/movie/436969?language=pt-BR').then(function (resposta) {
    const promiseBody = resposta.json()

    promiseBody.then(function (body) {
        highlight_video.style.backgroundImage = `url(${body.backdrop_path})`
        highlight_video.style.backgroundSize = 'cover'
        highlight_title.textContent = body.title
        highlight_rating.textContent = body.vote_average
        highlight_genres.textContent = `${body.genres[0].name}, ${body.genres[1].name}, ${body.genres[2].name}`
        highlight_launch.textContent = new Date(body.release_date).toLocaleDateString('pt-BR', { year: 'numeric', month: 'long', day: 'numeric' })
        highlight_description.textContent = body.overview
    })
})

fetch('https://tmdb-proxy.cubos-academy.workers.dev/3/movie/436969/videos?language=pt-BR').then(function (resposta) {
    const promiseBody = resposta.json()

    promiseBody.then(function (body) {

        highlight_video_link.href = `https://www.youtube.com/watch?v=${body.results[0].key}`
    })
})


let temaInicial = localStorage.getItem('tema')

if (temaInicial) {
    temaInicial = temaInicial === 'escuro' ? 'escuro' : 'claro'
} else {
    temaInicial = 'claro'
}

mudancaTema()

btn_theme.addEventListener('click', function () {

    localStorage.setItem('tema', temaInicial === 'claro' ? 'escuro' : 'claro')
    temaInicial = localStorage.getItem('tema')
    mudancaTema()
})
function mudancaTema() {

    body.style.setProperty('--background-color', temaInicial === 'claro' ? '#FFF' : '#242424')
    body.style.setProperty('--highlight-background', temaInicial === 'claro' ? '#FFF' : '#454545')
    body.style.setProperty('--highlight-description', temaInicial === 'claro' ? '#000' : '#FFF')
    body.style.setProperty('--highlight-color', temaInicial === 'claro' ? 'rgba(0, 0, 0, 0.7)' : 'rgba(255, 255, 255, 0.7)')
    body.style.setProperty('--color', temaInicial === 'claro' ? '#000' : '#FFF')
    body.style.setProperty('--input-border-color', temaInicial === 'claro' ? '#979797' : '#FFF')
    body.style.setProperty('--shadow-color', temaInicial === 'claro' ? '0px 4px 8px rgba(0, 0, 0, 0.15)' : '0px 4px 8px rgba(255, 255, 255, 0.15)')
    proximo.src = temaInicial === 'claro' ? './assets/seta-direita-preta.svg' : './assets/seta-direita-branca.svg'
    anterior.src = temaInicial === 'claro' ? './assets/seta-esquerda-preta.svg' : './assets/seta-esquerda-branca.svg'
    btn_theme.src = temaInicial === 'claro' ? './assets/light-mode.svg' : './assets/dark-mode.svg'
}


