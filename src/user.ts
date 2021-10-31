import { renderBlock } from "./lib.js";

interface IUser {
  usrName: string;
  avatar: string;
  favoriteItemsAmount?: string;
}

export function renderUserBlock({
  usrName,
  avatar,
  favoriteItemsAmount,
}: IUser) {
  const favoritesCaption: string = favoriteItemsAmount
    ? favoriteItemsAmount
    : "ничего нет";
  const hasFavoriteItems: boolean = favoriteItemsAmount ? true : false;

  renderBlock(
    "user-block",
    `
    <div class="header-container">
      <img class="avatar" src="${avatar}" alt="${usrName}" />
      <div class="info">
          <p class="name">${usrName}</p>
          <p class="fav">
            <i class="heart-icon${
              hasFavoriteItems ? " active" : ""
            }"></i>${favoritesCaption}
          </p>
      </div>
    </div>
    `
  );
}
