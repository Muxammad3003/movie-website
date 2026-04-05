import { allMovie } from "../../components/all-movie";
import { footer } from "../../components/footer";
import { header } from "../../components/header";
import { api } from "../../libs/api";
import { render } from "../../libs/render";

header()
footer()

let box = document.querySelector('.datas-container')

let ids_functions = await api.get("/movie/changes?page=1")

let data = await Promise.all(
    ids_functions.data.results.map(item =>
        api.get(`/movie/${item.id}`)
            .then(res => res.data)
    )
)

render(data, box, allMovie)