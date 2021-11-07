export interface IUser {
  username: string;
  avatarUrl: string;
  favoriteItemsAmount?: string;
}

export interface ISearchFormData {
  city: string;
  checkInDate: Date;
  checkOutDate: Date;
  maxPrice: string;
  provider: string[];
}

export interface IPlace {
  id: string;
  provider: string;
  name: string;
  description: string;
  image: string;
  remoteness: number;
  bookedDates: number[];
  coordinates: number[];
  totalPrice: number;
}

export interface IFavorite {
  id: string;
  name: string;
  image: string;
}
