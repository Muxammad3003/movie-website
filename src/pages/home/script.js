import Swiper from 'swiper';
import { Scrollbar, FreeMode, Pagination, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/scrollbar';
import 'swiper/css/free-mode';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { render } from '../../libs/render';
import { popularPeople, popularPeoples } from '../../components/popularity';
import { api } from '../../libs/api';
import { Movie } from "../../components/Movie";
import { header } from '../../components/header';
import { footer } from '../../components/footer';
import { Trailer } from '../../components/Trailer';
import { genres } from '../../components/genres';
import { SearchMovie } from '../../components/searchMovie';
import { searchPerson } from '../../components/searchPerson';
header()
footer()

const swiper = new Swiper('.trailers__swiper', {
    direction: 'horizontal',
    loop: false,
    modules: [Scrollbar, FreeMode],

    slidesPerView: 4,
    spaceBetween: 20,
    grabCursor: true,

    freeMode: {
        enabled: true,
        momentum: true,
        momentumRatio: 0,
        momentumVelocityRatio: 0,
        momentumBounce: false,
    },

    scrollbar: {
        el: '.swiper-scrollbar',
        draggable: true,
    },
});
// const swiper_2 = new Swiper('.popular-movies-swiper', {
//     direction: 'horizontal',
//     loop: false,
//     modules: [FreeMode, Pagination, Navigation],

//     slidesPerView: 8,
//     spaceBetween: 20,
//     grabCursor: true,

//     freeMode: {
//         enabled: true,
//         momentum: true,
//         momentumRatio: 0,
//         momentumVelocityRatio: 0,
//         momentumBounce: false,
//     },
//     pagination: {
//         el: ".popular-movies-page-p",
//         type: "fraction",
//     },
//     navigation: {
//         nextEl: ".popular-movies-next-btn",
//         prevEl: ".popular-movies-last-btn",
//     },
//     breakpoints: {
//         320: {
//             slidesPerView: 4,
//             spaceBetween: 10,
//         },
//         640: {
//             slidesPerView: 4,
//             spaceBetween: 15,
//         },
//         1024: {
//             slidesPerView: 4,
//             spaceBetween: 20,
//         },
//         1280: {
//             slidesPerView: 4,
//             spaceBetween: 20,
//         },
//     },
// });


let popular_people_box1 = document.querySelector(".pop-people-left-box")
let popular_people_box2 = document.querySelector(".pop-people-right-box")

let cardBox = document.querySelector(".card-box")
let geanre_list = document.querySelector(".genre-list")

let popular_movies_box = document.querySelector(".popular-movies-box")
let popular_movies_next_btn = document.querySelector(".popular-movies-next-btn")
let popular_movies_last_btn = document.querySelector(".popular-movies-last-btn")
let popular_movies_page = document.querySelector(".popular-movies-page")

let upcomig_movies_box = document.querySelector(".upcoming-movies-box")
let upcomig_movies_next_btn = document.querySelector(".upcoming-movies-next-btn")
let upcomig_movies_last_btn = document.querySelector(".upcoming-movies-last-btn")
let upcomig_movies_page = document.querySelector(".upcoming-movies-page")

let swiperWrapper = document.querySelector(".swiper-wrapper")
let personApi = api.get("/person/popular")
let popularMovieApi = api.get("movie/popular")
let genresApi = api.get("/genre/movie/list")
let upcomigMovieApi = api.get("/movie/upcoming")

Promise.all([personApi, popularMovieApi, genresApi, upcomigMovieApi])
    .then(([personRes, popularMovieRes, genresRes, upcomigMovieRes]) => {
        render(personRes.data.results.slice(0, 2), popular_people_box1, popularPeople)
        render(personRes.data.results.slice(2, 6), popular_people_box2, popularPeoples)

        render(popularMovieRes.data.results, cardBox, Movie)
        render(popularMovieRes.data.results.slice(0, 16), popular_movies_box, Movie)

        render(upcomigMovieRes.data.results, swiperWrapper, Trailer)
        render(upcomigMovieRes.data.results.slice(0, 4), upcomig_movies_box, Movie)

        render(genresRes.data.genres.slice(0, 6), geanre_list, genres)
    })