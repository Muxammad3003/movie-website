import { api } from "../libs/api";
import { render } from "../libs/render";
import { Movie } from "./Movie";

let actorId = JSON.parse(localStorage.getItem('actorId'));
export function actorInformation(item) {
    let fullContainer = document.createElement("div")
    fullContainer.className = `main_box`

    let actor_info_container = document.createElement("div")
    actor_info_container.className = `actor_informations`

    // IMAGE
    let img = document.createElement('img');
    img.src = `https://image.tmdb.org/t/p/original${item.profile_path}`;
    img.classList.add("actor-photo");

    // LEFT
    let leftSide = document.createElement('div');
    leftSide.classList.add("left-side");

    // WAY
    let wayBox = document.createElement('div');
    wayBox.classList.add("way_box");

    let home = document.createElement('span');
    home.className = "home span";
    home.textContent = "Home";

    let place = document.createElement('span');
    place.className = "place span";
    place.textContent = "All persons";

    let actorName = document.createElement('span');
    actorName.className = "actor_name";
    actorName.textContent = item.name;

    wayBox.append(home, place, actorName);

    // NAME
    let name = document.createElement('h1');
    name.className = "name";
    name.textContent = item.name;

    // SHARE (твои норм SVG)
    let share = document.createElement('div');
    share.className = "trailers__share";

    function btn(svg) {
        let a = document.createElement('a');
        a.href = "#";
        a.className = "trailers__share-btn";
        a.innerHTML = svg;
        return a;
    }

    share.append(
        btn(`  <svg width="25px" height="25px" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" fill="#fff"
                        class="bi bi-facebook">
                        <path
                            d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951z" />
                    </svg>`),

        btn(`<svg width="25px" height="25px" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" fill="#fff"
                        class="bi bi-whatsapp">
                        <path
                            d="M13.601 2.326A7.854 7.854 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.933 7.933 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.898 7.898 0 0 0 13.6 2.326zM7.994 14.521a6.573 6.573 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.557 6.557 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592zm3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.729.729 0 0 0-.529.247c-.182.198-.691.677-.691 1.654 0 .977.71 1.916.81 2.049.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232z" />
                    </svg>`),

        btn(`<svg xmlns="http://www.w3.org/2000/svg" width="25" height="25"
                        viewBox="0 0 512 512">
                        <path fill="#fff"
                            d="M389.2 48h70.6L305.6 224.2L487 464H345L233.7 318.6L106.5 464H35.8l164.9-188.5L26.8 48h145.6l100.5 132.9zm-24.8 373.8h39.1L151.1 88h-42z" />
                    </svg>`),

        btn(`<svg fill="#fff" width="30px" height="30px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="9.67" cy="13" r="1.001" />
                        <path
                            d="M14.09 15.391A3.28 3.28 0 0 1 12 16a3.271 3.271 0 0 1-2.081-.63.27.27 0 0 0-.379.38c.71.535 1.582.809 2.471.77a3.811 3.811 0 0 0 2.469-.77v.04a.284.284 0 0 0 .006-.396.28.28 0 0 0-.396-.003zm.209-3.351a1 1 0 0 0 0 2l-.008.039c.016.002.033 0 .051 0a1 1 0 0 0 .958-1.038 1 1 0 0 0-1.001-1.001z" />
                        <path
                            d="M12 2C6.479 2 2 6.477 2 12c0 5.521 4.479 10 10 10s10-4.479 10-10c0-5.523-4.479-10-10-10zm5.859 11.33c.012.146.012.293 0 .439 0 2.24-2.609 4.062-5.83 4.062s-5.83-1.82-5.83-4.062a2.681 2.681 0 0 1 0-.439 1.46 1.46 0 0 1-.455-2.327 1.458 1.458 0 0 1 2.063-.063 7.145 7.145 0 0 1 3.899-1.23l.743-3.47v-.004A.313.313 0 0 1 12.82 6l2.449.49a1.001 1.001 0 1 1-.131.61L13 6.65l-.649 3.12a7.123 7.123 0 0 1 3.85 1.23 1.46 1.46 0 0 1 2.469 1c.01.563-.307 1.08-.811 1.33z" />
                    </svg>`),

        btn(` <svg fill="#fff" width="25px" height="25px" viewBox="0 0 32 32" version="1.1"
                        xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M30.996 7.824v17.381c0 0 0 0 0 0.001 0 1.129-0.915 2.044-2.044 2.044-0 0-0 0-0.001 0h-4.772v-11.587l-8.179 6.136-8.179-6.136v11.588h-4.772c0 0 0 0-0 0-1.129 0-2.044-0.915-2.044-2.044 0-0 0-0.001 0-0.001v0-17.381c0-0 0-0.001 0-0.001 0-1.694 1.373-3.067 3.067-3.067 0.694 0 1.334 0.231 1.848 0.619l-0.008-0.006 10.088 7.567 10.088-7.567c0.506-0.383 1.146-0.613 1.84-0.613 1.694 0 3.067 1.373 3.067 3.067v0z">
                        </path>
                    </svg>`),

        btn(`<svg width="25px" height="25px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M15.9862 3.99944C15.8616 2.87472 14.9079 2 13.75 2H10.25C9.09205 2 8.13841 2.87472 8.01379 3.99944L6.25 4C5.00736 4 4 5.00736 4 6.25V19.75C4 20.9926 5.00736 22 6.25 22H10.9996C10.6634 21.5523 10.4005 21.0464 10.2289 20.5H6.25C5.83579 20.5 5.5 20.1642 5.5 19.75V6.25C5.5 5.83579 5.83579 5.5 6.25 5.5L8.37902 5.5002C8.78267 6.1031 9.46997 6.5 10.25 6.5H13.75C14.5284 6.5 15.2145 6.10471 15.6185 5.50391H17.5023V5.50002L17.75 5.5C18.1642 5.5 18.5 5.83579 18.5 6.25V14H20V6.25C20 5.00736 18.9926 4 17.75 4L15.9862 3.99944ZM10.25 3.5H13.75C14.1642 3.5 14.5 3.83579 14.5 4.25C14.5 4.66421 14.1642 5 13.75 5H10.25C9.83579 5 9.5 4.66421 9.5 4.25C9.5 3.83579 9.83579 3.5 10.25 3.5Z"
                            fill="#fff" />
                        <path
                            d="M19 15C21.2091 15 23 16.7909 23 19C23 21.1422 21.316 22.8911 19.1996 22.9951L19 23C18.5858 23 18.25 22.6642 18.25 22.25C18.25 21.8703 18.5322 21.5565 18.8982 21.5068L19 21.5C20.3807 21.5 21.5 20.3807 21.5 19C21.5 17.6745 20.4685 16.59 19.1644 16.5053L19 16.5C18.5858 16.5 18.25 16.1642 18.25 15.75C18.25 15.3703 18.5322 15.0565 18.8982 15.0068L19 15Z"
                            fill="#fff" />
                        <path
                            d="M15 15C15.4142 15 15.75 15.3358 15.75 15.75C15.75 16.1297 15.4678 16.4435 15.1018 16.4932L15 16.5C13.6193 16.5 12.5 17.6193 12.5 19C12.5 20.3255 13.5315 21.41 14.8356 21.4947L15 21.5C15.4142 21.5 15.75 21.8358 15.75 22.25C15.75 22.6297 15.4678 22.9435 15.1018 22.9932L15 23C12.7909 23 11 21.2091 11 19C11 16.8578 12.684 15.1089 14.8004 15.0049L15 15Z"
                            fill="#fff" />
                        <path
                            d="M15.25 18.25H18.75C19.1642 18.25 19.5 18.5858 19.5 19C19.5 19.3797 19.2178 19.6935 18.8518 19.7432L18.75 19.75H15.25C14.8358 19.75 14.5 19.4142 14.5 19C14.5 18.6203 14.7822 18.3065 15.1482 18.2568L15.25 18.25Z"
                            fill="#fff" />
                    </svg>`)
    );

    // INFO
    let info = document.createElement('div');
    info.className = "general_info";

    let infoTitle = document.createElement('p');
    infoTitle.className = "info_p";
    infoTitle.textContent = "Information";

    let gender = {
        1: "Female",
        2: "Male",
        0: "Unknown"
    }

    function createBox(label, value, cls) {
        let box = document.createElement('div');
        box.className = `${cls}-box box`;

        let p1 = document.createElement('p');
        p1.className = `${cls} meaning`;
        p1.textContent = label;

        let p2 = document.createElement('p');
        p2.className = `${cls}-meaning text`;
        p2.textContent = value || "-";

        box.append(p1, p2);
        return box;
    }

    info.append(
        infoTitle,
        createBox("Career:", item.known_for_department, "career"),
        createBox("Birthday:", item.birthday, "birthday"),
        createBox("Place of birth:", item.place_of_birth, "PlaceOfBirth"),
        createBox("Gender:", gender[item.gender], "gender")
    );

    // BUTTONS
    let btns = document.createElement('div');
    btns.className = "btns";

    let settingsBtn = document.createElement('div');
    settingsBtn.className = "settings-btn bnts";

    let settingsImg = document.createElement('img');
    settingsImg.src = "https://kinoarea.com/front/img/list.png";
    settingsImg.className = "settings-img";

    settingsBtn.append(settingsImg);

    let favBtn = document.createElement('div');
    favBtn.className = "favoutire-btn bnts";

    favBtn.innerHTML = `  <svg width="25" height="25" viewBox="0 0 22 20" xmlns="http://www.w3.org/2000/svg" class="svgHart film__fav-icon ">
                        <path d="M20.197 2.36559C19.0786 1.15249 17.5439 0.484375 15.8753 0.484375C14.6281 0.484375 13.4859 0.878684 12.4803 1.65626C11.9729 2.04875 11.5132 2.52895 11.1078 3.08942C10.7026 2.52911 10.2427 2.04875 9.73514 1.65626C8.72975 0.878684 7.58754 0.484375 6.34032 0.484375C4.67176 0.484375 3.13689 1.15249 2.01841 2.36559C0.913293 3.56451 0.30452 5.20241 0.30452 6.97779C0.30452 8.80509 0.985495 10.4778 2.44751 12.242C3.75539 13.82 5.63512 15.422 7.81189 17.277C8.55518 17.9105 9.3977 18.6285 10.2725 19.3934C10.5036 19.5959 10.8002 19.7073 11.1078 19.7073C11.4152 19.7073 11.712 19.5959 11.9427 19.3938C12.8176 18.6287 13.6606 17.9103 14.4042 17.2765C16.5807 15.4218 18.4604 13.82 19.7683 12.2418C21.2303 10.4778 21.9111 8.80509 21.9111 6.97762C21.9111 5.20241 21.3023 3.56451 20.197 2.36559Z"></path>
                    </svg>`;

    btns.append(settingsBtn, favBtn);

    leftSide.append(wayBox, name, share, info, btns);
    actor_info_container.append(img, leftSide);

    // Контейнер для всего блока
    // ======= Создаём весь блок Best Films через JS =======
    let best_films_container = document.createElement('div');
    best_films_container.className = 'best_films_container';

    // Верхний блок
    let upperBox = document.createElement('div');
    upperBox.className = 'upper-box';

    // Заголовок
    let title = document.createElement('h1');
    title.className = 'title';
    title.textContent = 'Best Films';
    upperBox.appendChild(title);

    // Блок кнопок и пагинации
    let btnsWrapper = document.createElement('div');
    btnsWrapper.className = 'best-films-btns';

    // Кнопка "next"
    let nextBtn = document.createElement('div');
    nextBtn.className = 'best-films-btn-next';
    let nextImg = document.createElement('img');
    nextImg.src = 'https://kinoarea.com/front/img/icons/arrow-left.svg';
    nextImg.alt = '';
    nextImg.className = 'best-films-last-btn';
    nextBtn.appendChild(nextImg);

    // Пагинация
    let pagination = document.createElement('div');
    pagination.className = 'best-film-pagination';
    let first = document.createElement('span');
    first.className = 'first';
    first.textContent = '1';
    let allSlides = document.createElement('span');
    allSlides.className = 'all-slides';
    allSlides.textContent = '4';
    pagination.appendChild(first);
    pagination.appendChild(document.createTextNode('/'));
    pagination.appendChild(allSlides);

    // Кнопка "prev"
    let prevBtn = document.createElement('div');
    prevBtn.className = 'best-films-btn-prev';
    let prevImg = document.createElement('img');
    prevImg.src = 'https://kinoarea.com/front/img/icons/arrow-right.svg';
    prevImg.alt = '';
    prevImg.className = 'best-films-next-btn';
    prevBtn.appendChild(prevImg);

    // Собираем кнопки и пагинацию
    btnsWrapper.appendChild(nextBtn);
    btnsWrapper.appendChild(pagination);
    btnsWrapper.appendChild(prevBtn);

    // Добавляем в верхний блок
    upperBox.appendChild(btnsWrapper);

    // Контейнер для фильмов
    let filmsContainer = document.createElement('div');
    filmsContainer.className = 'best_films';

    // Собираем всё вместе
    best_films_container.appendChild(upperBox);
    best_films_container.appendChild(filmsContainer);

    // Добавляем на страницу
    document.body.appendChild(best_films_container);

    // ======= Подключаем API и делаем листание фильмов =======
    let best_film_box = document.querySelector(".best_films");
    let next_btn = document.querySelector(".best-films-btn-next");
    let prev_btn = document.querySelector(".best-films-btn-prev");
    let now_lide = document.querySelector(".first");
    let all_slides = document.querySelector(".all-slides");

    api.get(`/person/${actorId}/movie_credits`)
        .then(res => {

            const crew = res.data.crew;
            const perPage = 4;
            const maxFilms = 16;
            const films = crew.slice(0, maxFilms);
            console.log(crew);
            let totalPages = Math.ceil(films.length / perPage);
            let currentPage = 1;

            if (totalPages < 1) {
                currentPage = 0
                totalPages = films.length
            }

            function renderPage() {
                let start = (currentPage - 1) * perPage;
                render(films.slice(start, start + perPage), best_film_box, Movie);
                now_lide.textContent = currentPage;
                all_slides.textContent = totalPages;
            }
            if (totalPages >= 1) {
                currentPage = 1
                prev_btn.onclick = () => {
                    currentPage++;
                    if (currentPage > totalPages) currentPage = 1;
                    renderPage();
                }

                next_btn.onclick = () => {
                    currentPage--;
                    if (currentPage < 1) currentPage = totalPages;
                    renderPage();
                }
            }
            renderPage();

        });


    // Контейнер для всего блока Movies
    let movies_container = document.createElement('div');
    movies_container.className = 'movies_container';

    // Верхний блок
    let upperBox_movie = document.createElement('div');
    upperBox_movie.className = 'upper-box';

    // Заголовок
    let title_movie = document.createElement('h1');
    title_movie.className = 'title';
    title_movie.textContent = 'Movies';
    upperBox_movie.appendChild(title_movie);

    // Блок кнопок и пагинации
    let btnsWrapper_movies = document.createElement('div');
    btnsWrapper_movies.className = 'movies-btns';

    // Кнопка "next"
    let nextBtn_movies = document.createElement('div');
    nextBtn_movies.className = 'movies-btn-next';
    let nextImg_movies = document.createElement('img');
    nextImg_movies.src = 'https://kinoarea.com/front/img/icons/arrow-left.svg';
    nextImg_movies.alt = '';
    nextImg_movies.className = 'movies-last-btn';
    nextBtn_movies.appendChild(nextImg_movies);

    // Пагинация
    let pagination_movies = document.createElement('div');
    pagination_movies.className = 'movies-pagination';
    let first_movie = document.createElement('span');
    first_movie.className = 'movies_first';
    first_movie.textContent = '1';
    let allSlides_movies = document.createElement('span');
    allSlides_movies.className = 'movies_all-slides';
    allSlides_movies.textContent = '4';

    pagination_movies.appendChild(first_movie);
    pagination_movies.appendChild(document.createTextNode('/'));
    pagination_movies.appendChild(allSlides_movies);

    // Кнопка "prev"
    let prevBtn_movies = document.createElement('div');
    prevBtn_movies.className = 'movies-btn-prev';
    let prevImg_movies = document.createElement('img');
    prevImg_movies.src = 'https://kinoarea.com/front/img/icons/arrow-right.svg';
    prevImg_movies.alt = '';
    prevImg_movies.className = 'movies-next-btn';
    prevBtn_movies.appendChild(prevImg_movies);

    // Собираем кнопки и пагинацию
    btnsWrapper_movies.appendChild(nextBtn_movies);
    btnsWrapper_movies.appendChild(pagination_movies);
    btnsWrapper_movies.appendChild(prevBtn_movies);

    // Добавляем кнопки в верхний блок
    upperBox_movie.appendChild(btnsWrapper_movies);

    // Контейнер для фильмов
    let filmsContainer_movies = document.createElement('div');
    filmsContainer_movies.className = 'movies';

    // Собираем весь блок
    movies_container.appendChild(upperBox_movie);
    movies_container.appendChild(filmsContainer_movies);

    // Добавляем на страницу
    document.body.appendChild(movies_container);

    // ===== API и листание фильмов =====
    let movies_box_movies = document.querySelector(".movies");
    let next_btn_movies = document.querySelector(".movies-btn-next");
    let prev_btn_movies = document.querySelector(".movies-btn-prev");
    let now_lide_movies = document.querySelector(".movies_first");
    let all_slides_movies = document.querySelector(".movies_all-slides");

  api.get(`/person/${actorId}/movie_credits`)
    .then(res => {
        const crew = res.data.cast;  // берём ВСЕ фильмы
        const perPage = 4;
        const films = crew.slice();  // копия массива без ограничения

        let totalPages = Math.ceil(films.length / perPage);
        let currentPage = 1;

        function renderPage() {
            let start = (currentPage - 1) * perPage;
            render(films.slice(start, start + perPage), movies_box_movies, Movie);

            now_lide_movies.textContent = currentPage;
            all_slides_movies.textContent = totalPages;
        }

        prev_btn_movies.onclick = () => {
            currentPage++;
            if (currentPage > totalPages) currentPage = 1;
            renderPage();
        }

        next_btn_movies.onclick = () => {
            currentPage--;
            if (currentPage < 1) currentPage = totalPages;
            renderPage();
        }

        renderPage();
    });

    fullContainer.append(actor_info_container, best_films_container, movies_container);

    return fullContainer;
}