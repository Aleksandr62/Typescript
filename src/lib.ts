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

export interface ISearchFormData {
  arrival: string;
  departure: string;
  price: number;
}

export interface IPlace {
  id: string;
  name: string;
  description: string;
  image: string;
  remoteness: number;
  bookedDates: string[];
  price: number;
}

export function search(props: ISearchFormData) {
  const { arrival, departure, price } = props;
  console.log(arrival, departure, price);
}

export function callback(props: IPlace[] | Error) {
  console.log(props);
}

export function handlerSubmitSearchForm(cb: (props: IPlace[] | Error) => void) {
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
}

export function getAllFavoriteItems() {
  return JSON.parse(localStorage.getItem("favoriteItems")) || [];
}

export function getFavoriteItemById(id: string): boolean {
  return Boolean(
    getAllFavoriteItems()?.find((item: IFavorite) => item.id === id)
  );
}

export interface IFavorite {
  id: string;
  name: string;
  image: string;
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
  return [...formData.entries()].reduce((acc, key) => {
    acc = { ...acc, [key[0]]: key[1] };
    return acc;
  }, {}) as ISearchFormData;
}
