const streetsEl = document.querySelector('.streets');
const searchForm = document.forms[0];

const apiKey = '7Pc5IOnW-KChC5e61pcR';
const baseURL = 'https://api.winnipegtransit.com/v3/';

// https://api.winnipegtransit.com/v3/streets.json?api-key=7Pc5IOnW-KChC5e61pcR&name=portage
const getStreets = (query) => {
  return fetch(`${baseURL}streets.json?api-key=${apiKey}&name=${query}`)
    .then((response) => response.json())
    .then((data) => data.streets);
};

// https://api.winnipegtransit.com/v3/stops.json?api-key=7Pc5IOnW-KChC5e61pcR&street=2903
const getStops = (streetKey) => {
  return fetch(`${baseURL}stops.json?api-key=${apiKey}&street=${streetKey}`)
    .then((response) => response.json())
    .then((data) => data.stops);
};

// https://api.winnipegtransit.com/v3/stops/10064/schedule.json?api-key=7Pc5IOnW-KChC5e61pcR
const getStopSchedule = (stopKey) => {
  return fetch(`${baseURL}stops/${stopKey}/schedule.json?api-key=${apiKey}`)
    .then((response) => response.json())
    .then((data) => console.log(data));
};

const handleSearchForm = (e) => {
  e.preventDefault();
  if (e.target[0].value !== ' ') {
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
};

const handleStreetClick = (e) => {
  const streetKey = e.target.dataset.streetKeys;
  getStops(streetKey).then((stops) => {
    stops.forEach((stop) => {
      getStopSchedule(stop.key);
    });
  });
};

searchForm.addEventListener('submit', handleSearchForm);
streetsEl.addEventListener('click', handleStreetClick);