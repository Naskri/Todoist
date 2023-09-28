import { Storage } from "./Storage";

type ThemePosibilities = "dark" | "light";

export class Theme {
  buttonElement = document.querySelector("[data-changeTheme]");
  storage = new Storage<ThemePosibilities>();
  currentTheme: ThemePosibilities;

  constructor() {
    this.currentTheme = this.setInitialTheme();
    console.log(this.currentTheme);
    this.addEventListener();
    this.renderUI();
  }

  setInitialTheme() {
    const storagedTheme = this.storage.getItems("theme");

    console.log(storagedTheme);

    if (storagedTheme) {
      return storagedTheme;
    }

    const preferences = this.getSystemPreferableTheme();

    return preferences;
  }

  addEventListener() {
    this.buttonElement?.addEventListener("click", this.changeTheme.bind(this));
  }

  changeTheme() {
    this.currentTheme = this.currentTheme === "dark" ? "light" : "dark";
    this.storage.setItemToStorage("theme", this.currentTheme);
    this.renderUI();
  }

  getSystemPreferableTheme() {
    const PREFERS_DARK_COLOR_SCHEMA_URL = "(prefers-color-scheme:dark)";

    const isDark =
      window.matchMedia &&
      window.matchMedia(PREFERS_DARK_COLOR_SCHEMA_URL).matches;

    return isDark ? "dark" : "light";
  }

  renderUI() {
    if (!this.buttonElement) return;
    this.buttonElement.innerHTML = "";
    document.body.setAttribute("data-theme", this.currentTheme);
    this.buttonElement.insertAdjacentHTML("beforeend", this.createImage());
  }

  createImage() {
    return `
      <img
        src="./src/images/icon-${
          this.currentTheme === "dark" ? "sun" : "moon"
        }.svg"
        alt="${this.currentTheme === "dark" ? "Light" : "Dark"} Theme"
        class="button__image"
      />
    `;
  }
}
