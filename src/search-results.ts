import { renderBlock } from "./lib.js";
import { IPlace } from "./types.js";
import { getFavoriteItemById } from "./lib.js";

export function renderSearchStubBlock() {
  renderBlock(
    "search-results-block",
    `
    <div class="before-results-block">
      <img src="img/start-search.png" />
      <p>Чтобы начать поиск, заполните форму и&nbsp;нажмите "Найти"</p>
    </div>
    `
  );
}

export function renderEmptyOrErrorSearchBlock(reasonMessage) {
  renderBlock(
    "search-results-block",
    `
    <div class="no-results-block">
      <img src="img/no-results.png" />
      <p>${reasonMessage}</p>
    </div>
    `
  );
}

export function renderSearchResultsBlock(places: IPlace[]) {
  renderBlock(
    "search-results-block",
    `
    <div class="search-results-header">
        <p>Результаты поиска</p>
        <div class="search-results-filter">
            <span><i class="icon icon-filter"></i> Сортировать:</span>
            <select>
                <option selected="">Сначала дешёвые</option>
                <option selected="">Сначала дорогие</option>
                <option>Сначала ближе</option>
            </select>
        </div>
    </div>
    <ul class="results-list">
    ${Object.keys(places)
      .map((key) => renderSearchResultsItems(places[key]))
      .join("")}
    </ul>
    `
  );
}

function renderSearchResultsItems(place: IPlace) {
  return `
  <li class="result">
<div class="result-container">
  <div class="result-img-container">
    <div data-id="${place.id}" 
      data-name="${place.name || place.title}"
      data-image="${place.image || place.photos[0]}"
      class="favorites ${getFavoriteItemById(place.id) ? "active" : ""}"></div>
    <img class="result-img" src="${place.image || place.photos[0]}" alt="">
  </div>	
  <div class="result-info">
    <div class="result-info--header">
      <p>${place.name || place.title}</p>
      <p class="price">${place.price || place.totalPrice}&#8381;</p>
    </div>
    <div class="result-info--map"><i class="map-icon"></i> 
    ${place.remoteness || "-"}км от вас</div>
    <div class="result-info--descr">${place.description || place.details}</div>
    <div class="result-info--footer">
      <div>
        <button data-btn-id="${place.id}">Забронировать</button>
      </div>
    </div>
  </div>
</div>
</li>`;
}
