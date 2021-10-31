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

export function getFavoritesAmount(): unknown {
  const favoritesAmount: string = localStorage.getItem("favoritesAmount");
  return favoritesAmount;
}

interface ISearchFormData {
  arrival: string;
  departure: string;
  price: string;
}
export interface IPlace {}

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
    price: (<HTMLInputElement>document.getElementById("max-price")).value,
  });
  const paramSearch =
    Math.random() > 0.5 ? new Error("Ошибка") : ([] as IPlace[]);
  setTimeout(() => cb(paramSearch), 1000);
}
