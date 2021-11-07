import { IPlace } from "types";

export const API_URL = "http://localhost:4000/places";

export async function getAllPlaces(): Promise<IPlace[] | Error> {
  try {
    const response = await fetch(`${API_URL}`);
    const result = await response.json();

    return result;
  } catch (e: any) {
    return new Error(e.message);
  }
}

export async function getPlacesLimitByPrice(
  maxPrice: string
): Promise<IPlace[] | Error> {
  try {
    const response = await fetch(`${API_URL}?price_lte=${maxPrice}`);
    const result = await response.json();

    return result;
  } catch (e: any) {
    return new Error(e.message);
  }
}

export async function getPlaceById(id: string): Promise<IPlace | Error> {
  try {
    const response = await fetch(`${API_URL}?id=${id}`);
    const result = await response.json();
    return result[0];
  } catch (e: any) {
    return new Error(e.message);
  }
}

export async function bookingPlace(
  id: string,
  checkIn: Date,
  checkOut: Date
): Promise<Response | Error> {
  try {
    const oldPlace = await getPlaceById(id);
    if (oldPlace instanceof Error) return oldPlace;
    const rangeDates = getBookingDates(checkIn, checkOut);

    if (!rangeDates.length) throw new Error("Диапазон бронирования пуст");
    if (oldPlace && !isAvailableRangeDates(oldPlace?.bookedDates, rangeDates))
      throw new Error(
        `Даты ${checkIn} ${checkOut} в данном номере уже заняты.\nПопробуйте другие даты или номер`
      );
    const response = await fetch(`${API_URL}/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify({ ...oldPlace, bookedDates: [...rangeDates] }),
    });
    return response;
  } catch (e: any) {
    console.log(e);
    return new Error(e.message);
  }
}

function getBookingDates(checkIn: Date, checkOut: Date): number[] | [] {
  const result: number[] = [];
  while (checkOut.getTime() >= checkIn.getTime()) {
    result.push(checkOut.getTime());
    checkOut.setDate(checkOut.getDate() - 1);
  }
  return result;
}

function isAvailableRangeDates(
  bookedDates: number[],
  dateRange: number[]
): boolean {
  return dateRange.every((dateTimeStamp: number) => {
    return bookedDates.every((date) => date === dateTimeStamp);
  });
}
