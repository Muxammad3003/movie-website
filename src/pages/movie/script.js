import { DetailedMovie } from "../../components/detailedMovie";
import { footer } from "../../components/footer";
import { header } from "../../components/header";
import { SearchMovie } from "../../components/searchMovie";
import { searchPerson } from "../../components/searchPerson";
import { api } from "../../libs/api";
import { render } from "../../libs/render";

header()
footer()

let movieId = JSON.parse(localStorage.getItem("movieId"))
api.get(`/movie/${movieId}`)
    .then(res => {
        DetailedMovie(res.data)
    })


