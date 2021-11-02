export async function getPlaces(url: string) {
  try {
    const response = await fetch(url);
    const result = await response.json();
    return result;
  } catch (e) {
    console.log(e);
  }
}

export async function postBookingPlace(url, data) {
  try {
    const response = await fetch(url, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify(data),
    });
    return response;
  } catch (e) {
    console.log(e);
  }
}
