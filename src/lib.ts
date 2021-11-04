import { ISearchFormData, IPlace, IFavorite } from "./types.js";
import { getPlaces } from "./api.js";

export function renderBlock(elementId: string, html: string) {
  const element = document.getElementById(elementId);
  element.innerHTML = html;
}

export function renderToast(message, action) {
  let messageText = "";

  if (message != null) {
    messageText = `
      <div id="info-block" class="info-block ${message.type}">
        <p>${message.text}</p>
        <button id="toast-main-action">${action?.name || "Закрыть"}</button>
      </div>
    `;
  }

  renderBlock("toast-block", messageText);

  const button = document.getElementById("toast-main-action");
  if (button != null) {
    button.onclick = function () {
      if (action != null && action.handler != null) {
        action.handler();
      }
      renderToast(null, null);
    };
  }
}

export function getDefaultDate(addDays: number): Date {
  const result = new Date();
  result.setDate(result.getDate() + addDays);
  return result;
}

export function getUserData(): unknown {
  const username: string = localStorage.getItem("username");
  const avatarUrl: string = localStorage.getItem("avatarUrl");
  return { username, avatarUrl };
}

export function getFavoritesAmount(): string {
  const allFavoriteItems =
    JSON.parse(localStorage.getItem("favoriteItems")) || [];
  return `${allFavoriteItems.length || ""}`;
}

export async function search(
  url: string,
  props: ISearchFormData
): Promise<IPlace[]> {
  const { arrival, departure, price } = props;
  const bookingDays = getBookingDays(new Date(arrival), new Date(departure));
  const ifPrice = price ? `?price_lte=${price}` : "";
  const places = await getPlaces(url + ifPrice);
  (<IPlace[]>places).forEach((element) => {
    element.totalPrice = element.price * bookingDays;
    delete element.price;
  });
  return places;
}

export function callback(props: IPlace[] | Error) {
  console.log(props);
}

/* export function handlerSubmitSearchForm(cb: (props: IPlace[] | Error) => void) {
  search({
    arrival: (<HTMLInputElement>document.getElementById("check-in-date")).value,
    departure: (<HTMLInputElement>document.getElementById("check-out-date"))
      .value,
    price: parseInt(
      (<HTMLInputElement>document.getElementById("max-price")).value
    ),
  });
  const paramSearch =
    Math.random() > 0.5 ? new Error("Ошибка") : ([] as IPlace[]);
  setTimeout(() => cb(paramSearch), 1000);
} */

export function getAllFavoriteItems() {
  return JSON.parse(localStorage.getItem("favoriteItems")) || [];
}

export function getFavoriteItemById(id: string): boolean {
  return Boolean(
    getAllFavoriteItems()?.find((item: IFavorite) => item.id === id)
  );
}

export function toggleFavoriteItem(favorite: IFavorite) {
  const allFavoriteItems = getAllFavoriteItems();
  const updateFavoriteItems = allFavoriteItems.filter(
    (item) => favorite.id !== item.id
  );
  if (updateFavoriteItems.length !== allFavoriteItems.length)
    return localStorage.setItem(
      "favoriteItems",
      JSON.stringify(updateFavoriteItems)
    );
  localStorage.setItem(
    "favoriteItems",
    JSON.stringify([...allFavoriteItems, favorite])
  );
}

export function getDataFromSearchForm(formData: FormData): ISearchFormData {
  const bookingDays = getBookingDays(
    new Date(formData.get("arrival") as string),
    new Date(formData.get("departure") as string)
  );
  return {
    city: formData.get("city") as string,
    arrival: formData.get("arrival") as string,
    departure: formData.get("departure") as string,
    price: formData.get("price") as string,
    provider: formData.getAll("provider") as string[],
  };
}

function getBookingDays(arrival: Date, departure: Date) {
  return (departure.getTime() - arrival.getTime()) / 1000 / 60 / 60 / 24;
}
