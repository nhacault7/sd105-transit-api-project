## Streets API Service - Get Streets from a search
https://api.winnipegtransit.com/v3/streets.json?api-key=7Pc5IOnW-KChC5e61pcR&name=portage
- streets.json
- returns an object with streets array
- array contains street key and street name
- no results returns an empty streets array
- correct spelling required

## Stops API Service - Get Stops b street key
https://api.winnipegtransit.com/v3/stops.json?api-key=7Pc5IOnW-KChC5e61pcR&street=2903
- stop.json

## Stop Schedules API Service - Gets bus schedule by stop key
https://api.winnipegtransit.com/v3/stops/10064/schedule.json?api-key=7Pc5IOnW-KChC5e61pcR
- schedules.json
- returns an object with keys:
- stop - which has info about the stop itself (name, direction, cross street, etc.)
- route-schedules - an array of schedule objects (route, scheduled stops)
- scheduled-stops - an array of schdeuled objects (arrival times, etc.)