import { renderBlock } from "./lib.js";

interface IUser {
  username: string;
  avatarUrl: string;
  favoriteItemsAmount?: string;
}

export function renderUserBlock({
  username,
  avatarUrl,
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
      <img class="avatar" src="${avatarUrl}" alt="${username}" />
      <div class="info">
          <p class="name">${username}</p>
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
