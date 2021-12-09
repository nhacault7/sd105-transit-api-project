const streetsEl = document.querySelector('.streets');
const searchForm = document.forms[0];
const tableBodyEl = document.querySelector('tbody');

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

// https://api.winnipegtransit.com/v3/stops/10541/schedule.json?api-key=IC_fN0dq-nHM0fG1VqV1
const getStopSchedule = (stopKey) => {
  // fill this out to fetch from the stop schedules api
  return fetch(`${baseURL}stops/${stopKey}/schedule.json?api-key=${apiKey}`)
    .then((response) => response.json())
    .then((data) => data['stop-schedule']);
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

const formatTime = (dateString) => {
  return dayjs(dateString).format('HH:mm A');
};

const insertScheduleRowHTML = (scheduleObj) => {
  const { stopName, crossStreet, direction, busNum, time } = scheduleObj;
  tableBodyEl.insertAdjacentHTML(
    'beforeend',
    `<tr>
      <td>${stopName}</td>
      <td>${crossStreet}</td>
      <td>${direction}</td>
      <td>${busNum}</td>
      <td>${formatTime(time)}</td>
    </tr>
  `
  );
};

const createScheduleObj = (schedule, index) => {
  return {
    stopName: schedule.stop.name,
    crossStreet: schedule.stop['cross-street'].name,
    direction: schedule.stop.direction,
    busNum: schedule['route-schedules'][index].route.number,
    time: schedule['route-schedules'][index]['scheduled-stops'][0].times
      .departure.estimated,
  };
};

const handleStreetClick = (e) => {
  const streetKey = e.target.dataset.streetKey;
  getStops(streetKey).then((stops) => {
    // loop through the stops
    const schedules = [];
    stops.forEach((stop) => {
      // query the schedules api (passing in the stop key)
      // collect the responses into an array of promises
      schedules.push(getStopSchedule(stop.key));
    });
    // use Promise.all to render the table once all the queries
    Promise.all(schedules).then((stopSchedule) => {
      // clear the schedule table
      tableBodyEl.innerHTML = '';
      // loop through the stopSchedule array
      stopSchedule.forEach((schedule) => {
        // create the object scheduleObj
        schedule['route-schedules'].forEach((route, index) => {
          // call insertScheduleRowHTML to render the row
          insertScheduleRowHTML(createScheduleObj(schedule, index));
        });
      });
    });
  });
};

searchForm.addEventListener('submit', handleSearchInput);
streetsEl.addEventListener('click', handleStreetClick);
