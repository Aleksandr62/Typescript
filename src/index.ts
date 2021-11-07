import { renderSearchFormBlock } from "./search-form.js";
import {
  renderSearchStubBlock,
  renderSearchResultsBlock,
} from "./search-results.js";
import { renderUserBlock } from "./user.js";
import {
  getUserData,
  renderToast,
  toggleFavoriteItem,
  getFavoritesAmount,
  getDataFromSearchForm,
} from "./lib.js";
import { search, booking } from "./services.js";
import { IUser, IPlace, ISearchFormData, IFavorite } from "./types.js";

localStorage.setItem("username", "Vasiliy");
localStorage.setItem("avatarUrl", "../img/avatar.png");

const { username, avatarUrl } = getUserData() as IUser;
const favoriteItemsAmount = getFavoritesAmount();

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

  if (searchForm)
    searchForm.onsubmit = (e: Event) =>
      searchAllFlats(e, resultBlock as HTMLElement, searchForm);
});

function searchAllFlats(
  e: Event,
  resultBlock: HTMLElement,
  searchForm: HTMLFormElement
) {
  {
    e.preventDefault();
    if (resultBlock)
      resultBlock.removeEventListener("click", listenerResultSearch);

    shouldUpdateSearch(e, resultBlock, searchForm);

    const searchData = getDataFromSearchForm(new FormData(searchForm));
    search(searchData, (places) => {
      if (places instanceof Error)
        renderToast(
          {
            text: places.message,
            type: "error",
          },
          null
        );
      else renderSearchResultsBlock(places);
    });

    if (resultBlock)
      resultBlock.addEventListener("click", listenerResultSearch);
    if (resultBlock)
      resultBlock.addEventListener("click", (e: MouseEvent) =>
        listenerBooking(e, searchData)
      );
  }
}

function listenerResultSearch(e: MouseEvent) {
  const { id, name, image } = (<HTMLDivElement>e.target).dataset;
  if (id) {
    toggleFavoriteItem({
      id,
      name,
      image,
    } as IFavorite);
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
  const provider = (<HTMLElement>e.target).dataset.provider;
  const { checkInDate, checkOutDate } = bookingParams;

  const response = await booking(
    provider as string,
    id as string,
    checkInDate as Date,
    checkOutDate as Date
  );
  if (response instanceof Error)
    result = {
      text: response.message,
      type: "error",
    };
  if (typeof response === "number" || (<Response>response).ok)
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

function shouldUpdateSearch(
  e: Event,
  resultBlock: HTMLElement,
  searchForm: HTMLFormElement
) {
  setTimeout(
    () =>
      renderToast(
        {
          text: "Данные устарели. Обновите поиск",
          type: "error",
        },
        {
          name: "Обновить",
          handler: () => searchAllFlats(e, resultBlock, searchForm),
        }
      ),
    1000 * 60 * 5
  );
}
