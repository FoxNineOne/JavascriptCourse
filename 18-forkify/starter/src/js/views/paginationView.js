import View from './View.js';
import icons from 'url:../../img/icons.svg'; // Parcel 2
class PaginationView extends View {
  _parentElement = document.querySelector('.pagination');

  _generateMarkup() {
    const numPages = Math.ceil(
      this._data.results.length / this._data.resultsPerPage
    );
    console.log(numPages);
    // Page 1 and other pages
    if (this._data.page === 1 && numPages > 1) {
      return 'Page 1 of many';
    }
    // Last page
    if (this._data.page === numPages && numPages > 1) {
      return 'Last Page';
    }
    // Other page
    if (this._data.page < numPages) {
      return 'Other Page';
    }
  }
}

export default new PaginationView();
