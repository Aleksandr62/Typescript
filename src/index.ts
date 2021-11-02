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
  callback,
  handlerSubmitSearchForm,
  toggleFavoriteItem,
  getFavoritesAmount,
  getDataFromSearchForm,
  IPlace,
  ISearchFormData,
} from "./lib.js";

const API_URL = "http://localhost:4000/places";

localStorage.setItem("username", "Vasiliy");
localStorage.setItem("avatarUrl", "../img/avatar.png");

const { username, avatarUrl } = getUserData() as {
  username: string;
  avatarUrl: string;
};

window.addEventListener("DOMContentLoaded", () => {
  const resultBlock = document.getElementById("search-results-block");
  renderUserBlock({
    username,
    avatarUrl,
    favoriteItemsAmount: getFavoritesAmount(),
  });
  renderSearchFormBlock();
  renderSearchStubBlock();
  /*   renderToast(
    {
      text: "Это пример уведомления. Используйте его при необходимости",
      type: "success",
    },
    {
      name: "Понял",
      handler: () => {
        console.log("Уведомление закрыто");
      },
    }
  ); */
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
    const urlApi = searchData.price
      ? `${API_URL}?price_lte=${searchData.price}`
      : `${API_URL}`;
    const places = await getPlaces(urlApi);
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
      favoriteItemsAmount: getFavoritesAmount(),
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
