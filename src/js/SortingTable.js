/* eslint no-nested-ternary: 0 */
export default class SortingTable {
  constructor(table, data) {
    this.table = table;
    this.data = JSON.parse(data);
    this.timerStep = -1;
  }

  init() {
    this.createRowsArray();
    this.outputTable();
    setInterval(() => this.timer(), 2000);
  }

  createRowsArray() {
    this.rows = this.data.map(({
      id, title, year, imdb,
    }) => {
      const row = document.createElement('tr');
      row.dataset.id = id;
      row.dataset.title = title;
      row.dataset.year = year;
      row.dataset.imdb = imdb;

      row.innerHTML = `
        <td>${id}</td>
        <td>${title}</td>
        <td>(${year})</td>
        <td>imdb: ${imdb.toFixed(2)}</td>
      `;

      return row;
    });
  }

  outputTable() {
    this.table.innerHTML = `
      <tr>
        <td>id</td>
        <td>title</td>
        <td>year</td>
        <td>imdb</td>
      </td>
    `;

    if ((this.timerStep >= 0) && (this.timerStep <= 7)) {
      this.table
        .getElementsByTagName('td')[Math.trunc(this.timerStep / 2)]
        .textContent += this.timerStep % 2 ? '\u2191' : '\u2193';
    }

    this.rows.forEach((item) => this.table.appendChild(item));
  }

  sortTable() {
    this.rows.sort((a, b) => {
      const {
        id: idA,
        title: titleA,
        year: yearA,
        imdb: imdbA,
      } = a.dataset;

      const {
        id: idB,
        title: titleB,
        year: yearB,
        imdb: imdbB,
      } = b.dataset;

      switch (this.timerStep) {
        case 0:
          return +idA - +idB;
        case 1:
          return +idB - +idA;
        case 2:
          return titleA > titleB ? 1
            : titleA < titleB ? -1 : 0;
        case 3:
          return titleB > titleA ? 1
            : titleB < titleA ? -1 : 0;
        case 4:
          return +yearA - +yearB;
        case 5:
          return +yearB - +yearA;
        case 6:
          return +imdbA - +imdbB;
        case 7:
          return +imdbB - +imdbA;
        default:
          return 0;
      }
    });
  }

  timer() {
    this.timerStep++;
    this.timerStep %= 8;
    this.sortTable();
    this.outputTable();
  }
}
