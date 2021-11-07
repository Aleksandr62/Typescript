import { ISearchFormData, IFavorite } from "./types.js";

export function renderBlock(elementId: string, html: string) {
  const element: HTMLElement | null = document.getElementById(elementId);
  if (element) element.innerHTML = html;
}

type messageToast = {
  type: string;
  text: string;
};
type actionToast = {
  name: string;
  handler: () => void;
};

export function renderToast(
  message: messageToast | null,
  action: actionToast | null
) {
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
  const username: string = localStorage.getItem("username") || "";
  const avatarUrl: string = localStorage.getItem("avatarUrl") || "";
  return { username, avatarUrl };
}

export function getFavoritesAmount(): string {
  const allFavoriteItems =
    JSON.parse(localStorage.getItem("favoriteItems") || "") || [];
  return `${allFavoriteItems.length || ""}`;
}

export function getAllFavoriteItems() {
  return JSON.parse(localStorage.getItem("favoriteItems") || "") || [];
}

export function getFavoriteItemById(id: string): boolean {
  return Boolean(
    getAllFavoriteItems()?.find((item: IFavorite) => item.id === id)
  );
}

export function toggleFavoriteItem(favorite: IFavorite) {
  const allFavoriteItems = getAllFavoriteItems();
  const updateFavoriteItems = allFavoriteItems.filter(
    (item: IFavorite) => favorite.id !== item.id
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
  return {
    city: formData.get("city") as string,
    checkInDate: new Date(formData.get("arrival") as string),
    checkOutDate: new Date(formData.get("departure") as string),
    maxPrice: formData.get("maxPrice") as string,
    provider: formData.getAll("provider") as string[],
  };
}

export function getBookingDays(checkInDate: Date, checkOutDate: Date): number {
  return (checkOutDate.getTime() - checkInDate.getTime()) / 1000 / 60 / 60 / 24;
}
