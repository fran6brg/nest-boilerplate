import { Injectable, NestMiddleware } from '@nestjs/common';

/**
 * Trim all nested values of type string and update data from multipart.
 *
 * @param {any} object - Input.
 */
const _formatDeep = (object: any): void => {
	// // Manage null values => no need anymore
	// if (object === null || typeof object !== "object")
	// 	return;

	// Manage arrays
	if (Array.isArray(object))
		// Loop through array
		for (let prop of object) {
			// If the property is an object trim it too
			if (typeof prop === "object")
				_formatDeep(prop);
			// If it's a string remove begin and end whitespaces
			else if (typeof prop === "string") {
				prop = prop.trim();
				// Format booleans and null values
				switch (prop) {
					case "true":
						prop = true;
						break;
					case "false":
						prop = false;
						break;
					case "null":
						prop = undefined;
						break;
					default:
						break;
				}
			}
		}
	// Manage objects (key value pairs)
	else
		// Loop through keys
		for (const prop in object)
			// If the property is an object trim it too
			if (typeof object[prop] === "object")
				_formatDeep(object[prop]);
			// If it's a string, format it
			else if (typeof object[prop] === "string")
			// Try to parse it (to manage stringified JSON)
				try {
					object[prop] = JSON.parse(object[prop]);
					_formatDeep(object[prop]);
				}
				catch (error) {
					// Trim string
					object[prop] = object[prop].trim();

					// Format booleans, null and undefined values
					switch (object[prop]) {
						case "true":
							object[prop] = true;
							break;
						case "false":
							object[prop] = false;
							break;
						case "null":
							object[prop] = undefined;
							break;
						case "undefined":
							delete object[prop];
							break;
						default:
							break;
					}
				}
};

/**
 * This middleware permits to trim any string from query parameter and to format boolean, null and undefined values (multipart).
 *
 * @param {object} req - Express request.
 * @param {object} res - Express response.
 * @param {Function} next - Express function to call the next middleware/route.
 */
@Injectable()
export class FormatDeepMiddleware implements NestMiddleware {
  use(req: any, res: any, next: () => void) {
	console.log(`FormatDeepMiddleware | Some sick middleware message`);
	// Loop on body
	if (req.body)
		_formatDeep(req.body);

	// Loop on params
	if (req.params)
		_formatDeep(req.params);

	// Loop on query
	if (req.query)
		_formatDeep(req.query);

    next();
  }
}
