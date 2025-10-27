import View from './View.js';
import icons from 'url:../../img/icons.svg'; // Parcel 2
class PaginationView extends View {
  _parentElement = document.querySelector('.pagination');

  addHandlerClick(handler) {
    this._parentElement.addEventListener('click', function (e) {
      const btn = e.target.closest('.btn--inline');
      if (!btn) return;

      const goToPage = +btn.dataset.goto;
      handler(goToPage);
    });
  }

  _generateMarkup() {
    const curPage = this._data.page;
    const numPages = Math.ceil(
      this._data.results.length / this._data.resultsPerPage
    );

    // TODO  - turn the below into a method
    // const pageBtn = function(pageDir){}
    const prevPage = `<button data-goto="${
      curPage - 1
    }" class="btn--inline pagination__btn--prev">
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-left"></use>
            </svg>
            <span>Page ${curPage - 1}</span>
          </button>
          `;
    const nextPage = `<button data-goto="${
      curPage + 1
    }" class="btn--inline pagination__btn--next">
            <span>Page ${curPage + 1}</span>
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-right"></use>
            </svg>
          </button>
          `;
    // Page 1 and other pages
    if (curPage === 1 && numPages > 1) {
      return `${nextPage}`;
    }
    // Last page
    if (curPage === numPages && numPages > 1) {
      return `${prevPage}`;
    }
    // Other page
    if (curPage < numPages) {
      return `${prevPage}
        ${nextPage}`;
    }
    return ``;
  }
}

export default new PaginationView();
