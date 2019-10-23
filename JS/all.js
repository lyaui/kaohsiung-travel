let url = `https://data.kcg.gov.tw/api/action/datastore_search?resource_id=92290ee5-6e61-456f-80c0-249eae2fcc97`
let data = [];

fetch(url)
    .then(res => res.json())
    .then(results => {
        data.push(...results.result.records)
        init();
    })

// 初始函式
function init() {

    // 監聽事件
    const selectMenu = document.querySelector('.select-menu__list');
    const areasBtn = Array.from(document.querySelectorAll('.hot-area__link'));
    selectMenu.addEventListener('change', selectedItem);
    areasBtn.forEach(btn => btn.addEventListener('click', selectedItem))

    // 初始選單呈現
    const allArea = data.map(current => current.Zone)
    const areaMenu = [...(new Set(allArea))];
    const areaMenuUI = `${areaMenu.map(current=>`<option value ="${current}" class="select-menu__item">${current}</option>`).join('')}`;
    selectMenu.insertAdjacentHTML('beforeend', areaMenuUI);

    //讀取所有資料
    update(data);

}

// 選取函式
function selectedItem(e) {
    e.preventDefault();
    // 確認讀取方式
    const selected = e.target.nodeName === 'SELECT' ? e.target.value : e.target.textContent;
    const selectedArea = data.filter(current =>
        current.Zone === selected)
    update(selectedArea)
}

// 畫面更新
function update(selectedArea) {
    const areas = document.querySelector('.areas');
    const titleName = selectedArea === data ? '所有地區' : selectedArea[0].Zone
    const title = `<h2 class="heading-2">${titleName}</h2>`
    const cards = `<div class = "area-cards">${selectedArea.map(current=>
    `<div class = "area-card">
        <div class = "area-card__img" style = "background-image: url(${current.Picture1})" >
        <h3 class = "heading-3"> ${current.Name} </h3>
        <h4 class = "heading-4"> ${current.Zone} </h4>
        </div>
        <div class = "area-card__info">
        <div class = "area-card__info-time">
        <i class = "fas fa-clock area-card__icon area-card__icon--time" ></i>${current.Opentime}</div>
        <div class = "area-card__info-location"> <i class = "fas fa-map-marker-alt area-card__icon
    area-card__icon--location "></i>${current.Add}</div>
    <div class = "area-card__info-phone"> <i
    class = "fas fa-mobile-alt area-card__icon area-card__icon--phone" ></i>${current.Tel}</div>
        <div class = "area-card__info-status">
        <i class = "fas fa-tag area-card__icon area-card__icon--status" ></i>${current.Ticketinfo}</div>
        </div> </div>`).join('')}`;

    areas.innerHTML = title + cards
}