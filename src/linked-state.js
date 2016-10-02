import { isString, delve } from './util';

/** Create an Event handler function that sets a given state property.
 *	@param {Component} component	The component whose state should be updated
 *	@param {string} key				A dot-notated key path to update in the component's state
 *	@param {string} eventPath		A dot-notated key path to the value that should be retrieved from the Event or component
 *	@returns {function} linkedStateHandler
 *	@private
 */
export function createLinkedState(component, key, eventPath) {
	let path = key.split('.'),
		p0 = path[0];
	return function(e) {
		let t = e && e.currentTarget || this,
			s = component.state,
			obj = s,
			v = isString(eventPath) ? delve(e, eventPath) : t.nodeName ? ((t.nodeName+t.type).match(/^input(che|rad)/i) ? t.checked : t.value) : e,
			i;
		if (path.length>1) {
			for (i=0; i<path.length-1; i++) {
				obj = obj[path[i]] || (obj[path[i]] = {});
			}
			obj[path[i]] = v;
			v = s[p0];
		}
		component.setState({ [p0]: v });
	};
}
