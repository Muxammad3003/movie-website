import { Chart, DoughnutController, ArcElement, Tooltip } from 'chart.js';

// обязательно регистрируем контроллер и элементы
Chart.register(DoughnutController, ArcElement, Tooltip);
import { api } from "../libs/api";
import { render } from "../libs/render";
import { movieGenres } from "./Movie"

let container = document.querySelector(".movie-cn")
let bgBox = document.querySelector(".bg-box")
let movieId = JSON.parse(localStorage.getItem("movieId"))
// let accountId = "22829553"

export function movieStarrings(item) {
    const actorBox = document.createElement("div");
    actorBox.className = "actor-box";

    const img = document.createElement("img");
    img.className = "actor-img";
    if (item.profile_path) {
        img.src = `https://image.tmdb.org/t/p/original${item.profile_path}`
    } else {
        img.classList.add("not-found")
    }
    img.alt = "actor-img";

    const namesBox = document.createElement("div");
    namesBox.className = "actor-names-box";

    const name = document.createElement("a");
    name.className = "name";
    name.textContent = item.name
    name.href = "#";

    const originName = document.createElement("a");
    originName.className = "origin-name";
    originName.textContent = item.original_name
    originName.href = "#";

    namesBox.appendChild(name);
    namesBox.appendChild(originName);

    actorBox.appendChild(img);
    actorBox.appendChild(namesBox);

    actorBox.onclick = () => {
        window.location.href = "/actor-page"
        localStorage.setItem('actorId', item.id)
    }

    return actorBox;
}

