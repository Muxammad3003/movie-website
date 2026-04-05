import { api } from "../libs/api"
import { render } from "../libs/render"
import { Movie } from "./Movie"
let cardBox = document.querySelector(".card-box")

export function genres(item) {
    let li = document.createElement(`li`)
    let btn = document.createElement(`div`)

    btn.href = "#"
    btn.className = "search-category"
    btn.textContent = item.name

    li.append(btn)
    btn.onclick = () => {
        api.get(`/discover/movie?with_genres=${item.id}`)
            .then(res => {
                render(res.data.results, cardBox, Movie)
            })
    }

    return li
}
export function premierGenres(item) {
    let li = document.createElement(`li`)
    let btn = document.createElement(`div`)

    btn.href = "#"
    btn.className = "search-category"
    btn.classList.add("swiper-slide")
    btn.textContent = item.name

    li.append(btn)
    btn.onclick = () => {
        api.get(`/discover/movie?with_genres=${item.id}`)
            .then(res => {
                render(res.data.results, cardBox, Movie)
            })
    }

    return li
}