const streetsEl = document.querySelector('.streets');
const searchInput = document.forms[0];

// https://api.winnipegtransit.com/v3/streets.json?api-key=7Pc5IOnW-KChC5e61pcR&name=portage
const apiKey = '7Pc5IOnW-KChC5e61pcR';
const baseURL = 'https://api.winnipegtransit.com/v3/';

const getStreets = (query) => {
  return fetch(`${baseURL}streets.json?api-key=${apiKey}&name=${query}`)
    .then((response) => response.json())
    .then((data) => data.streets);
}

const handleSearchInput = (e) => {
  e.preventDefault();
  const query = e.target[0].value;
  getStreets(query).then((streets) => {
    streetsEl.innerHTML = '';
    streets.forEach((street) => {
      streetsEl.insertAdjacentHTML('beforeend', 
      `<a href="#" data-street-keys=${street.key}>${street.name}</a>`
      );
    });
  });
}

searchInput.addEventListener('submit', handleSearchInput);