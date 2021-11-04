import { renderBlock, getDefaultDate } from "./lib.js";

export function renderSearchFormBlock(
  arrival: Date = getDefaultDate(1),
  departure: Date = getDefaultDate(3)
) {
  const currentDate = getDefaultDate(0).toISOString().substr(0, 10);
  const arrivalDate = arrival.toISOString().substr(0, 10);
  const departureDate = departure.toISOString().substr(0, 10);
  const maxDate = new Date(
    Date.UTC(arrival.getFullYear(), arrival.getMonth() + 2, 0)
  );
  const maxDepartureDate = maxDate.toISOString().substr(0, 10);

  renderBlock(
    "search-form-block",
    `
    <form>
      <fieldset class="search-fieldset">
        <div class="row">
          <div>
            <label for="city">Город</label>
            <input id="city" name="city" type="text" readonly value="Санкт-Петербург" />
            <input type="hidden" disabled value="59.9386,30.3141" />
          </div>
          <div class="providers">
            <label><input type="checkbox" name="provider" value="homy" checked /> Homy</label>
            <label><input type="checkbox" name="provider" value="flat-rent" checked /> FlatRent</label>
          </div> 
        </div>
        <div class="row">
          <div>
            <label for="check-in-date">Дата заезда</label>
            <input id="check-in-date" type="date" value=${arrivalDate} min=${currentDate} max=${maxDepartureDate} name="arrival" />
          </div>
          <div>
            <label for="check-out-date">Дата выезда</label>
            <input id="check-out-date" type="date" value=${departureDate} min=${departureDate} max=${maxDepartureDate} name="departure" />
          </div>
          <div>
            <label for="max-price">Макс. цена суток</label>
            <input id="max-price" type="text" value="" name="price" class="max-price" />
          </div>
          <div>
            <div><button id="btn" type="submit">Найти</button></div>
          </div>
        </div>
      </fieldset>
    </form>
    `
  );
}
