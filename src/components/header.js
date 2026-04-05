import { api } from "../libs/api"
import { render } from "../libs/render"
import { SearchMovie } from "./searchMovie"
import { searchPerson } from "./searchPerson"

let close_search_window = document.querySelector(".close-search-window")
let account = JSON.parse(sessionStorage.getItem("log-datas"))

export function header() {
    let header = document.querySelector("header")

    header.innerHTML = `
    <div class="container head-cn">
    <div>
    <div class="header-left-top">
    <a href="/" class="logo-title"><img src="https://kinoarea.com/front/img/logo-icon.svg" width="22px"
    height="22px" alt="">Kino<span>area</span></a>
    <ul>
    <li><a href="#" class="logo-link"><img src="https://kinoarea.com/front/icons/threads.svg"
    alt=""></a></li>
    <li><a href="#" class="logo-link"><img src="/img/insta.png" alt=""></a></li>
    <li><a href="#" class="logo-link"> <svg width="18px" height="18px" viewBox="0 0 16 16"
    xmlns="http://www.w3.org/2000/svg" fill="#fff" class="bi bi-facebook">
    <path
    d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951z" />
    </svg>
    </a></li>
    <li><a href="#" class="logo-link"><svg xmlns="http://www.w3.org/2000/svg" width="18px" height="18px"
    viewBox="0 0 512 512">
    <path fill="#fff"
    d="M389.2 48h70.6L305.6 224.2L487 464H345L233.7 318.6L106.5 464H35.8l164.9-188.5L26.8 48h145.6l100.5 132.9zm-24.8 373.8h39.1L151.1 88h-42z" />
    </svg></a></li>
    </ul>
    </div>
    </div>
    <div class="header-center">
    <ul class="header-menu">
    <li><a href="/premiere-films" class="center-link">Premiere</a></li>
    <li><a href="/certain-page" class="center-link films-page">Films</a></li>
    <li><a href="/" class="center-link">Media</a></li>
    <li><a href="/all-actors-page" class="center-link">Persons</a></li>
    <li><a href="/" class="center-link">Collections</a></li>
    <li><a href="/" class="center-link">Upcoming</a></li>
    <li><a href="/" class="center-link">Search</a></li>
    </ul>
    </div>
    </div>
    
    <div class="overhide hide serch__screen">
    <div class="search-container">
    <a href="/" class="serch-logo-title"><img src="https://kinoarea.com/front/img/logo-icon.svg" width="30px"
    height="30px" alt="">Kino<span>area</span></a>
    
    <div class="inp-box">
    <input type="text" placeholder="Search" class="search-content" id="search-content" name="searching">
    <button class="search-btn">🔍</button>
    </div>
    <div class="search-box">
    <img src="https://kinoarea.com/front/img/icons/close-menu.svg" alt="" class="close-search-window">
    </div>
    <div class="search-type-box">
    <div class="type" id="movie">Movies</div>
    <div class="type" id="tv">TV</div>
    <div class="type" id="person">People</div>
    </div>

    
    <div class="render-box"></div>
    
    </div>
    </div>
    <div class="hide login-overhide">
        <div class="login-screen">
            <a href="/" class="logo-title"><img src="https://kinoarea.com/front/img/logo-icon.svg" width="22px"
                    height="22px" alt="">Kino<span>area</span></a>
            <img src="https://kinoarea.com/front/img/icons/close-menu.svg" alt="" class="close-login-window">

            <h1 class="login-title">Login</h1>
            <div class="inputs">
                <form class="login-form">
                    <input type="text" id="email-login" name="email_input" class="email-input user-inp" placeholder="Email">
                    <input type="text" id="name-login" name="name_input" class="name-input user-inp" placeholder="Name">
                    <button class="login-btn">Login</button>
                </form>
            </div>
            <a href="#" class="link-privacy">Privacy Policy</a>
            <div class="bnts">
                <button class="google-btn">
                    <img src="/gogle-img.png" alt="" class="google-img">    
                </button>
                <button class="twit-btn">
                    <img src="/twit-img.png" alt="" class="twit-img">
                </button>
            </div>
        </div>
        </div>
   `
    //    

    let search_waindow = document.querySelector(".serch__screen")
    let headCn = document.querySelector(".head-cn")
    const headerRight = document.createElement("div");
    headerRight.className = "header-right";

    const searchBtn = document.createElement("button");
    searchBtn.className = "serch-open";
    headerRight.appendChild(searchBtn);


    const head = document.querySelector("header");

    document.querySelector(".close-search-window").onclick = () => {
        search_waindow.classList.remove("show")
        search_waindow.classList.add("hide")
    }
    searchBtn.onclick = () => {
        search_waindow.classList.add("show")
        search_waindow.classList.remove("hide")
    }
    let login_scren = document.querySelector(".login-overhide")

    const loginBtn = document.createElement("button");
    loginBtn.className = "login";

    loginBtn.onclick = () => {
        login_scren.classList.remove("hide")
        login_scren.classList.add("show")
    }

    let close_login_window = document.querySelector(".close-login-window")
    let form_login = document.querySelector(".login-form")

    close_login_window.onclick = () => {
        login_scren.classList.remove("show")
        login_scren.classList.add("hide")
    }
    form_login.onsubmit = (e) => {
        e.preventDefault();
        let fn = new FormData(form_login);

        let regexes = {
            "email_input": /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-z]{2,}$/,
            "name_input": /^[a-zA-Zа-яА-ЯёЁ\s]{2,}$/
        };

        let valid = true;
        document.querySelectorAll(".user-inp").forEach(inp => {
            if (!regexes[inp.name].test(inp.value)) {
                valid = false;
            }
        });

        if (!valid) return;

        api.get("authentication/guest_session/new").then(res => {
            let datas = {
                email: fn.get("email_input"),
                name: fn.get("name_input"),
                sessionId: res.data.guest_session_id,
            };
            sessionStorage.setItem("log-datas", JSON.stringify(datas));

            // скрываем кнопку логина
            loginBtn.classList.add("hide");

            // создаём блок пользователя прямо сейчас
            const userDats = document.createElement("div");
            userDats.className = "user-dats";

            const userNames = document.createElement("div");
            userNames.className = "user-names";

            const hello = document.createElement("p");
            hello.className = "word-hello";
            hello.textContent = "Hello";

            const personName = document.createElement("p");
            personName.className = "person-name";
            personName.textContent = datas.name; // свежие данные

            userNames.append(hello, personName);

            const avatarBox = document.createElement("div");
            avatarBox.className = "log-avatar";

            const img = document.createElement("img");
            img.src = "https://kinoarea.com/front/img/comment-no-author.png";
            img.width = 220;
            img.height = 220;
            img.className = "user-icon";

            avatarBox.appendChild(img);
            userDats.append(userNames, avatarBox);

            headerRight.appendChild(userDats); // добавляем сразу
            login_scren.classList.remove("show")
            login_scren.classList.add("hide")
            login_scren.classList.add("hide"); // закрываем окно логина
        });
    }

    if (account) {
        let userDats = document.createElement("div")
        userDats.className = "user-dats"

        // блок с текстом
        let userNames = document.createElement("div")
        userNames.className = "user-names"

        let hello = document.createElement("p")
        hello.className = "word-hello"
        hello.textContent = "Hello"

        let personName = document.createElement("p")
        personName.className = "person-name"
        personName.textContent = account.name

        userNames.append(hello, personName)

        // аватар
        let avatarBox = document.createElement("div")
        avatarBox.className = "log-avatar"

        let img = document.createElement("img")
        img.src = "https://kinoarea.com/front/img/comment-no-author.png"
        img.width = 220
        img.height = 220
        img.className = "user-icon"

        avatarBox.appendChild(img)

        userDats.append(userNames, avatarBox)
        headerRight.appendChild(userDats);
    } else {
        headerRight.appendChild(loginBtn);
    }
    headCn.append(headerRight)

    let searchTypes = document.querySelectorAll(".type")
    let searchInp = document.querySelector('.search-content')
    let searchResults = document.querySelector(".render-box")

    function changeType(type) {
        searchInp.onkeyup = () => {
            api.get(`/search/${type}?query=${searchInp.value}`)
                .then(res => {
                    if (type == "movie") {
                        render(Object.values(res.data.results), searchResults, SearchMovie)
                    } else if (type == "person") {
                        render(Object.values(res.data.results), searchResults, searchPerson)
                    } else {
                        render(Object.values(res.data.results), searchResults, SearchMovie)
                    }
                })
        }

    }
    changeType('movie')

    searchTypes.forEach((type, i) => {
        type.onclick = () => {
            changeType(type.id)
        }
    })
}
