import { renderSearchFormBlock } from "./search-form.js";
import { renderSearchStubBlock } from "./search-results.js";
import { renderUserBlock } from "./user.js";
import { renderToast, callback, handlerSubmitSearchForm } from "./lib.js";

window.addEventListener("DOMContentLoaded", () => {
  renderUserBlock({ usrName: "Vasiliy", avatar: "../img/avatar.png" });
  renderSearchFormBlock();
  renderSearchStubBlock();
  renderToast(
    {
      text: "Это пример уведомления. Используйте его при необходимости",
      type: "success",
    },
    {
      name: "Понял",
      handler: () => {
        console.log("Уведомление закрыто");
      },
    }
  );
  document.getElementById("btn").onclick = (e: Event) => {
    e.preventDefault();

    handlerSubmitSearchForm(callback);
  };
});
