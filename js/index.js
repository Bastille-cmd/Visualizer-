document.addEventListener("DOMContentLoaded", () => {
  const searchBtn = document.getElementById("searchBtn");
  const sortBtn = document.getElementById("sortBtn");

  if (searchBtn) {
    searchBtn.addEventListener("click", () => {
      window.location.href = "search.html";
    });
  }

  if (sortBtn) {
    sortBtn.addEventListener("click", () => {
      window.location.href = "sort.html";
    });
  }
});
