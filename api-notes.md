## Steets API Service - Get streets from a search

https://api.winnipegtransit.com/v3/streets.json?api-key=IC_fN0dq-nHM0fG1VqV1&name=portage

- streets.json
- returns an object with streets array
- array contains street key and street name
- no results returns an empty streets array
- correct spelling is required

## Stops API Service - Get Stops by street key

https://api.winnipegtransit.com/v3/stops.json?api-key=IC_fN0dq-nHM0fG1VqV1&street=2903

- stops.json

## Stop Schedules API Service - Gets bus schedule by stop key

https://api.winnipegtransit.com/v3/stops/10541/schedule.json?api-key=IC_fN0dq-nHM0fG1VqV1

- returns an object with keys:
- stop - which has info about the stop itself (name, direction, cross street, etc.)
- route-schedules - an array of schedule objects (route, scheduled stops)
- scheduled-stops - an array of scheduled objects (arrival times, etc.)
