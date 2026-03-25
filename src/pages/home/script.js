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
import { popularMovie } from '../../components/popularMovies';
header()

const swiper_1 = new Swiper('.trailers__swiper', {
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

const totalSlides = 4;
const swiper_2 = new Swiper('.swiper__movie', {
    direction: 'horizontal',
    loop: true,              // зацикливание
    speed: 1000,
    modules: [Navigation, Pagination],
    grabCursor: true,

    slidesPerView: 4,
    slidesPerGroup: 4,
    spaceBetween: 20,

    navigation: {
        nextEl: ".pop-movie-btn-prev",
        prevEl: ".pop-movie-btn-next",
    },

    pagination: {
        el: ".popular-movie-pagination",
        type: "fraction",
    },
});
const swiper_3 = new Swiper('.swiper__upcoming-movie', {
    direction: 'horizontal',
    loop: true,              // зацикливание
    speed: 1000,
    modules: [Navigation, Pagination],
    grabCursor: true,

    slidesPerView: 4,
    slidesPerGroup: 4,
    spaceBetween: 20,

    navigation: {
        nextEl: ".upcoming-movie-btn-next",
        prevEl: ".upcoming-movie-btn-prev",
    },

    pagination: {
        el: ".upcoming-movies-pagination",
        type: "fraction",
    },
});

let popular_people_box1 = document.querySelector(".pop-people-left-box")
let popular_people_box2 = document.querySelector(".pop-people-right-box")

let cardBox = document.querySelector(".card-box")
let geanre_list = document.querySelector(".genre-list")

let popular_movies_box = document.querySelector(".popular-movies-box")
let upcomig_movies_box = document.querySelector(".upcoming-movies-box")

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
        render(popularMovieRes.data.results.slice(0, 16), popular_movies_box, popularMovie)

        render(upcomigMovieRes.data.results, swiperWrapper, Trailer)
        render(upcomigMovieRes.data.results.slice(0, 12), upcomig_movies_box, popularMovie)

        render(genresRes.data.genres.slice(0, 6), geanre_list, genres)
    })