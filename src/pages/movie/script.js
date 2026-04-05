import { DetailedMovie } from "../../components/detailedMovie";
import { footerWithSection } from "../../components/footer.section";
import { header } from "../../components/header";
import { api } from "../../libs/api";

header()
footerWithSection()

let movieId = JSON.parse(localStorage.getItem("movieId"))
api.get(`/movie/${movieId}`)
    .then(res => {
        DetailedMovie(res.data)
    })



