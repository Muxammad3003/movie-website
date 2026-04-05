export function searchPerson(item) {
    const rightBox = document.createElement('div');
    rightBox.onclick = () => {
        window.location.href = "/actor-page"
        localStorage.setItem('actorId', item.id)
    }
    rightBox.className = 'pop-r-box';
    rightBox.innerHTML = `
    <img src= "https://image.tmdb.org/t/p/original${item.profile_path}" alt="" class="popular-people-img-right">
    <div class="pop-names-box">
        <p class="pop-name">${item.name}</p>
        <p class="pop-fullname">${item.original_name}</p>
        </div>`
        
    return rightBox;
}