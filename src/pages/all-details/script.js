import { movieStarrings } from "../../components/detailedMovie";
import { footer } from "../../components/footer";
import { header } from "../../components/header";
import { api } from "../../libs/api";
import { render } from "../../libs/render";
let movieId = JSON.parse(localStorage.getItem("movieId"))
let params = new URLSearchParams(window.location.search)
header()
footer()

let actorsBox = document.querySelector(".datas-container")
let posterBox = document.querySelector(".poster-container")
let photosBox = document.querySelector(".photos-container")
let trailerBox = document.querySelector(".trailers-container")

let type = params.get("type")
let title = params.get("title")
let whichPage = params.get("page")
let filmName = params.get("filmname")

let name = document.querySelector(".title")
let page = document.querySelector(".page")
let name_2 = document.querySelector(".title_2")
let name_page = document.querySelector(".name")

function loadPosters() {
    api.get(`/movie/${movieId}/images`)
        .then(res => {
            let posters = res.data.posters

            name_2.textContent = `${title} (${posters.length})`

            posters.forEach(poster => {
                const img = document.createElement('img')
                img.src = `https://image.tmdb.org/t/p/w500${poster.file_path}`
                img.classList.add('poster-img')

                posterBox.appendChild(img)
            })
        })
}
function loadActors() {
    api.get(`/movie/${movieId}/credits`)
        .then(res => {
            render(res.data.cast, actorsBox, movieStarrings)
        })
}
function loadPhotos() {
    api.get(`/movie/${movieId}/images`)
        .then(res => {
            let photos = res.data.backdrops
            name_2.textContent = `${title} (${photos.length})`

            photos.forEach((poster, index) => {
                const photoImg = document.createElement('img');
                photoImg.src = `https://image.tmdb.org/t/p/w500${poster.file_path}`;
                photoImg.alt = "poster not found";
                photoImg.classList.add('photo-img');
                photosBox.append(photoImg)
            });
        });
}
function loadTrailer() {
    const iframe = document.createElement("iframe");
    iframe.width = "704";
    iframe.height = "342";
    api.get(`/movie/${movieId}/videos`)
        .then(res => {
            name.textContent = `Trailer ${filmName}`
            const trailer = res.data.results.find(v => v.type === "Trailer" && v.site === "YouTube")
            if (trailer) {
                iframe.src = `https://www.youtube.com/embed/${trailer.key}`

            } else {
                iframe.src = `https://www.youtube.com/embed/VIDEO_ID`
            }
        })
    iframe.title = "YouTube video";
    iframe.setAttribute("frameborder", "0");
    iframe.setAttribute("allowfullscreen", "");
    iframe.className = "tariler-video";
    trailerBox.append(iframe)
}

function loadPage() {
    name.textContent = title
    name_2.textContent = title
    page.textContent = whichPage
    api.get(`/movie/${movieId}`)
        .then(res => name_page.textContent = res.data.title)

    if (type === "credits") {
        loadActors()
    } else if (title === "Posters") {
        loadPosters()
    } else if (title === "Photos") {
        loadPhotos()
    } else if (type === "videos") {
        loadTrailer()
    }
}
loadPage()