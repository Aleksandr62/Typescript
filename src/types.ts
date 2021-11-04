export interface IUser {
  username: string;
  avatarUrl: string;
}

export interface ISearchFormData {
  city: string;
  arrival: string;
  departure: string;
  price: string;
  provider: string[];
}

export interface IPlace {
  id: string;
  name: string;
  description: string;
  image: string;
  remoteness: number;
  bookedDates: string[];
  price: number;
  title?: string;
  details?: string;
  photos?: string[];
  coordinates?: number[];
  totalPrice?: number;
}

export interface IFavorite {
  id: string;
  name: string;
  image: string;
}
