import './index.css';

console.log('Hello, world!');

const saveButtons = document.querySelectorAll('[data-save-button]')

saveButtons.forEach(saveButton => {
  saveButton.addEventListener('click', (e) => {
    e.preventDefault();
    const newFavouriteId = e.target.getAttribute('data-save-button');
    const oldFavourites = JSON.parse(window.localStorage.getItem('favourites')) || [];
    oldFavourites.push(newFavouriteId);
    window.localStorage.setItem('favourites', JSON.stringify(oldFavourites))
  })
})


const searchForm = document.querySelector('[data-search-form]');
const searchresults = document.querySelector('[data-search-results]');
const input = document.querySelector('[data-search-input]');

let debounceTimeout;
input.addEventListener('input', (e) => {
  clearTimeout(debounceTimeout);
  const value = e.target.value;
  debounceTimeout = setTimeout(() => {
    if (value.length > 3) {
      fetchResults();
    }
  }, 300); // Adjust debounce delay (in ms) as needed
});

searchForm.addEventListener('change', (e) => {
  e.preventDefault()
  fetchResults()
})

function fetchResults() {
  const formdata = new FormData(searchForm);

  const queryString = new URLSearchParams(formdata).toString();
  const url = `/search/?${queryString}`;

  window.history.replaceState(null, null,url);

  fetch(url, {
    method: searchForm.method,
    headers: {
      'content-type': 'x-www-form-urlencoded',
      'x-requested-with': 'XMLHttpRequest',
    },
  }).then(res => {
    if (res.ok) {
      return res.text();
    }
    throw new Error('Network response was not ok.');
  })
    .then(html => {
      searchresults.innerHTML = html;
    })
}
