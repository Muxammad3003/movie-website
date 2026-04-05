import { actorInformation } from "../../components/actor_page";
import { footerWithSection } from "../../components/footer.section";
import { header } from "../../components/header";
import { api } from "../../libs/api";
header()
footerWithSection()

let actorId = JSON.parse(localStorage.getItem('actorId'));
let actor_box = document.querySelector("main")

api.get(`/person/${actorId}`)
    .then(res => {
        let arr = actorInformation(res.data)
        actor_box.append(arr)
    })