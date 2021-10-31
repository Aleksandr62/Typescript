import { renderBlock } from './lib.js'

export function renderUserBlock (usrName: string, avatar: string, favoriteItemsAmount: number) {
  const favoritesCaption: number | string = favoriteItemsAmount ? favoriteItemsAmount : 'ничего нет'
  const hasFavoriteItems: boolean = favoriteItemsAmount ? true : false

  renderBlock(
    'user-block',
    `
    <div class="header-container">
      <img class="avatar" src="${avatar}" alt="${usrName}" />
      <div class="info">
          <p class="name">${usrName}</p>
          <p class="fav">
            <i class="heart-icon${hasFavoriteItems ? ' active' : ''}"></i>${favoritesCaption}
          </p>
      </div>
    </div>
    `
  )
}
