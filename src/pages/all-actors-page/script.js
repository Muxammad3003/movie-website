import { movieStarrings } from "../../components/detailedMovie";
import { footer } from "../../components/footer";
import { header } from "../../components/header";
import { api } from "../../libs/api";
import { render } from "../../libs/render";

header();
footer();

let actorsBox = document.querySelector(".datas-container");

try {
    // 1. Получаем список изменений людей
    let ids_functions = await api.get("/person/changes?page=1");

    // 2. Получаем детальные данные о каждом человеке
    let data = await Promise.all(
        ids_functions.data.results.map(item =>
            api.get(`/person/${item.id}`)
                .then(res => res.data) // возвращаем данные для Promise.all
                .catch(err => {
                    console.warn(`Ошибка при загрузке person ID ${item.id}`, err);
                    return null; // чтобы не падал Promise.all
                })
        )
    );

    // 3. Фильтруем неудачные запросы
    data = data.filter(Boolean);

    // 4. Рендерим массив персон
    render(data, actorsBox, movieStarrings);

} catch (err) {
    console.error("Ошибка загрузки изменений персон:");
}