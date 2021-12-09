const streetsEl = document.querySelector('.streets');
const searchInput = document.forms[0];

// https://api.winnipegtransit.com/v3/streets.json?api-key=IC_fN0dq-nHM0fG1VqV1&name=portage
const apiKey = 'IC_fN0dq-nHM0fG1VqV1';
const baseURL = 'https://api.winnipegtransit.com/v3/';

const getStreets = (query) => {
  return fetch(`${baseURL}streets.json?api-key=${apiKey}&name=${query}`)
    .then((response) => response.json())
    .then((data) => data.streets);
};

// https://api.winnipegtransit.com/v3/stops.json?api-key=IC_fN0dq-nHM0fG1VqV1&street=2903
const getStops = (streetKey) => {
  return fetch(`${baseURL}stops.json?api-key=${apiKey}&street=${streetKey}`)
    .then((response) => response.json())
    .then((data) => data.stops);
};

const getScheduledStops = (stopKey) => {
  // fill this out to fetch from the stop schedules api
};

const handleSearchInput = (e) => {
  e.preventDefault();
  if (e.target[0].value !== ' ') {
    const query = e.target[0].value;
    getStreets(query).then((streets) => {
      streetsEl.innerHTML = '';
      streets.forEach((street) => {
        streetsEl.insertAdjacentHTML(
          'beforeend',
          `<a href="#" data-street-key=${street.key}>${street.name}</a>`
        );
      });
    });
  }
};

const handleStreetClick = (e) => {
  const streetKey = e.target.dataset.streetKey;
  getStops(streetKey).then((stops) => {
    // loop through the stops
    // query the schedules api (passing in the stop key)
    // collect the responses into an array of promises
    // use Promise.all to render the table once all the queries
    // build the HTML for rendering the schedule
  });
};

searchInput.addEventListener('submit', handleSearchInput);
streetsEl.addEventListener('click', handleStreetClick);
