import { getBookingDays } from "./lib.js";
import {
  getAllPlaces,
  getPlacesLimitByPrice,
  bookingPlace,
} from "./api-homy.js";
import { ISearchFormData, IPlace } from "./types";

import { FlatRentSdk } from "./flat-rent-sdk/flat-rent-sdk.js";

export const flatRentSdk = new FlatRentSdk();

export async function search(
  params: ISearchFormData,
  callback: (props: IPlace[] | Error) => void
) {
  let result: IPlace[] | Error = [];
  let homy: Partial<IPlaceFlatSDK>[] | Error = [];
  let flat: Partial<IPlaceFlatSDK>[] | Error = [];
  const bookingDays = getBookingDays(params.checkInDate, params.checkOutDate);

  if (params.provider.includes("homy"))
    homy = params.maxPrice
      ? await getPlacesLimitByPrice(params.maxPrice)
      : await getAllPlaces();

  if (params.provider.includes("flat-rent"))
    flat = await flatRentSdk.search({
      city: params.city,
      checkInDate: params.checkInDate,
      checkOutDate: params.checkOutDate,
      priceLimit: parseInt(params.maxPrice) || null,
    });

  if (!(homy instanceof Error))
    result = result.concat(adapter("homy", homy, bookingDays));
  if (!(flat instanceof Error))
    result = result.concat(adapter("flat-rent", flat, bookingDays));

  if (!result.length) result = new Error("Данные не найдены");
  callback(result);
}

export async function booking(
  provider: string,
  id: string,
  checkIn: Date,
  checkOut: Date
): Promise<Response | Error | number> {
  let result = null;
  if (provider === "homy") result = await bookingPlace(id, checkIn, checkOut);
  if (provider === "flat-rent")
    result = await flatRentSdk.book(id, checkIn, checkOut);
  return result as Response | Error | number;
}

interface IPlaceFlatSDK {
  id: string;
  name: string;
  title: string;
  description: string;
  details: string;
  image: string;
  photos: string[];
  remoteness: number;
  coordinates: number[];
  bookedDates: number[];
  price: number;
  totalPrice: number;
}

function adapter(
  provider: string,
  places: Partial<IPlaceFlatSDK>[],
  bookingDays: number
): IPlace[] {
  const result = places.map((place) => {
    return {
      id: place.id,
      provider: provider,
      bookedDates: place.bookedDates,
      coordinates: provider === "flat-rent" ? place.coordinates : [],
      totalPrice:
        provider === "flat-rent"
          ? place.totalPrice
          : (place.price as number) * bookingDays,
      name: provider === "flat-rent" ? place.title : place.name,
      description: provider === "flat-rent" ? place.details : place.description,
      image:
        provider === "flat-rent" && place.photos?.length
          ? place.photos[0] || ""
          : place.image,
      remoteness: provider === "flat-rent" ? 0 : place.remoteness,
    };
  });
  return result as IPlace[];
}
