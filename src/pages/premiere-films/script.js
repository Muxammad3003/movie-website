
import { footer } from "../../components/footer";
import { genres, premierGenres } from "../../components/genres";
import { header } from "../../components/header";
import { Movie } from "../../components/Movie";
import { api } from "../../libs/api";
import { render } from "../../libs/render";
header()
footer()

let genresApi = await api.get("/genre/movie/list")
let popularMovieApi = await api.get("movie/popular")
let geanre_list = document.querySelector(".genre-list")
let cardBox = document.querySelector(".card-box")
render(genresApi.data.genres, geanre_list, premierGenres)
render(popularMovieApi.data.results, cardBox, Movie)

let allGenres = document.querySelectorAll(".search-category");
allGenres.forEach(item => {
    item.addEventListener('click', () => {
        allGenres.forEach(el => el.classList.remove('active'));
        item.classList.add('active');
    });
});

const genreList = document.querySelector('.genre-list');
let isDown = false;      // флаг, держим ли мышь
let startX;              // стартовая позиция мыши
let scrollLeft;          // стартовая прокрутка

// мышь нажата
genreList.addEventListener('mousedown', (e) => {
    isDown = true;
    genreList.classList.add('active'); // можно курсор менять
    startX = e.pageX - genreList.offsetLeft;
    scrollLeft = genreList.scrollLeft;
});

// мышь отпущена или ушла за предел
genreList.addEventListener('mouseleave', () => {
    isDown = false;
    genreList.classList.remove('active');
});

genreList.addEventListener('mouseup', () => {
    isDown = false;
    genreList.classList.remove('active');
});

// движение мыши
genreList.addEventListener('mousemove', (e) => {
    if(!isDown) return;  // если мышь не нажата — не скроллим
    e.preventDefault();
    const x = e.pageX - genreList.offsetLeft;
    const walk = (x - startX) * 2; // скорость скролла
    genreList.scrollLeft = scrollLeft - walk;
});

genreList.addEventListener('mousedown', (e) => {
    isDown = true;
    genreList.classList.add('active');
    startX = e.pageX - genreList.offsetLeft;
    scrollLeft = genreList.scrollLeft;
});

genreList.addEventListener('mouseleave', () => {
    isDown = false;
    genreList.classList.remove('active');
});

genreList.addEventListener('mouseup', () => {
    isDown = false;
    genreList.classList.remove('active');
});

genreList.addEventListener('mousemove', (e) => {
    if(!isDown) return;
    e.preventDefault();
    const x = e.pageX - genreList.offsetLeft;
    const walk = (x - startX) * 2; // скорость прокрутки
    genreList.scrollLeft = scrollLeft - walk;
});

// === прокрутка колесиком мыши ===
genreList.addEventListener('wheel', (e) => {
    e.preventDefault(); // отменяем вертикальный скролл страницы
    genreList.scrollLeft += e.deltaY; // двигаем горизонтально
});

