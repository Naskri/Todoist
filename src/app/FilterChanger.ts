type Filter = "all" | "active" | "completed";

const isFilter = (filter: string): filter is Filter => {
  return filter === "all" || filter === "active" || filter === "completed";
};

export class FilterChanger {
  filterButtonsContainer = document.querySelector("[data-filtersContainer]");
  filterButtons = document.querySelectorAll("[data-filter]");

  constructor() {
    this.addEventListeners();
  }

  addEventListeners() {
    this.filterButtonsContainer?.addEventListener("click", (ev) => {
      if (!(ev.target instanceof HTMLButtonElement)) return;
      this.removeActiveClassFromFilters();

      const filter = ev.target.dataset.filter;

      this.setActiveClass(ev.target);

      if (!filter) return;
      if (!isFilter(filter)) return;

      this.setFilter(filter);
    });
  }

  setFilter(filter: Filter) {
    const newUrl = `${window.location.pathname}?filter=${filter}`;

    window.history.pushState(null, "", newUrl);

    window.history.back();
    window.history.go(1);
  }

  getFilter() {
    const urlParams = new URLSearchParams(window.location.search);

    const filter = urlParams.get("filter");

    if (!filter) return null;

    return filter;
  }

  setActiveClass(target: HTMLButtonElement) {
    target.classList.add("active");
  }

  removeActiveClassFromFilters() {
    this.filterButtons.forEach((filterButton) => {
      filterButton?.classList.remove("active");
    });
  }
}
