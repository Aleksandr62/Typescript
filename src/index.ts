///<reference path="flat-rent-sdk.d.ts" />
import { IParams, FlatRentSdk } from "./flat-rent-sdk.js";
import { renderSearchFormBlock } from "./search-form.js";
import {
  renderSearchStubBlock,
  renderSearchResultsBlock,
} from "./search-results.js";
import { renderUserBlock } from "./user.js";
import { getPlaces, postBookingPlace } from "./api.js";
import {
  getUserData,
  renderToast,
  toggleFavoriteItem,
  getFavoritesAmount,
  getDataFromSearchForm,
  search,
} from "./lib.js";
import { IUser, IPlace, ISearchFormData } from "./types.js";

const API_URL = "http://localhost:4000/places";

localStorage.setItem("username", "Vasiliy");
localStorage.setItem("avatarUrl", "../img/avatar.png");

const { username, avatarUrl } = getUserData() as IUser;
const favoriteItemsAmount = getFavoritesAmount();
const flatRentSdk = new FlatRentSdk();

window.addEventListener("DOMContentLoaded", () => {
  const resultBlock = document.getElementById("search-results-block");

  renderUserBlock({
    username,
    avatarUrl,
    favoriteItemsAmount,
  });
  renderSearchFormBlock();
  renderSearchStubBlock();
  const searchForm = document.querySelector("form");

  searchForm.onsubmit = async (e: Event) => {
    e.preventDefault();
    resultBlock.removeEventListener("click", listenerResultSearch);

    setTimeout(
      () =>
        renderToast(
          {
            text: "Данные устарели. Обновите поиск",
            type: "error",
          },
          {
            name: "Обновить",
            handler: () => searchForm.onsubmit(e),
          }
        ),
      1000 * 60 * 5
    );

    const searchData = getDataFromSearchForm(new FormData(searchForm));

    let paramsSearchFlatRent: IParams = {
      city: searchData.city,
      checkInDate: new Date(searchData.arrival),
      checkOutDate: new Date(searchData.departure),
    };
    if (searchData.price)
      paramsSearchFlatRent.priceLimit = parseInt(searchData.price);

    let places = [];
    if (searchData.provider.indexOf("homy") !== -1)
      places = [...(await search(API_URL, searchData))];
    if (searchData.provider.indexOf("flat-rent") !== -1)
      places = [...places, ...(await flatRentSdk.search(paramsSearchFlatRent))];

    renderSearchResultsBlock(places);
    resultBlock.addEventListener("click", listenerResultSearch);
    resultBlock.addEventListener("click", (e) =>
      listenerBooking(e, searchData)
    );

    /*     handlerSubmitSearchForm(callback); */
  };
});

function listenerResultSearch(e: MouseEvent) {
  const { id, name, image } = (<HTMLDivElement>e.target).dataset;
  if (id) {
    toggleFavoriteItem({
      id,
      name,
      image,
    });
    (<HTMLDivElement>e.target).classList.toggle("active");
    renderUserBlock({
      username,
      avatarUrl,
      favoriteItemsAmount,
    });
  }
}

async function listenerBooking(
  e: MouseEvent,
  bookingParams: Partial<ISearchFormData>
) {
  e.stopPropagation();
  if ((<HTMLElement>e.target).tagName !== "BUTTON") return;
  let result = {
    text: "Ошибка бронирования",
    type: "error",
  };
  const id = (<HTMLElement>e.target).dataset.btnId;
  const place: IPlace = await getPlaces(`${API_URL}/${id}`);
  const { arrival, departure } = bookingParams;
  (<Partial<ISearchFormData>[]>place.bookedDates).push({ arrival, departure });

  const response = await postBookingPlace(`${API_URL}/${id}`, place);
  if (response.ok)
    result = {
      text: "Бронирование успешно завершено",
      type: "success",
    };
  renderToast(result, {
    name: "Закрыть",
    handler: () => {
      console.log("Уведомление закрыто");
    },
  });
}