export function DetailedMovie(item) {
    bgBox.style.backgroundImage = `url(https://image.tmdb.org/t/p/original${item.backdrop_path})`;
    let parentBox = document.createElement("div")
    parentBox.className = "parent-box"
    let bottomContainer = document.createElement("div")
    bottomContainer.className = "bottomContainer"
    const left = document.createElement("div");
    left.className = "cn-movie-left";

    const img = document.createElement("img");
    img.className = "movie-left-img";
    img.src = `https://image.tmdb.org/t/p/original${item.poster_path}`;

    left.appendChild(img);

    const right = document.createElement("div");
    right.className = "cn-movie-right";

    const navigation = document.createElement("p");
    navigation.className = "navigation";
    navigation.textContent = `Home > Films > ${item.title}`;

    const title = document.createElement("h3");
    title.className = "movie-title";
    title.textContent = item.title;

    const smallTitle = document.createElement("p");
    smallTitle.className = "movie-small-title";
    smallTitle.textContent = `${item.title} ${item.release_date.slice(0, 4)}`;

    const diagrams = document.createElement("div");
    diagrams.className = "diagrams";

    let rating_text = document.createElement('p')
    rating_text.className = "rating-text"
    rating_text.textContent = "Kinoarea"

    const rating_box = document.createElement("div");
    rating_box.className = "rating-box";
    diagrams.appendChild(rating_box);

    const rating = item.vote_average ? item.vote_average.toFixed(1) : "—";
    const ratingVal = parseFloat(rating) || 0;
    const radius = 22;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference - (ratingVal / 10) * circumference;

    let ratingColor = "#e74c3c";
    if (ratingVal >= 7) ratingColor = "#2ecc71";
    else if (ratingVal >= 5) ratingColor = "#f0c040";

    const ratingBtn = document.createElement("div");
    ratingBtn.className = "diagram-rating";

    // Используем шаблонные строки с обратными кавычками
    ratingBtn.innerHTML = `
<svg width="75" height="70" viewBox="0 0 60 65">
    <circle cx="28" cy="28" r="${radius}" fill="#1d2a44" stroke="#2b3d5c" stroke-width="4"/>
    <circle cx="28" cy="28" r="${radius}" fill="none" stroke="${ratingColor}" stroke-width="4"
        stroke-dasharray="${circumference}" stroke-dashoffset="${offset}"
        stroke-linecap="round" transform="rotate(-90 28 28)"/>
</svg>
<span class="diagram-rating-val">${rating}</span>
`;

    diagrams.appendChild(ratingBtn, rating_box);

    const btn_1 = document.createElement("button");
    btn_1.className = "diagram-btns watch-list";
    let btn_1_img = document.createElement("img")
    btn_1_img.className = "watch-list-img"
    btn_1_img.src = "https://kinoarea.com/front/img/list.png"
    btn_1.append(btn_1_img)
    diagrams.appendChild(btn_1);

    const btn_2 = document.createElement("button");
    btn_2.className = "diagram-btns favourite";
    btn_2.innerHTML = `
    <svg width="22" height="20" viewBox="0 0 22 20" xmlns="http://www.w3.org/2000/svg" class="svgHart film__fav-icon ">
    <path d="M20.197 2.36559C19.0786 1.15249 17.5439 0.484375 15.8753 0.484375C14.6281 0.484375 13.4859 0.878684 12.4803 1.65626C11.9729 2.04875 11.5132 2.52895 11.1078 3.08942C10.7026 2.52911 10.2427 2.04875 9.73514 1.65626C8.72975 0.878684 7.58754 0.484375 6.34032 0.484375C4.67176 0.484375 3.13689 1.15249 2.01841 2.36559C0.913293 3.56451 0.30452 5.20241 0.30452 6.97779C0.30452 8.80509 0.985495 10.4778 2.44751 12.242C3.75539 13.82 5.63512 15.422 7.81189 17.277C8.55518 17.9105 9.3977 18.6285 10.2725 19.3934C10.5036 19.5959 10.8002 19.7073 11.1078 19.7073C11.4152 19.7073 11.712 19.5959 11.9427 19.3938C12.8176 18.6287 13.6606 17.9103 14.4042 17.2765C16.5807 15.4218 18.4604 13.82 19.7683 12.2418C21.2303 10.4778 21.9111 8.80509 21.9111 6.97762C21.9111 5.20241 21.3023 3.56451 20.197 2.36559Z"></path> </svg>`
    diagrams.appendChild(btn_2);
    btn_2.onclick = () => {
        btn_2.classList.add("fav-added")
    }


    const btn_3 = document.createElement("button");
    btn_3.className = "diagram-btns choose";
    btn_3.innerHTML = `<svg width="28" height="26" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" class="svgHart film__fav-icon film__exp-icon ">  <path d="M12 2l2.4 7.2h7.6l-6 4.8 2.4 7.2-6-4.8-6 4.8 2.4-7.2-6-4.8h7.6z"></path> </svg>`
    diagrams.appendChild(btn_3);
    btn_3.onclick = async () => {
        btn_3.classList.add("choosen")
    }

    const description = document.createElement("p");
    description.className = "description";
    description.textContent = item.overview

    const trailerBtn = document.createElement("button");
    trailerBtn.className = "trailer-btn";
    trailerBtn.textContent = "Watch Trailer";

    const smallData = document.createElement("div");
    smallData.className = "small-data";

    const data = [
        "Premiere World: " + item.release_date,
        "Premiere US: " + item.release_date,
        "Time: " + item.runtime,
        "Slogan: " + item.tagline,
        "MPAA Rating: R",
        "Genre: " + item.genres.map(item => movieGenres[item.id] || "Unknown"),
        "Year: " + item.release_date.slice(0, 4),
        "Country: " + item.production_countries.map(item => item.name),
        "Production: Chris Hemsworth",
        "Camera: Erik Wilson",
        "Art: Scott Dougan",
        "Studios: Amazon MGM Studios"
    ];

    data.forEach(elem => {
        const p = document.createElement("p");
        p.className = "movie-parameters"
        p.textContent = elem;
        smallData.appendChild(p);

    });

    right.appendChild(navigation);
    right.appendChild(title);
    right.appendChild(smallTitle);
    right.appendChild(diagrams);
    right.appendChild(description);
    right.appendChild(trailerBtn);

    parentBox.appendChild(left);
    parentBox.appendChild(right);
    bottomContainer.append(smallData)

    // actors
    const actors_container = document.createElement("div");
    actors_container.className = "movieSarrings-container container";

    const actorsBox = document.createElement("div");
    actorsBox.className = "actors-box";

    api.get(`/movie/${movieId}/credits`)
        .then(res => {
            render(res.data.cast.slice(0, 10), actorsBox, movieStarrings)
            actors_container.appendChild(actorsBox);
        })
    const headBox = document.createElement("div");
    headBox.className = "movie-star-head-box";

    const actor_title = document.createElement("h1");
    actor_title.className = "movie-star-h1";
    actor_title.textContent = "Starrings"

    const allActors = document.createElement("p");
    allActors.className = "movie-star-p";
    allActors.textContent = "All actors "
    allActors.onclick = () => {
        window.location.href = `/all-details?type=credits&title=Actors&page=Actors`
    }

    const span = document.createElement("span");
    span.className = "new-trailer-p-span";
    span.innerHTML = '&#8594;'
    span.style.fontSize = "20px";


    allActors.appendChild(span);
    headBox.appendChild(actor_title);
    headBox.appendChild(allActors);
    actors_container.appendChild(headBox);

    // sections btns
    const sections_name = ["Trailers", "Posters", "Photos"];
    const sections = ["trailer-container", "movie-posters-container", "movie-photo-container"]

    const container_btn = document.createElement('div');
    container_btn.className = 'btn-of-sections';

    sections_name.forEach((text, index) => {
        const btn = document.createElement('button');
        btn.className = 'section-btn';
        btn.textContent = text;

        btn.onclick = () => {
            document.querySelectorAll('.section-btn').forEach(b => b.classList.remove('active'));

            const section = document.querySelector(`.${sections[index]}`);
            if (section) {
                section.scrollIntoView({ behavior: "smooth" });
            }
        };

        container_btn.appendChild(btn);
    });

    // trailer
    const trailer_container = document.createElement("div");
    trailer_container.className = "trailer-container";

    const trailer_headBox = document.createElement("div");
    trailer_headBox.className = "movie-trailer-head-box";

    const trailer_title = document.createElement("h1");
    trailer_title.className = "movie-trailer-h1";
    trailer_title.textContent = "Trailer";

    const p = document.createElement("p");
    p.className = "movie-trailer-p";
    p.textContent = "All trailers ";

    const trailer_span = document.createElement("span");
    trailer_span.className = "new-trailer-p-span";
    trailer_span.style.fontSize = "20px";
    trailer_span.innerHTML = "&#8594;";

    p.appendChild(trailer_span);
    p.onclick = () => {
        window.location.href = `/all-details?type=videos&title=Trailers&page=All Trailers&filmname=${item.title}`
    }
    trailer_headBox.appendChild(trailer_title);
    trailer_headBox.appendChild(p);

    const iframe = document.createElement("iframe");
    iframe.width = "1430";
    iframe.height = "804";
    api.get(`/movie/${item.id}/videos`).then(res => {
        console.log(res);

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

    const footBox = document.createElement("div");
    footBox.className = "movie-trailer-foot-box";

    const footTitle = document.createElement("h1");
    footTitle.className = "movie-trailer-h1";
    footTitle.textContent = `${item.title} - Trailer`;

    const shareBox = document.createElement("div");
    shareBox.className = "trailers__share";

    function createShareBtn(svgContent) {
        const a = document.createElement("a");
        a.href = "#";
        a.className = "trailers__share-btn";
        a.innerHTML = svgContent;
        return a;
    }

    const svgs = [

        `<svg width="25px" height="25px" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" fill="#fff"
              class="bi bi-facebook">
              <path
                d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951z" />
            </svg>`,

        `<svg width="25px" height="25px" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" fill="#fff"
              class="bi bi-whatsapp">
              <path
                d="M13.601 2.326A7.854 7.854 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.933 7.933 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.898 7.898 0 0 0 13.6 2.326zM7.994 14.521a6.573 6.573 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.557 6.557 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592zm3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.729.729 0 0 0-.529.247c-.182.198-.691.677-.691 1.654 0 .977.71 1.916.81 2.049.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232z" />
            </svg>`,

        `<svg xmlns="http://www.w3.org/2000/svg" width="25" height="25"
              viewBox="0 0 512 512">
              <path fill="#fff"
                d="M389.2 48h70.6L305.6 224.2L487 464H345L233.7 318.6L106.5 464H35.8l164.9-188.5L26.8 48h145.6l100.5 132.9zm-24.8 373.8h39.1L151.1 88h-42z" />
            </svg>`,

        `<svg fill="#fff" width="30px" height="30px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <circle cx="9.67" cy="13" r="1.001" />
              <path
                d="M14.09 15.391A3.28 3.28 0 0 1 12 16a3.271 3.271 0 0 1-2.081-.63.27.27 0 0 0-.379.38c.71.535 1.582.809 2.471.77a3.811 3.811 0 0 0 2.469-.77v.04a.284.284 0 0 0 .006-.396.28.28 0 0 0-.396-.003zm.209-3.351a1 1 0 0 0 0 2l-.008.039c.016.002.033 0 .051 0a1 1 0 0 0 .958-1.038 1 1 0 0 0-1.001-1.001z" />
              <path
                d="M12 2C6.479 2 2 6.477 2 12c0 5.521 4.479 10 10 10s10-4.479 10-10c0-5.523-4.479-10-10-10zm5.859 11.33c.012.146.012.293 0 .439 0 2.24-2.609 4.062-5.83 4.062s-5.83-1.82-5.83-4.062a2.681 2.681 0 0 1 0-.439 1.46 1.46 0 0 1-.455-2.327 1.458 1.458 0 0 1 2.063-.063 7.145 7.145 0 0 1 3.899-1.23l.743-3.47v-.004A.313.313 0 0 1 12.82 6l2.449.49a1.001 1.001 0 1 1-.131.61L13 6.65l-.649 3.12a7.123 7.123 0 0 1 3.85 1.23 1.46 1.46 0 0 1 2.469 1c.01.563-.307 1.08-.811 1.33z" />
            </svg>`,

        ` <svg fill="#fff" width="25px" height="25px" viewBox="0 0 32 32" version="1.1"
              xmlns="http://www.w3.org/2000/svg">
              <path
                d="M30.996 7.824v17.381c0 0 0 0 0 0.001 0 1.129-0.915 2.044-2.044 2.044-0 0-0 0-0.001 0h-4.772v-11.587l-8.179 6.136-8.179-6.136v11.588h-4.772c0 0 0 0-0 0-1.129 0-2.044-0.915-2.044-2.044 0-0 0-0.001 0-0.001v0-17.381c0-0 0-0.001 0-0.001 0-1.694 1.373-3.067 3.067-3.067 0.694 0 1.334 0.231 1.848 0.619l-0.008-0.006 10.088 7.567 10.088-7.567c0.506-0.383 1.146-0.613 1.84-0.613 1.694 0 3.067 1.373 3.067 3.067v0z">
              </path>
            </svg>`,

        `<svg width="25px" height="25px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
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
            </svg>`

    ];

    svgs.forEach(svg => {
        shareBox.appendChild(createShareBtn(svg));
    });

    footBox.appendChild(footTitle);
    footBox.appendChild(shareBox);

    trailer_container.appendChild(trailer_headBox);
    trailer_container.appendChild(iframe);
    trailer_container.appendChild(footBox);

    // poster
    const posterContainer = document.createElement('div');
    posterContainer.classList.add('movie-posters-container');

    const posterHeadBox = document.createElement('div');
    posterHeadBox.classList.add('movie-posters-head-box');

    const posterH1 = document.createElement('h1');
    posterH1.classList.add('movie-posters-h1');
    posterH1.textContent = "Movie Posters";

    const posterP = document.createElement('p');
    posterP.classList.add('movie-posters-p');
    posterP.textContent = "All posters "
    posterP.onclick = () => {
        window.location.href = `/all-details?type=images&title=Posters&page=All Posters`
    }

    const posterSpan = document.createElement('span');
    posterSpan.style.fontSize = '20px';
    posterSpan.classList.add('new-trailer-p-span');
    posterSpan.innerHTML = '&#8594;';

    posterP.appendChild(posterSpan);
    posterHeadBox.appendChild(posterH1);
    posterHeadBox.appendChild(posterP);
    posterContainer.appendChild(posterHeadBox);

    const postersDiv = document.createElement('div');
    postersDiv.classList.add('posters');

    const posterName = document.createElement('p');
    posterName.classList.add('movie-posters-name');
    posterName.textContent = item.name;
    postersDiv.appendChild(posterName);

    const posterBox = document.createElement('div');
    posterBox.classList.add('posters-box');

    api.get(`/movie/${movieId}/images`)
        .then(res => {
            let posterImg = res.data.posters.slice(0, 3)
            posterImg.forEach(poster => {
                const posterImg = document.createElement('img');
                posterImg.src = `https://image.tmdb.org/t/p/w500${poster.file_path}`;
                posterImg.alt = "poster not found";
                posterImg.classList.add('poster-img');
                posterBox.appendChild(posterImg);
            });
        })

    postersDiv.appendChild(posterBox);
    posterContainer.appendChild(postersDiv);

    // photos
    let photoContainer = document.createElement('div');
    photoContainer.classList.add('movie-photo-container');

    // Header
    let photoHeadBox = document.createElement('div');
    photoHeadBox.classList.add('movie-photo-head-box');

    let photoH1 = document.createElement('h1');
    photoH1.classList.add('movie-photo-h1');
    photoH1.textContent = "Photos from the movie";

    let photoP = document.createElement('p');
    photoP.classList.add('movie-photo-p');
    photoP.innerHTML = `All photos <span style="font-size: 20px;" class="new-trailer-p-span">&#8594;</span>`;
    photoP.onclick = () => {
        window.location.href = `/all-details?type=images&title=Photos&page=All Photos`
    }


    photoHeadBox.appendChild(photoH1);
    photoHeadBox.appendChild(photoP);

    // Photos section
    let photoPhotosContainer = document.createElement('div');
    photoPhotosContainer.classList.add('movie-photos');

    let photoName = document.createElement('p');
    photoName.classList.add('movie-photo-name');
    photoName.textContent = item.name;

    let photoBox = document.createElement('div');
    photoBox.classList.add('movie-photo');

    // обычные фото

    // последний фото с overlay
    let photoLastBox = document.createElement('div');
    photoLastBox.classList.add('last-photo-box');

    let photoOverlay = document.createElement('div');
    photoOverlay.classList.add('photo-overhide');
    photoLastBox.appendChild(photoOverlay);

    api.get(`/movie/${movieId}/images`)
        .then(res => {
            let photos = res.data.backdrops.slice(0, 4);
            let math = res.data.backdrops.length - 4;
            photoOverlay.textContent = "+" + math;

            photos.forEach((poster, index) => {
                const photoImg = document.createElement('img');
                photoImg.src = `https://image.tmdb.org/t/p/w500${poster.file_path}`;
                photoImg.alt = "poster not found";
                photoImg.classList.add('photo-img');

                // Если это последний из 4, добавляем его в overlay
                if (index === 3) {
                    photoLastBox.appendChild(photoImg);
                    photoBox.appendChild(photoLastBox);
                } else {
                    photoBox.appendChild(photoImg);
                }
            });
        });

    photoPhotosContainer.appendChild(photoName);
    photoPhotosContainer.appendChild(photoBox);

    photoContainer.appendChild(photoHeadBox);
    photoContainer.appendChild(photoPhotosContainer);


    container.append(parentBox, bottomContainer, actors_container, container_btn, trailer_container, posterContainer, photoContainer)
    let trailerSection = document.querySelector(".trailer-container")
    trailerBtn.onclick = () => {
        trailerSection.scrollIntoView({ behavior: "smooth" })
    }

    return container
}


