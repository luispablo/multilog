# multilog

Simple wrapper for multiple loggers. Initially graylog and console.

## Installation

```bash
npm install --save luispablo-multilog
```

## Usage

First, get from anywhere you want some JSON with the properties. Such JSON must
be an array with objects, with each object being a logger configuration.

For example, to get one console logger and one GrayLog logger use this:

```json
const properties = [
	{name: 'console', level: 'DEBUG'},
	{
		name: 'gelf',
		level: 'WARN',
		config: {
			fields: {facility: "example", owner: "Tom (a cat)"}, // optional; default fields for all messages
			filter: [], // optional; filters to discard a message
			broadcast: [], // optional; listeners of a message
			adapterName: 'udp', // optional; currently supported "udp" and "tcp"; default: udp
			adapterOptions: {
				protocol: 'udp4', // udp only; optional; udp adapter: udp4, udp6; default: udp4
				family: 4, // tcp only; optional; version of IP stack; default: 4
				host: '127.0.0.1', // optional; default: udp4
				port: 12201 // optional; default: 12201
			}
		}
	}
]
```

### Logging levels

So far, we have ```INFO```, ```ERROR```, ```WARN``` and ```DEBUG```. And they work as you would expect them to.
You must specify the level in **each** logger.

Then, create a MultiLog object:

```javascript
const MultiLog = require("luispablo-multilog");

// ...

const log = MultiLog(properties);
```

and you're ready to go!

```javascript
log.info("This is an info message");

// ...

const error = {code: 5, message: "Error message"}; // This can be anything you want
log.error(error);
```

and that's it, for the moment.

## Credits

[@luispablo](https://twitter.com/luispablo)
